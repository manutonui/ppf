import { useState } from "react";
import WantedPersonForm from "../Forms/WantedPersonForm";
import CRUDOverlay from "../CRUDOverlay";

const WantedPersonDetails = ({wanted, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)
    return (
            <tr>
                <td>{wanted.name}</td>
                <td>{wanted.gender}</td>
                <td>{wanted.address}</td>
                <td>{new Date(wanted.dob).toLocaleDateString()}</td>
                <td>{wanted.incident}</td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                            <span className="dropdown-item">Delete</span>
                        </div>
                    </div>
                    {showModal && <CRUDOverlay element={<WantedPersonForm wanted={wanted} refresh={refresh} crud={`Edit Wanted Person Record`} />} visible={toggleShowModal} />}
                </td>
            </tr>
    );
}
 
export default WantedPersonDetails;