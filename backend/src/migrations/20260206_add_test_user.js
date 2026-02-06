import db from '../config/db.js'

export async function up() {
    try {
        await db.query(`
            INSERT INTO users (name)
            values($1)
            RETURNING *
        `, ["user_1"]);
    } catch (error) {
        console.log (error)
    }
}

export async function down() {
    try {
        await db.query(`
            DELETE FROM users WHERE name=$1
        `, [user_1]);
    } catch (error) {
        console.log (error)
    }
}

up()