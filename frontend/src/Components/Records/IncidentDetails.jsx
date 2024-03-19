import { useState } from "react";
import IncidentForm from "../Forms/IncidentForm";
import CRUDOverlay from "../CRUDOverlay";

const IncidentDetails = ({incident, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)
    return (
            <tr>
                <td>{new Date(incident.date).toDateString()}</td>
                <td>{incident.time}</td>
                <td>{incident.location}</td>
                <td>{incident.type}</td>
                <td>{incident.reportedby}</td>
                <td>
                    
                    <div className="dropdown">
                        <button className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                            <span className="dropdown-item">Delete</span>
                        </div>
                    </div>
                    {showModal && <CRUDOverlay element={<IncidentForm incident={incident} refresh={refresh} crud={`Edit Incident Record`} />} visible={toggleShowModal} />}
                </td>
            </tr>
    );
}
 
export default IncidentDetails;