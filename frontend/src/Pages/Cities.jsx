import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import CityForm from '../Components/Forms/CityForm';
import CityDetails from '../Components/Records/CityDetails';
import CRUDOverlay from "../Components/CRUDOverlay";
import BasicFunctions from "../Components/BasicFunctions";

const Cities = () => {
    const [cities, setCities] = useState([])
    const { regionName } = useParams()
    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const fetchCities = useCallback(async () => {
        try {
            const response = await fetch(`/api/locations/cities/${regionName}`)
            const json = await response.json()
            if ( response.ok ) setCities(json)
        } catch (e) {
            console.log(e)
        }
    }, [regionName])

    useEffect(()=> { fetchCities() },[fetchCities])
    const refresh = () => fetchCities()
    // const handleGoBack = () => navigate(-1)

    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight"><h3>Cities</h3></div>
                <div className="highlight-sm"><h5>Manage cities in {regionName}</h5></div>
                <div className="cities-table">
                    <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                    <hr/>
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.length > 0 && cities.map( (city, index) => (
                                <CityDetails city={city} key={index} refresh={refresh}/>
                            ) ) }
                        </tbody>
                    </table>
                    {showModal && <CRUDOverlay element={<CityForm region={regionName} refresh={refresh} crud={`New City`}/>} visible={toggleShowModal} />}
                </div>
            </div>
        </div>
    );
}
 
export default Cities;