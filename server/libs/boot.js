import https from "https";
import fs from "fs";

module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("recipe.key", "utf8"),
      cert: fs.readFileSync("recipe.cert", "utf8")
    }
    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get("port"), () => {
          console.log(`Recipe API - Port ${app.get("port")}`);
        });
    });
  }
};
