import React, { useEffect, useState } from 'react'
import { Grid, Label } from 'semantic-ui-react'
import AvailabilityColumn from './AvailabilityColumn'

const GridRow = ({ product ,manufacturers ,style }) => {
  const [availbility,setAvailability] = useState('')
  const manufacturer =  manufacturers[product.manufacturer]

  useEffect(() => {
    if(manufacturer && manufacturers[product.manufacturer].error ){ //If manufacturer information exists and error is set
      setAvailability('ERROR')
      return
    }

    if( manufacturer && manufacturer.data){ //If manufacturer information exists then serach record
      const record = manufacturer.data.find( item => {
        if(item.id === product.id.toUpperCase()){
          return true
        }
      })

      if(record){ // If record found return record with apprporiate formatting
        let availability = record.DATAPAYLOAD.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/g).map(val => val.replace(/<\/?INSTOCKVALUE>/g,''))
        setAvailability(availability[0])
      }
    }
  },[availbility])

  /**Component for Individual Product */
  return (
    <Grid.Row columns='5'
      style={
        /*Set background color based on availability data*/
        { height: style.height,
          backgroundColor:
        availbility.includes('LESSTHAN')?
          'lightyellow':
          availbility.includes('OUTOFSTOCK') || availbility.includes('ERROR')?
            'mistyrose':
            ''
        }
      }
    >
      <Grid.Column width='4'>{product.name}</Grid.Column>
      <Grid.Column width='3'>{product.manufacturer}</Grid.Column>
      <Grid.Column width='3'>{
      /**Displaying colored labels insted of text */
        product.color && product.color.map((color) => {
          return (
            <Label size='mini' circular key={color} style={{ backgroundColor: color, border:color==='white'?'0.1em solid black':'' }}></Label>)})
      }</Grid.Column>
      <Grid.Column width='2'>{product.price}</Grid.Column>

      <AvailabilityColumn product={product} manufacturer = {manufacturer} availability={availbility}/>


    </Grid.Row>
  )
}



export default GridRow