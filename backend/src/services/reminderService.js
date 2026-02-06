import ERROR_MESSAGES from "../constants/errorMessages.js";
import { reminderModel } from "../models/reminderModel.js";
import  CustomError  from "../utils/CustomError.js";

export const ReminderService = {
    async getAllReminders() {
        return reminderModel.getAll();
  },

  async getReminderById(reminderId) {
	const reminder = await reminderModel.findById(reminderId);
    if(!reminder) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
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
    if (!updatedReminder) throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
    return updatedReminder;
  },

  async deleteReminder(reminderId) {
    const authenticatedUserId = 1;
    const reminder = await reminderModel.findById(reminderId);
    
    if(!reminder) {
        throw new CustomError(ERROR_MESSAGES.REMINDER_NOT_FOUND, 404);
    }

    if(reminder.user_id !== authenticatedUserId) {
        throw new CustomError(ERROR_MESSAGES.FORBIDDEN, 403);
    }

    const rowCount = await reminderModel.delete(reminderId);

    if (rowCount === 0) {
        throw new CustomError(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);;
    }
	
    return { message: 'Reminder deleted successfully' };
  }
}