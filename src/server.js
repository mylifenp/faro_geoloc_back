import { app } from "./app";
import { PORT } from "./config";
import { sequelize } from "./models";

const eraseDatabaseOnSync = false;
const server = sequelize
  .sync({ force: true, eraseDatabaseOnSync })
  .then(() => app.listen(PORT, () => {}));
