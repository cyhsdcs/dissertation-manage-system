module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'mysql123456',
        port: '3306',
        database: 'login',
        authPlugins: {
            mysql_native_password: () => () => {
                return require('mysql2/auth_plugins/caching_sha2_password');
            }
        }
    }
}
