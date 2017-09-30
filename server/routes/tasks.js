module.exports = app => {
  const Recipe = app.db.models.Recipe;

  app.route("/api/recipe")
    .all(app.auth.authenticate())
    /**
     * @api {get} /recipe List the user's recipe
     * @apiGroup recipe
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiSuccess {Object[]} recipe Recipe's list
     * @apiSuccess {Number} recipe.id Recipe id
     * @apiSuccess {String} recipe.title Recipe title
     * @apiSuccess {Boolean} recipe.done Recipe is done?
     * @apiSuccess {Date} recipe.updatedAt Update's date
     * @apiSuccess {Date} recipe.createdAt Register's date
     * @apiSuccess {Number} recipe.userId User id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "id": 1,
     *      "title": "Study",
     *      "done": false,
     *      "updatedAt": "2016-02-10T15:46:51.778Z",
     *      "createdAt": "2016-02-10T15:46:51.778Z",
     *      "userId": 1
     *    }]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Recipe.findAll({
        where: { userId: req.user.id }
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    /**
     * @api {post} /recipe Register a new Recipe
     * @apiGroup recipe
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {String} title Recipe title
     * @apiParamExample {json} Input
     *    {"title": "Study"}
     * @apiSuccess {Number} id Recipe id
     * @apiSuccess {String} title Recipe title
     * @apiSuccess {Boolean} done false Recipe is done?
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccess {Number} userId User id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "title": "Study",
     *      "done": false,
     *      "updatedAt": "2016-02-10T15:46:51.778Z",
     *      "createdAt": "2016-02-10T15:46:51.778Z",
     *      "userId": 1
     *    }
     * @apiErrorExample {json} Register error
     *    HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      req.body.userId = req.user.id;
      recipe.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });

  app.route("/api/recipe/:id")
    .all(app.auth.authenticate())
    /**
     * @api {get} /recipe/:id Get a Recipe
     * @apiGroup recipe
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Recipe id
     * @apiSuccess {Number} id Recipe id
     * @apiSuccess {String} title Recipe title
     * @apiSuccess {Boolean} done Recipe is done?
     * @apiSuccess {Date} updatedAt Update's date
     * @apiSuccess {Date} createdAt Register's date
     * @apiSuccess {Number} userId User id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "title": "Study",
     *      "done": false
     *      "updatedAt": "2016-02-10T15:46:51.778Z",
     *      "createdAt": "2016-02-10T15:46:51.778Z",
     *      "userId": 1
     *    }
     * @apiErrorExample {json} Recipe not found error
     *    HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *    HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      recipe.findOne({ where: {
        id: req.params.id,
        userId: req.user.id
      }})
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    /**
     * @api {put} /recipe/:id Update a Recipe
     * @apiGroup recipe
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Recipe id
     * @apiParam {String} title Recipe title
     * @apiParam {Boolean} done Recipe is done?
     * @apiParamExample {json} Input
     *    {
     *      "title": "Work",
     *      "done": true
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Update error
     *    HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      recipe.update(req.body, { where: {
        id: req.params.id,
        userId: req.user.id
      }})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    /**
     * @api {delete} /recipe/:id Remove a Recipe
     * @apiGroup recipe
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"Authorization": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} id Recipe id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 204 No Content
     * @apiErrorExample {json} Delete error
     *    HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      recipe.destroy({ where: {
        id: req.params.id,
        userId: req.user.id
      }})
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });
};
