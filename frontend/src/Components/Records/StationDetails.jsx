import { useState } from 'react';
import StationForm from '../Forms/StationForm';
import CRUDOverlay from '../CRUDOverlay';

const StationDetails = ({station, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const handleDelete = async (e) => {
        e.preventDefault()
        // if (!user) return
        try {
            const response = await fetch(`/api/locations/stations/${station._id}`, {
                method: 'DELETE'
                // headers: { 'Authorization':`Bearer ${user.token}`}
            })
            if ( !response.ok ) {
                console.log("Station not deleted!")
                console.log(response)
            }
            if (response.ok) refresh()
        } catch (e) {
            console.log("Error: ", e)
        }  
    }
    
    return (
            <tr>
                <td>{station.name}</td>
                <td>
                    <div className="dropdown">
                    <button className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                            <span className="dropdown-item" to="/link" onClick={handleDelete}>Delete</span>
                        </div>
                    </div>
                    {showModal && <CRUDOverlay element={<StationForm station={station} refresh={refresh} crud={`Edit ${station.name} station`}/>} visible={toggleShowModal} />}
                </td>
                
            </tr>
    );
}
 
export default StationDetails;