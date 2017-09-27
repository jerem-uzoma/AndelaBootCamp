module.exports = (app) => {
    const Users = app.db.models.Users;

    app.route('/users')
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                    attributes: ['id', 'name', 'email'],
                })
                .then(result => res.send(result))
                .catch((error) => {
                    res.status(412).send({ msg: error.message });
                });
        })
        .delete((req, res) => {
            Users.destroy({ where: { id: req.user.id } })
                .then(result => res.sendStatus(204))
                .catch((error) => {
                    res.status(412).send({ msg: error.message });
                });
        });
    app.post('/users', (req, res) => {
        Users.create(req.body)
            .then(result => res.send(result))
            .catch((error) => {
                res.status(412).send({ msg: error.message });
            });
    });
};
