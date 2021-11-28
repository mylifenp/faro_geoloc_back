import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import models from "../../../models";
import { loginValidator, registerValidator } from "../../validators";
import { SECRET } from "../../../config";

export const registerUser = async (req, res) => {
  try {
    const { error } = registerValidator(req.body);
    if (error) return res.status(404).json({ error: error.details[0].message });
    const email_exists = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (email_exists)
      return res.status(404).json({ error: "email already used" });

    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    const newUser = {
      email: req.body.email,
      password: hashedPassword,
    };
    models.User.create(newUser)
      .then((user) =>
        res.status(200).json({ status: "success", new_user_id: user.id })
      )
      .catch((err) => res.status(500).json({ error: err.message }));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = loginValidator(req.body);
    if (error) {
      return res.status(404).send(error.details[0].message);
    }

    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(404).json({ error: "email is not correct" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(404).json({ error: "invalid password" });
    const expires = Math.floor(Date.now() / 1000) + 60 * 1000;
    const token = jwt.sign(
      {
        id: user.id,
        exp: expires,
      },
      SECRET
    );

    return res.header("token", token).send({ token, expires });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
