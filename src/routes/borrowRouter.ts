import {Router } from 'express'
import borrowController from '../controllers/borrowController';


const router = Router();

// Routes

/**
 * @swagger
 * tags:
 *      name: Borrow
 *      description: Manage Borrow
 */
/**
  * @openapi
  * /api/borrow/{title}:
  *  put:
  *      tags: [Borrow]
  *      description: Update an Borrow
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: title
  *         in: path
  *         required: true
  *         type: string
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default:  { "title":"TestUpdate", "author": "Aucun", "available": "false","self_service_id": "cd2df542-a957", user_id: null, borrow_date: null}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.put('/:title', borrowController.borrowBook)




export default router

