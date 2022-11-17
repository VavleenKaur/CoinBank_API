const express = require('express');
const router = express.Router();

const { createUser, getUser, getUsers, updateUser, deleteUser, transferAmount, checkBalance } = require('./controller/user_controller');


/**
 * @swagger
 * /api:
 *   get:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */



router.get('/', getUsers);


/**
 * @swagger
 * /api/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Get a particular user by id
 *     responses:
 *       200:
 *         description: Returns the requested user
 */

router.get('/:id', getUser);


/**
 * @swagger
 * /api:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        description: New user
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            emailId:
 *              type: string
 *            coinBalance:
 *              type: number
 *     responses:
 *       201:
 *         description: Created
 */

router.post('/', createUser);


/**
 * @swagger
 * /api/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *      - in: body
 *        name: user
 *        description: Update user details
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            emailId:
 *              type: string
 *     responses:
 *       201:
 *         description: Returns the updated user
 */

router.put('/:id', updateUser);

/**
 * @swagger
 * /api/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Delete a user by id
 *     responses:
 *       200:
 *         description: Returns the requested user
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /api/transfer/{senderId}/{receiverId}/{amount}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: senderId
 *        required: true
 *        type: string
 *        description: The Sender ID.
 *      - in: path
 *        name: receiverId
 *        required: true
 *        type: string
 *        description: The Receiver ID.
 *      - in: path
 *        name: amount
 *        required: true
 *        type: number
 *        description: The Amount to be transferred.
 *     responses:
 *       201:
 *         description: Transferred succesfully
 */
router.put('/transfer/:senderId/:receiverId/:amount', transferAmount);

/**
 * @swagger
 * /api/checkBalance/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Get a particular user by id
 *     responses:
 *       200:
 *         description: Returns the requested user's coinBalance
 */


router.get('/checkBalance/:id', checkBalance);


module.exports = router;