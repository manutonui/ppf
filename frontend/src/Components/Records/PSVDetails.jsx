import CRUDOverlay from "../CRUDOverlay";
import PSVForm from "../Forms/PSVForm";
import { useState } from "react";

const PSVDetails = ({psv, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)
    return (
        <tr>
            <td>{psv.name}</td>
            <td>{psv.gender}</td>
            <td>{psv.address}</td>
            <td>{psv.from}</td>
            <td>{psv.to}</td>
            <td>
                <div className="dropdown">
                    <button className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                        <span className="dropdown-item">Delete</span>
                    </div>
                </div>
                {showModal && <CRUDOverlay element={<PSVForm psv={psv} refresh={refresh} crud={`Edit PSV Inspection Record`} />} visible={toggleShowModal} />}
            </td>
        </tr>
    );
}
 
export default PSVDetails;