import {useEffect} from 'react'

const Footer = ({data}) => {
  const summarizeData = (characters) => {
    console.log( characters, 'characters' )
  }
  const summary = summarizeData(data)
  
  return (
    <tfoot>
      <tr>
      </tr>
    </tfoot>
  )
}

export default Footer
