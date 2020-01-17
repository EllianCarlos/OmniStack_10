import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css'
import './app.css'
import './sidebar.css'
import './main.css'

import DevItem from './components/DevItem/'
import DevForm from './components/DevForm/'
// Fundamentos do React:
// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Como 'Atributos HTML', informações que um Parent Component passa para um Child Component
// Estado: Informações mantidas pelo componente 

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() =>{
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs();
  }, [])


  function async handleAddDev(data) {}
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => ( 
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
