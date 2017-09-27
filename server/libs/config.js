module.exports = {
    database: 'morerecipe',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        define: {
            underscored: true,
        },
    },
    jwtSecret: 'kappax40@#ht_ee334',
    jwtSession: { session: false },
};