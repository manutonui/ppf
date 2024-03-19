import { useState } from 'react';
import RegionForm from '../Forms/RegionForm';
import { Link } from 'react-router-dom';
import CRUDOverlay from '../CRUDOverlay';

const RegionDetails = ({region, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const handleDelete = async (e) => {
        e.preventDefault()
        // if (!user) return
        const response = await fetch(`/locations/regions/${region._id}`, {
            method: 'DELETE'
            // headers: { 'Authorization':`Bearer ${user.token}`}
        })
        // const json = await response.json()
        if ( !response.ok ) { console.log("Region not deleted!") }
        if (response.ok) {
            refresh()
            console.log("Region deleted!")
        	// dispatch({type: 'DELETE_MATCH', payload: json})
        }
    }
    
    return (
        <tr>
            <td>{region.name}</td>
            <td>{region.capital}</td>
            <td>
            <div className="dropdown">
                <button className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                        <span className="dropdown-item" onClick={handleDelete}>Delete</span>
                        <Link className="dropdown-item" to={"/Cities/"+region.name}>Cities</Link>
                    </div>
                </div>
                {showModal && <CRUDOverlay element={<RegionForm region={region} refresh={refresh} crud={`Edit ${region.name} Region`}/>} visible={toggleShowModal} />}
            </td>
        </tr>
    );
}
 
export default RegionDetails;