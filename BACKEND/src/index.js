const express = require('express');
const mongoose = require('mongoose');
const routes =  require('./routes.js')

const app = express();

mongoose.connect(
  "mongodb+srv://elliancarlos:omnistack10wazedev@cluster0-nhnvh.mongodb.net/week10?retryWrites=true&w=majority", 
  {useNewUrlParser: true,
  useUnifiedTopology: true}
);

app.use(express.json())
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: request.query ( Filtros, ordenação, paginação)
// Route Parms: request.params ( Identificar um recurso na alteração ou remoção)
// Body: request.body ( Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)


app.post('/', (request, response) => {
  return response.json({
    'message':'Hello OmniStack'
  });
}); // Define o caminho da rota
 
app.listen(3333);
