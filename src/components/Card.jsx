import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Card = () => {

  const [api, setApi] = useState([]);
  const [name, setName] = useState('');
  const [find, setFind] = useState('pikachu');

  const getApi = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${find}`)
      const data = await response.json()
      setApi(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getApi()
  }, [find])

  const handleChange = (e) => {
    setName(e.target.value.toLowerCase())
  }

  const handleSubmit = () => {
    if( name !== '') setFind(name)
    setName('')
  }

  if(api.stats === undefined) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  const switchColor = () => {
    api?.stats?.find( (stat) => {
      if( stat.stat.name === 'hp') {
        return '#f44336'
      } else if( stat.stat.name === 'attack') {
        return '#4caf52'
      } else if( stat.stat.name === 'defense') {
        return '#2875bc'
      } else {
        return '#ffc107'
      }
    })
  }

  return (
    <div className="card-container">
      <div className="input-container">
        <div className="control">
          <input type="text"
            onChange={ handleChange }
            value={ name }
            placeholder="Find pokemons by name!"
          />
          <button
            onClick={ handleSubmit }
          >
            Search
          </button>
        </div>
      </div>
      <div className="card">
        <div className="top-main">
          <div className="title">
            <h1>{api.name}</h1>
          </div>
          <div className="content">
            <p className="height">{ api.height } m</p>
            <img className="img" src={ api.sprites?.other.home.front_default } alt={ api.name } />
            <p className="weight">{ api.weight } kg</p>
          </div>
          <div className="experience">
            <p>{api.base_experience} experience</p>
          </div>
        </div>
        <div className="stadistic">
          <div className="title">
            <p>Stadistics</p>
          </div>
          <div className="stats-content">
            {
              api?.stats?.map( (stat, index) => {
                return (
                  <div key={ index } className="stats">
                    <p className="name">{ stat.stat.name }</p>
                    <CircularProgressbar
                      value={ stat.base_stat }
                      text={ stat.base_stat }
                      styles={{
                        path: {
                          stroke: `${console.log(switchColor())}`,
                        },
                        text: {
                          fill: '#636063'
                        }
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card