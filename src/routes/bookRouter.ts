import {Router } from 'express'
import bookController from '../controllers/bookController';


const router = Router();

// Routes

/**
 * @swagger
 * tags:
 *      name: Books
 *      description: Manage book
 */

/**
 * @openapi
 * /api/book:
 *   get:
 *      tags: [Books]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
router.get('/', bookController.getBook)
/**
  * @openapi
  * /api/book/{id}:
  *  get:
  *      tags: [Books]
  *      description: Get an book by id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *         default: 1
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.get('/:id', bookController.getBookById)
/**
  * @openapi
  * /api/book:
  *  post:
  *      tags: [Books]
  *      description: Add an book
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "title":"TestUpdate", "author": "Aucun", "available": "false","self_service_id": "cd2df542-a957", user_id: null, borrow_date: null}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/', bookController.addBook)
/**
  * @openapi
  * /api/book/{title}:
  *  put:
  *      tags: [Books]
  *      description: Update an book
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
router.put('/:title', bookController.updateBook)


/**
  * @openapi
  * /api/book/{id}:
  *  delete:
  *      tags: [Books]
  *      description: Delete an book
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *      responses:
  *        200:
  *          description: Returns a mysterious string. 
  */
router.delete('/:id', bookController.deleteBook)

export default router

