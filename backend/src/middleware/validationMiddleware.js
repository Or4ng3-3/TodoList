import { ZodError } from 'zod';
import ERROR_MESSAGES from '../constants/errorMessages.js';

export function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next(); 
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: ERROR_MESSAGES.INVALID_DATA,
          details: error.issues.map(i => ({ path: i.path.join('.'), message: i.message }))
        });
      }  

      res.status(500).json({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
      });
    }
  };
}