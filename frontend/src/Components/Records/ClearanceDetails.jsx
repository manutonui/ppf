import CRUDOverlay from "../CRUDOverlay";
import ClearanceForm from "../Forms/ClearanceForm";
import { useState } from "react";
import PDFOverlay from "../PDFOverlay";
import ClearancePDF from "../PDF/ClearancePDF";

const ClearanceDetails = ({clearance, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)
    const [showPdf, setShowPDF] = useState(false)
    const toggleShowPDF = () => setShowPDF(!showPdf)
    return (
        <tr>
            <td>{clearance.address}</td>
            <td>{clearance.name}</td>
            <td>{clearance.telephone}</td>
            <td>{clearance.occupation}</td>
            <td>{clearance.destination}</td>
            <td>
                <div className="dropdown">
                    <button className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span className="dropdown-item" onClick={toggleShowModal}>Edit</span>
                        <span className="dropdown-item" onClick={toggleShowPDF}>Generate PDF</span>
                    </div>
                </div>
                {showModal && <CRUDOverlay element={<ClearanceForm clearance={clearance} refresh={refresh} crud={`Editing Clearance Record`} />} visible={toggleShowModal} />}
                {showPdf && <PDFOverlay element={<ClearancePDF clearance={clearance} />} visible={toggleShowPDF} />}
            </td>
        </tr>
    );
}
 
export default ClearanceDetails;