import CRUDOverlay from "../CRUDOverlay";
import CriminalForm from "../Forms/CriminalForm";
import { useState } from "react";

const CriminalDetails = ({criminal, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    return (
            <tr>
                <td>{criminal.name}</td>
                <td>{criminal.gender}</td>
                <td>{new Date(criminal.dob).toLocaleDateString()}</td>
                <td>{criminal.address}</td>
                <td>{criminal.passportid}</td>
                <td>{criminal.incident}</td>
                <td>{new Date(criminal.datetime).toLocaleDateString()}</td>
                <td>
                    <div className="dropdown">
                        <button className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                            <span className="dropdown-item">Delete</span>
                        </div>
                    </div>
                    {showModal && <CRUDOverlay element={<CriminalForm criminal={criminal} refresh={refresh} crud={`Editing Criminal Record`} />} visible={toggleShowModal} />}
                </td>
            </tr>
    );
}
 
export default CriminalDetails;