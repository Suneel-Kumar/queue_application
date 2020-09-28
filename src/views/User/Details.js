import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import companyMiddleware from '../../redux/Middleware/companyMiddleware';
import MapComponent from '../../components/MapComponent'

const Details = () => {
    const { showCompany } = useParams();
    const dispatch = useDispatch();
    // const company = useSelector(({ companyReducer }) => companyReducer.companyDetail);
    useEffect(() => {
        dispatch(companyMiddleware.CompanyId(showCompany));
    }, [])

    return (
        <div>
            <div>
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px`, width: '80%', margin: '0 auto' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    // LagLat={company.lagitude}
                />
            </div>
        </div>
    )
}

export default Details;