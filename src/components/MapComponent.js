import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const MyMapComponent = withScriptjs(withGoogleMap((props) => {

    const company = useSelector(({ companyReducer }) => companyReducer.companyDetail.lagitude);

    useEffect(() => {
        if (company !== undefined) {
            const lat = +(company.lt);
            const lng = +(company.ln);
            setCoords({ lat, lng });
        }
    }, [company])

    const [coordinates, setCoords] = useState({});
    const [isMarkerShown, setMarkerShown] = useState(true);

    return (
        <GoogleMap
            defaultZoom={18}
            defaultCenter={{ lat: 24.903016, lng: 67.1140284 }}
        >
            {isMarkerShown
                && <Marker position={coordinates}
                    draggable={false} />}
        </GoogleMap>
    )
}
))

export default MyMapComponent