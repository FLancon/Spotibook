import {Router } from 'express'
import selfServiceController from '../controllers/selfServiceController';


const router = Router();

// Routes

/**
 * @swagger
 * tags:
 *      name: SelfService
 *      description: Manage selfservice
 */

/**
 * @openapi
 * /api/selfservice:
 *   get:
 *      tags: [SelfService]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
router.get('/', selfServiceController.getSelfService)
/**
  * @openapi
  * /api/selfservice/{id}:
  *  get:
  *      tags: [SelfService]
  *      description: Get an selfservice by id
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
router.get('/:id', selfServiceController.getSelfServiceById)
/**
  * @openapi
  * /api/selfservice:
  *  post:
  *      tags: [SelfService]
  *      description: Add an selfservice
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "location":"Boulogne", "address": "35 rue de la poupée qui tousse", "zip_code": 62200}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/', selfServiceController.addSelfService)
/**
  * @openapi
  * /api/selfservice/{location}:
  *  put:
  *      tags: [SelfService]
  *      description: Update an selfservice
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: location
  *         in: path
  *         required: true
  *         type: string
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: { "location":"BoulogneUpdate", "address": "35 rue de la poupée qui tousse update ", "zip_code": 62230}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.put('/:location', selfServiceController.updateSelfService)
/**
  * @openapi
  * /api/selfservice/{location}:
  *  delete:
  *      tags: [SelfService]
  *      description: Delete an selfservice
  *      parameters:
  *       - name: location
  *         in: path
  *         required: true
  *         type: string
  *      responses:
  *        200:
  *          description: Returns a mysterious string. 
  */
router.delete('/:location', selfServiceController.deleteSelfService)

export default router

