const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'My COINBANK REST API - Documentation',
        description: 'Description of my COINBANK API here',
        // termsOfService: 'https://mysite.com/terms',
        contact: {
            name: 'Vavleen Kaur',
            email: 'shynaishu1910@gmail.com',

        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
    },
    servers: [
        {
            url: 'http://localhost:4000/api',
            description: 'Local Server',
        },
        // {
        //     url: 'https://api.mysite.com',
        //     description: 'Production Server',
        // },
    ],
    tags: [
        {
            name: 'Users',
        }
    ],
    paths: {
        user: {
            post: createUser,
        },
        'user/{id}': {
            delete: deleteUser,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            createUserBody,
        },
    },
};

module.exports = { apiDocumentation };