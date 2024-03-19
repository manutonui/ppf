import { useState } from 'react';
import CityForm from '../Forms/CityForm';
import { Link } from 'react-router-dom';
import CRUDOverlay from '../CRUDOverlay';

const CityDetails = ({city, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const handleDelete = async (e) => {
        e.preventDefault()
        // if (!user) return
        
        const response = await fetch(`/api/locations/cities/${city._id}`, {
            method: 'DELETE'
            // headers: { 'Authorization':`Bearer ${user.token}` }
        })
        if ( !response.ok ) { console.log("Delete City Response: ", response) }
        if (response.ok) refresh()
    }
    
    return (
            <tr>
                <td>{city.name}</td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li className="dropdown-item" onClick={toggleShowModal}>Edit</li>
                            <li className="dropdown-item" to="/link" onClick={handleDelete}>Delete</li>
                            <Link className="dropdown-item" to={"/Stations/"+city.name}>Stations</Link>
                        </div>
                    </div>
                    {showModal && <CRUDOverlay element={<CityForm city={city} refresh={refresh} crud={`Edit ${city.name} City`}/>} visible={toggleShowModal} />}
                </td>
            </tr>
    );
}
 
export default CityDetails;