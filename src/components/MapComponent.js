import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {

    const company = useSelector(({ companyReducer }) => companyReducer.companyDetail.lagitude);
    console.log(company)
    const [coordinates, setCoords] = useState({ lat: 24.903016, lng: 67.1140284 });
    const [isMarkerShown, setMarkerShown] = useState(true);

    // useEffect(() => {
    //     setCoords(LagLat);
    // }, [props])

    const setMarker = (event) => {
        //     setMarkerShown(false)
        //     setCoords({
        //         lat: event.latLng.lat(),
        //         lng: event.latLng.lng()
        //     })
        //     setTimeout(() => {
        //         console.log('marker***')
        //         setMarkerShown(true)
        //     }, 2000)
    }
    // { lat: parseFloat(lat), lng: parseFloat(lng) }

    return <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 24.903016, lng: 67.1140284 }}
    >
        {isMarkerShown
            && <Marker position={coordinates}
                draggable={false} onDragEnd={setMarker} />}
    </GoogleMap>
}
))

export default MyMapComponent