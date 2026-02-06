import db from '../config/db.js';

export async function up() {
  try {
    await db.query(`
        INSERT INTO reminders (reminder, notes,user_id)
        values($1, $2, $3)
        RETURNING *
    `, ['hi there', 'for test only', 1]);
  } catch (error) {
    console.log(error);
  }

}

export async function down() {
  try {
    await db.query(`
        DELETE FROM reminders WHERE reminder=$1 AND notes=$2 AND user_id=$3
    `, ['hi there', 'for test only', 1]);
  } catch (error) {
    console.log(error);
  }
}

up();