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
  console.log( mountlist )
  const get = async (characterId) => {
    const privateKey = "cd40cec1f7294f50a2f480e731e6de97daa78b41ccb543159943caefb5698be6"
    const request = `https://xivapi.com/character/${characterId}?data=MIMO&private_key=${privateKey}`

    const character = await axios.get(request)
    if (!character || !character.data || !character.data.Character) {
      character.data.Character = {
        Avatar: '',
        ID: 0,
        Name: ''
      }
    }
    if (!character || !character.data || !character.data.Mounts) {
      character.data.Mounts = []
    }
    const formatted = {
      Avatar: character.data.Character.Avatar,
      Name: character.data.Character.Name,
      ID: character.data.Character.ID,
      Mounts: character.data.Mounts
    }
    return formatted
  }
  const getAll = async () => {
    const characters = await Promise.all(Object.keys(charactermap).map(k => get(charactermap[k])))
    setTable(characters)
  }
  
  // Only run our api request on first load
  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <table>
          <thead>
             <tr>
             <td/>
               {Object.keys(mountlist).map(mount => (
                 <td key={mount}>
                   {mountlist[mount]}
                 </td>
               ))}
             </tr>
          </thead>
          <tbody>
            {table.map(char => (
              <tr key={char.ID}>
                <td><img className="avatar" src={char.Avatar}/>{char.Name}</td>
              </tr>
            ))}
            {table.length === 0 ? <tr>Loading...</tr> : ''}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
