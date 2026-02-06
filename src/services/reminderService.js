import { reminderModel } from "../models/reminderModel.js";

export const ReminderService = {
    async getAllReminders() {
        return reminderModel.getAll();
  },

  async getReminderById(reminderId) {
	const reminder = await reminderModel.findById(reminderId);
    if(!reminder) throw new Error('Reminder not found');
    return reminder;
  },

  async createReminder(newReminder) {
	const { reminder, notes, userId } = newReminder;

    const sanitizedReminder = {
        reminder: reminder?.trim(),
        notes: notes?.trim(),
        userId,
    };

    const createdReminder = await reminderModel.create(sanitizedReminder);
    return createdReminder;
  },

  async updateReminder(reminderId, newValues) {
	  const { reminder, notes, completed } = newValues;
    
    const fields = Object.keys(newValues);

    const setClauses = fields.map((key, index) => `${key} = $${index + 1}`)

    const values = Object.values(newValues);
    values.push(reminderId);

    const query = `
      UPDATE reminders
      SET ${setClauses.join(",")}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const updatedReminder = await reminderModel.update(query, values);
    if (!updatedReminder) throw new Error("Reminder not found");
    return updatedReminder;
  },

  async deleteReminder(reminderId) {
    const authenticatedUserId = 1;
    const reminder = await reminderModel.findById(reminderId);
    
    if(!reminder) {
        throw new Error('Reminder not found');
    }

    if(reminder.user_id !== authenticatedUserId) {
        throw new Error ('not authorized');
    }

    console.log ('prepared for deleting')
    const rowCount = await reminderModel.delete(reminderId);

    if (rowCount === 0) {
        throw new Error('Failed to delete the reminder');
    }
	
    return { message: 'Reminder deleted successfully' };
  }
}