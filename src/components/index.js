import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { coordinatre } = props;
  // console.log(props.coordinatre, "prosp")
  const [coordinates, setCoords] = useState({ lat: 24.903016, lng: 67.1140284 })
  const [isMarkerShown, setMarkerShown] = useState(true)

  const setMarker = (event) => {
    // setMarkerShown(false)
    // setCoords({
    //   lat: event.latLng.lat(),
    //   lng: event.latLng.lng()
    // })
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=CP5EY2IYST5EHNSPC30K3WLIHSFYHRU4ALMW1TQMVCFUODYI&
    client_secret=3XT23BNJOPZZAU15OTBGKP1D1MUSI1ZNWTMSWCZZPZ4OAIYG&v=20180323&ll=${coordinates.lat}, ${coordinates.lng}&`).then((res) => res.json())
    // setTimeout(() => {
    //   setMarkerShown(true)
    // }, 2000)
    const lt = event.latLng.lat()
    const ln = event.latLng.lng()


    fetch(`https://api.foursquare.com/v2/venues/search?client_id=CP5EY2IYST5EHNSPC30K3WLIHSFYHRU4ALMW1TQMVCFUODYI&client_secret=3XT23BNJOPZZAU15OTBGKP1D1MUSI1ZNWTMSWCZZPZ4OAIYG&v=20180323&ll=${lt},${ln}`).then((res) => res.json()).then((res) => {
      props.getMapData(res, { lt, ln })
    })
    // .then(res=>res.json())
    // .then(res=>{
  }

  return <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 24.903016, lng: 67.1140284 }}
  // defaultCenter={`${coordinates.lat} ${coordinates.lng}`}
  >
    {isMarkerShown
      && <Marker position={coordinates}
        draggable={true} onDragEnd={setMarker} />
    }
  </GoogleMap>
}
))

export default MyMapComponent;