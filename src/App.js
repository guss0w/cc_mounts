// Libraries
import {useState, useEffect} from 'react'
import axios from 'axios'
// Style
import './App.css'
// Data
import charactermap from './data/character.map.json'
import mountlist from './data/mounts.map.json'

function App() {
  const [table, setTable] = useState([])
  const orderedMounts = Object.keys(mountlist)
  
  // Only run our api request on first load
  useEffect(() => {
    document.title = 'C&C Mounts List'
    const get = async (characterId) => {
      const privateKey = "cd40cec1f7294f50a2f480e731e6de97daa78b41ccb543159943caefb5698be6"
      const request = `https://xivapi.com/character/${characterId}?data=MIMO&private_key=${privateKey}`

      const character = await axios.get(request)
      let characterMounts = orderedMounts.reduce((final, instance) => {final[instance]=false; return final;}, {})
      if (!character || !character.data || !character.data.Character) {
        character.data.Character = {
          Avatar: '',
          ID: 0,
          Name: ''
        }
      }
      if (!character || !character.data || !character.data.Mounts) {
        character.data.Mounts = []
      } else {
        for(let idx in character.data.Mounts) {
          const mountName = character.data.Mounts[idx].Name
          if(characterMounts[mountName] !== undefined) {
            characterMounts[mountName] = true
          }
        }
      }

      const formatted = {
        Avatar: character.data.Character.Avatar,
        Name: character.data.Character.Name,
        ID: character.data.Character.ID,
        Mounts: characterMounts
      }
      return formatted
    }
    async function getData() {
      const characters = await Promise.all(Object.keys(charactermap).map(k => get(charactermap[k])))
      setTable(characters)
    }
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>C&C Mount Farms</h1>
      </header>
      <div>
        <table>
          <thead>
             <tr>
             <th/>
               {orderedMounts.map(mount => (
                 <th key={mount}>
                   {mountlist[mount]}
                 </th>
               ))}
             </tr>
          </thead>
          <tbody>
            {table.map(char => (
              <tr key={char.ID}>
                <td className="user">
                  <img alt={char.Name} className="avatar" src={char.Avatar}/>
                  <span className="username">{char.Name}</span>
                </td>
                {orderedMounts.map(mount => (
                   <td key={mount} className="mountGot">{char.Mounts[mount] ? 'x' : ''}</td>
                ))}
              </tr>
            ))}
            {table.length === 0 ? <tr><td>Loading...</td></tr> : <></>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
