import React, {useState} from 'react';

function DevForm({ OnSubmit}) {
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  function async handleSubmit(){
    e.prevent.default();

    await OnSubmit({github_username, techs, latitude, longitude});

    setGithubUsername('')
    setTechs('')
  }

  <form onSubmit={handleAddDev}>
    <div className="input-block">
      <label htmlFor="github_username">Usuário do Github</label>
      <input
        name="github_username"
        id="github_username"
        value={github_username}
        onChange={e => setGithubUsername(e.target.value)}
        required
      />
    </div>

    <div className="input-block">
      <label htmlFor="techs">Tecnologias</label>
      <input
        name="techs"
        id="techs"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        required
      />
    </div>

    <div className="input-group">
      <div className="input-block">
        <label htmlFor="latitude">Latitude</label>
        <input
          name="latitue"
          type="number"
          id="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
        />
      </div>
      <div className="input-block">
        <label htmlFor="longitude">Longitude</label>
        <input
          name="longitude"
          type="number"
          id="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
        />
      </div>
    </div>
    <button type="submit">Salvar</button>
  </form>
}

export default DevForm;
