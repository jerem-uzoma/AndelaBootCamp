module.exports = {
    database: "recipe-api",
    username: "",
    password: "",
    params: {
        dialect: "postgres",
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: "NTASK_TEST",
    jwtSession: { session: false }
};