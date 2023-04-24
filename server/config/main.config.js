module.exports = {
    port: process.env.PORT || '2020',
    mongoUrl: 'mongodb+srv://hyquynh:9XvxCGQjwELfXTy2@cluster0.kuj7jbr.mongodb.net/test',
    jwtSecret: process.env.JWTSECRET || "placeholder",
    refreshSecret: process.env.REFRESHSECRET || "refreshholder",
    tokenLife: process.env.TOKENLIFE || "24h",
    refreshLife: process.env.REFRESHLIFE || 86400,
    permission: {
        NORMAL_USER: 1,
        ADMIN: 2047,
    },
    permissionLevel: {
        NORMAL_USER: 1,
        ADMIN: 1024,
    },
    corsOrigin: "http://localhost:3000",
    email: {
        account: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASS,
    },
};
