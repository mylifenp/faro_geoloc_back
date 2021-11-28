import { app } from "./app";
import { PORT } from "./config";
import { sequelize } from "./models";

// const eraseDatabaseOnSync = false;
const server = sequelize
  .sync({ force: true })
  .then(() => app.listen(PORT, () => {}));
