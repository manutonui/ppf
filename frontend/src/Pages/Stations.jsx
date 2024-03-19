import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import StationForm from '../Components/Forms/StationForm';
import StationDetails from '../Components/Records/StationDetails';
import CRUDOverlay from "../Components/CRUDOverlay";
import BasicFunctions from "../Components/BasicFunctions";

const Stations = () => {
    const [stations, setStations] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const { cityName } = useParams()

    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const fetchStations = useCallback(async () => {
        try {
            const response = await fetch(`/api/locations/stations/${cityName}`)
            const json = await response.json()
            if ( response.ok ) setStations(json)
        } catch (e) {
            console.log(e)
        }
    }, [cityName])

    useEffect(() => {
        fetchStations()
    },[fetchStations])
    const refresh = () => fetchStations()

    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight"><h3>Stations</h3></div>
                <div className="highlight-sm"><h5>Manage stations in {cityName}</h5></div>
                <div className="stations-table">
                    <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                    
                    <hr/>
                    <table className="table table-light table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stations.length > 0 && stations.map( (station, index) => (
                                <StationDetails station={station} key={index} refresh={refresh}/>
                            ) ) }
                            
                        </tbody>
                    </table>
                    {showModal && <CRUDOverlay element={<StationForm city={cityName} refresh={refresh} crud={`New station in ${cityName}`}/>} visible={toggleShowModal} />}
                </div>
            </div>
        </div>
    );
}
 
export default Stations;