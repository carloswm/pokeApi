import React, { useState, useEffect } from 'react';

const Card = () => {

  const [api, setApi] = useState([]);

  const getApi = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
      const data = await response.json()
      setApi(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getApi()
  }, [])

  return (
    <div>
      Card
    </div>
  )
}

export default Card