module.exports = app => {
    const Recipe = app.db.models.Recipe;

    app.route("/api/recipe")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Recipe.findAll({
                    where: { userId: req.user.id }
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            req.body.userId = req.user.id;
            recipe.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/api/recipe/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            recipe.findOne({
                    where: {
                        id: req.params.id,
                        userId: req.user.id
                    }
                })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            recipe.update(req.body, {
                    where: {
                        id: req.params.id,
                        userId: req.user.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            recipe.destroy({
                    where: {
                        id: req.params.id,
                        userId: req.user.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });
}