const Dev = require('../models/Dev')
const parseStringAsArray = require("../utils/parseStringAsArrays");

module.exports = {
  async index(request, response) {
    const { latitude, longitute, techs} = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs:{
        $in:techsArray,
      },
      location:{
        $near: {
          $geometry: {
            type:'Point',
            coordinates:[longitude, latitude],
          },
          $maxdistance: 10000,
        }
      }
    })
  }
}