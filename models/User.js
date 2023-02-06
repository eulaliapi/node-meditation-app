import connection from '../config/database.js'

class User {

    static async createUser(user) {
        const {email, password} = user;

        const sql = `INSERT INTO users (email, password) VALUES(?, ?)`;
        const newUser = await connection.query(sql, [email, password]);
        
        return newUser;
    }

    static async findByEmail(email) {
        const sql = `SELECT * from users WHERE email = ?`;
        const user = await connection.query(sql, [email]);
        return user;
    }

    static async saveToken(token, userId) {
        const sql = `UPDATE users SET access_token = ? WHERE id = ?`;
        const update = await connection.query(sql, [token, userId]);

        return update;
    }

    static async deleteToken(userId) {
        const sql = `UPDATE users SET access_token = "" WHERE id = ?`;
        const update = await connection.query(sql, [userId]);

        return update;
    }

}

export default User;