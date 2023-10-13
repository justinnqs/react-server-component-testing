const express = require('express')
const { Client } = require('pg')
const cors = require('cors')
const app = express()
const fs = require('fs')

app.use(cors())

const client = new Client({
    user: 'postgres',
    host: 'host.docker.internal',
    database: 'mydb',
    password: 'mysecretpassword',
    port: '5432'
})

client.connect((err) => {
    if (err) throw err;
    console.log('Connected')
    const dbMigration = fs.readFileSync('./init_migration.sql', "utf8")
    client.query(dbMigration)
    console.log('db migrated')
})

const arrayOfCols = [
    'national_dex', 
    'pokemon_name', 
    'type_i',
    'type_ii',
    'ability_i',
    'ability_ii',
    'hidden_ability'
]
const availableCols = new Set(arrayOfCols) 

const tsvJSON = (tsv) => {
    const lines = tsv.split("\n");
    const result = [];
    const headers = lines[0].split("\t");
  
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split("\t");
  
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
  
      result.push(obj);
    }
  
    return result;
}

app.get("/seed", (req, res) => {
    const pokemonData = fs.readFileSync('./PokemonData.tsv', "utf8")
    const pokemonJsonData = tsvJSON(pokemonData)
    pokemonJsonData.forEach((pokemon) => {
        const listOfVals = []
        Object.keys(pokemon).forEach((col) => {
            const pokemonHeader = col.toString().toLowerCase().replace(' ', '_')
            if(availableCols.has(pokemonHeader)) {
                listOfVals.push(pokemon[col] !== '' ? `'${pokemon[col].replace(`'`, '')}'` : `'null'`)
            }
        })
        try {
            client.query( 
                `INSERT INTO pokemon VALUES (${listOfVals.join(',')})`
            )
        } catch {
            console.log(arrayOfCols, listOfVals)
        }
    })
    console.log('seeded')
    // console.log(tsvJSON(fileData))
    res.json({
        "seed": "successful"
    })
})

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.get("/fetch_pokemon", (req, res) => {
    client.query("SELECT * FROM pokemon").then((data) => {
        console.log(data)
        res.json({data})
    })
    
})


app.listen(4000, () => { console.log("Server started on port 4000")})