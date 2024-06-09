export default () => ({
    NODE_ENV: process.env.NODE_ENV, //need to deploy in Railway
    port: parseInt(process.env.PORT), // chuyển sang dạng số thôi ko có j
    secret: process.env.SECRET,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT),
    usernname: process.env.USERNAMEE, //THE FUCK SAME NAME
    password: process.env.PASSWORD,
    dbName: process.env.DB_NAME,
})