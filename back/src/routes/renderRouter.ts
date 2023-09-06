import {Router } from 'express'
import renderController from '../controllers/renderController';


const router = Router();

// Routes

/**
 * @swagger
 * tags:
 *      name: Render
 *      description: Manage Render
 */
/**
  * @openapi
  * /api/render/{title}:
  *  put:
  *      tags: [Render]
  *      description: Update an Render
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
  *         default:  { "self_service_id": "cd2df542-a957"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.put('/:title', renderController.renderBook)




export default router

