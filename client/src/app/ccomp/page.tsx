'use client'
import { useState, useEffect, Suspense } from 'react'

export default function Page() {
  const [pokemonList, setPokemonList] = useState()

  useEffect(() => {
    fetch('http://localhost:4000/fetch_pokemon').then(response => 
      response.json()
    ).then(response => {
      console.log(response)
      setPokemonList(response.data.rows.map((pokemon: any) => {
        return(
          <tr key={pokemon['national_dex']}>
            <th>
              {pokemon['national_dex']}
            </th>
            <th>
              {pokemon['pokemon_name']}
            </th>
            <th>
              {pokemon['type_i']}
            </th>
          </tr>
        )
      }))
    })
  }, [])

  console.log(pokemonList)
  if(pokemonList) {
    return (
      <>
        <h1>Client Component</h1>
        <table>
          <tbody>
            <tr>
              <th>National Dex</th>
              <th>Pokemon Name</th>
              <th>Type I</th>
              <th>Type II</th>
              <th>Ability I</th>
              <th>Ability II</th>
              <th>Hidden Ability</th>
            </tr>
            {pokemonList}
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>Loading...</>
  )
}
