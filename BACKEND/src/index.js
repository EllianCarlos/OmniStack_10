const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http =  require('http');
const routes =  require('./routes.js');
const { setupWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(
  "mongodb+srv://elliancarlos:omnistack10wazedev@cluster0-nhnvh.mongodb.net/week10?retryWrites=true&w=majority", 
  {useNewUrlParser: true,
  useUnifiedTopology: true}
);

// app.use(cors({origin:'http://localhost:3000'})) // Libera apenar para o localhost na porta 3000
app.use(cors()) // Liberar para tudo
app.use(express.json())
app.use(routes);
// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: request.query ( Filtros, ordenação, paginação)
// Route Parms: request.params ( Identificar um recurso na alteração ou remoção)
// Body: request.body ( Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)


// Adicionado o Socket.io ==> Protocolo WebSocket para possibilitar com que o Backend envie dados para o FrontEnd sem requisições HTTP


app.post('/', (request, response) => {
  return response.json({
    'message':'Hello OmniStack'
  });
}); // Define o caminho da rota
 
server.listen(3333);
