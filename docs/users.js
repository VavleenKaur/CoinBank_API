const createUser = {
    tags: ['Users'],
    description: 'Create a new user in the system',
    operationId: 'createUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createUserBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'User created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string',
                                example: '60564fcb544047cdc3844818',
                            },
                            name: {
                                type: 'string',
                                example: 'John Doe',
                            },
                            emailId: {
                                type: 'string',
                                example: 'john.doe@email.com',
                            },

                            coinBalance: {
                                type: 'number',
                                example: 346,
                            },
                            createdAt: {
                                type: 'string',
                                example: '2021-03-20T19:40:59.495Z',
                            },
                            updatedAt: {
                                type: 'string',
                                example: '2021-03-20T21:23:10.879Z',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const createUserBody = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'John Doe',
        },
        emailId: {
            type: 'string',
            example: 'john.doe@email.com',
        },
        coinBalance: {
            type: 'number',
            example: 346,
        },

    },
};

const deleteUser = {
    tags: ['Users'],
    description: 'Delete a user',
    operationId: 'deleteUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'id',
            in: 'path',
            description: 'User ID',
            required: true,
            type: 'string',
        },
    ],
    responses: {
        '201': {
            description: 'User deleted successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User deleted successfully!',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal Server Error',
                            },
                        },
                    },
                },
            },
        },
    },
};

module.exports = { createUser, createUserBody, deleteUser };