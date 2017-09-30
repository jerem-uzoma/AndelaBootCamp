import jwt from "jwt-simple";

describe("Routes: Recipe", () => {
  const Users = app.db.models.Users;
  const Recipe = app.db.models.Recipe;
  const jwtSecret = app.libs.config.jwtSecret;
  let token;
  let fakeRecipe;
  beforeEach(done => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        name: "John",
        email: "john@mail.net",
        password: "12345"
      }))
      .then(user => {
        Recipe
          .destroy({where: {}})
          .then(() => recipe.bulkCreate([{
            id: 1,
            title: "Beans",
            userId: user.id
          }, {
            id: 2,
            title: "Beans",
            userId: user.id
          }]))
          .then(recipe => {
            fakeRecipe = recipe[0];
            token = jwt.encode({id: user.id}, jwtSecret);
            done();
          });
      });
  });
  describe("GET /api/recipe", () => {
    describe("status 200", () => {
      it("returns a list of recipe", done => {
        request.get("/api/recipe")
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body[0].title).to.eql("Beans");
            expect(res.body[1].title).to.eql("Beans");
            done(err);
          });
      });
    });
  });
  describe("POST /api/recipe", () => {
    describe("status 200", () => {
      it("creates a new recipe", done => {
        request.post("/api/recipe")
          .set("Authorization", `JWT ${token}`)
          .send({title: "Bread"})
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("Bread");
            expect(res.body.done).to.be.false;
            done(err);
          });
      });
    });
  });
  describe("GET /api/recipe/:id", () => {
    describe("status 200", () => {
      it("returns one recipe", done => {
        request.get(`/api/recipe/${fakeRecipe.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql("Beans");
            done(err);
          });
      });
    });
    describe("status 404", () => {
      it("throws error when recipe not exist", done => {
        request.get("/api/recipe/0")
          .set("Authorization", `JWT ${token}`)
          .expect(404)
          .end((err, res) => done(err));
      });
    });
  });
  describe("PUT /api/recipe/:id", () => {
    describe("status 204", () => {
      it("updates a recipe", done => {
        request.put(`/api/recipe/${fakeRecipe.id}`)
          .set("Authorization", `JWT ${token}`)
          .send({
            title: "Yam",
            done: true
          })
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
  describe("DELETE /api/recipe/:id", () => {
    describe("status 204", () => {
      it("removes a recipe", done => {
        request.delete(`/api/recipe/${fakeRecipe.id}`)
          .set("Authorization", `JWT ${token}`)
          .expect(204)
          .end((err, res) => done(err));
      });
    });
  });
});
