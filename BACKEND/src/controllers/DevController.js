const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArrays')

// index, show, update, destroy
module.exports = {
  async index(request, response){
    const devs = await Dev.find();

    return response.json(devs)
  },
  async store(request, response){
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({github_username});
    
    if(!dev) {
      
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
      
      const {name = login, avatar_url, bio} = apiResponse.data; // o name = login seta um valor padrão caso name não seja encontrado na resposta
  
      const techsArray = parseStringAsArray(techs);
  
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };
  
      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      }) 
    }


    return response.json({dev});
  }

};