import { ReminderService } from "../services/reminderService.js";

export const ReminderController = {
  async getAllReminders(req, res, next) {
    try {
        const reminders = await ReminderService.getAllReminders();
        res.status(200).json(reminders);
    } catch (error) {
        next(error);
    }
  },

  async getReminderById(req, res, next) {
    try{
        const reminderId = parseInt(req.params.id, 10);
        //console.log(`reminderId: ${reminderId}`)
        const reminder = await ReminderService.getReminderById(reminderId);
        res.status(200).json(reminder);
    } catch (error) {
        next(error);
    }
	  
  },

  async createReminder(req, res, next) {
    try{
        const newReminder = await ReminderService.createReminder(req.body);
        res.status(200).json(newReminder);
    } catch (error) {
        next(error);
    }
	  
  },

  async updateReminder(req, res, next) {
	  try {
        const reminderId = parseInt(req.params.id, 10);
        //console.log(`reminderId: ${reminderId}`)
        const updatedReminder = await ReminderService.updateReminder(reminderId, req.body);
        res.status(200).json(updatedReminder)
      } catch (error) {
        next(error);
      }
  },

  async deleteReminder(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);
      //console.log(`reminderId: ${reminderId}`)
      const reminder = await ReminderService.deleteReminder(reminderId);
      res.status(200).json(reminder);
    } catch (error) {
      next(error);
    }
  },
};