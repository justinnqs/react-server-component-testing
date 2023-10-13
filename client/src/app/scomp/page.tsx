
'use server'
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'host.docker.internal',
  database: 'mydb',
  password: 'mysecretpassword',
  port: '5432'
})

client.connect((err: any) => {
  if (err) throw err;
  console.log('Connected')
})

export default async function Page() {
  const data = await client.query("SELECT * FROM pokemon").then((data: any) => {
    return data.rows
  })

//   useEffect(() => {
//     fetch('http://localhost:4000/api').then(response => 
//       response.json()
//     ).then(data => {console.log(data)})
//   }, [])
  const pokemonList = data.map((pokemon: any) => {
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
  })

  // console.log(data)
  return (
    <>
      <h1>Server Component</h1>
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
