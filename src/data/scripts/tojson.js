const fs = require('fs').promises

const get = async () => {
  const data = await fs.readFile('../mounts.txt')
  const arr = Buffer.from(data).toString().trim().split("\n")
  return arr
}

const makeJson = async () => {
  const arr = await get()
  const obj = arr.reduce((final, instance) => {final[instance]=''; return final;}, {})
  await fs.writeFile('../mounts.map.json', JSON.stringify(obj))
}

makeJson()
