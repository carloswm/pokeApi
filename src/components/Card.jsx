import React, { useState, useEffect } from 'react';

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

  const handleSubmit = (e) => {
    if( name !== '') setFind(name)
    setName('')
  }

  const { front_default } = api.sprites.other.home

  return (
    <div>
      <div>
        <input type="text"
          onChange={ handleChange }
          value={ name }
        />
        <button
          onClick={ handleSubmit }
        >
          Search
        </button>
      </div>
      <h1>{api.name}</h1>
      <img src={ front_default } alt={ api.name } />
    </div>
  )
}

export default Card