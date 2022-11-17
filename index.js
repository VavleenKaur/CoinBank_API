


const express = require('express');
const mongoose = require('mongoose');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const { MONGO_URI } = require('./constants')

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'CoinBank REST API',
            description: "A REST API built with Nodejs, Express and MongoDB."
        },
    },
    apis: ["./router/api.js"]
}


app.use('/api', require('./router/api'));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api', (req, res) => res.send('Its working!'));
app.use(function (err, req, res, next) {

    res.status(422).send({ error: err.message });
});


app.listen(process.env.port || 4000, function () {
    console.log('Ready to Go!');
});