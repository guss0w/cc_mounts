const axios = require('axios')
const fs = require('fs').promises

const getCharacters = async () => {
  const data = await fs.readFile('../characters.txt') 
  const charactersArr = Buffer.from(data).toString().trim().split("\n")
  return charactersArr
}

const getCharacterIdsFromApi = async () => {
  const charactersArr = await getCharacters()
  let output = {}
  for ( i in charactersArr ) {
    const replaced = charactersArr[i].replace(/\s/, '+')
    try {
      const apiReturn = await axios.get(`https://xivapi.com/character/search?name=${replaced}&server=Goblin`)
      const data = Array.from(apiReturn.data.Results)[0]
      output[data.Name] = data.ID
    } catch(e) {
      console.log( e )
    }
  }

  const outputDest = '../character.map.json'
  console.log(`Writing to ${outputDest}`, output)
  await fs.writeFile(outputDest, JSON.stringify(output))
}

console.log( getCharacterIdsFromApi() )
