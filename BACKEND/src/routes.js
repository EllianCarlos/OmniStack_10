const { Router } = require('express');


const DevController = require('./controllers/DevController.js')
const SearchController = require('./controllers/SearchController.js')

const routes =  Router();

routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)


routes.get('/search', )

module.exports = routes;