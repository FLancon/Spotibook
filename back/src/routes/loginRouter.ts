import { Router } from "express";
import loginController from "../controllers/loginController";

const router = Router();

/**
 * @swagger
 * tags:
 *      name: Login
 *      description: Log to the app
 */

/**
  * @openapi
  * /api/login/:
  *  post:
  *      tags: [Login]
  *      description: Login
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"name": "Alexis","code": "34RNJ3D"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/', loginController.login)


export default router