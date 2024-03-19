import { useState } from "react";
import BasicFunctions from "../BasicFunctions";
import CriminalDetails from "../Records/CriminalDetails";
import CRUDOverlay from "../CRUDOverlay";
import CriminalForm from "../Forms/CriminalForm";

const CriminalTable = ({criminals, refresh}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    return (
        <div className="criminal-table">
            <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <table class="table table-light table-sm">
                <thead class="">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">D.O.B</th>
                        <th scope="col">Address</th>
                        <th scope="col">Passport/ID</th>
                        <th scope="col">Incident</th>
                        <th scope="col">Incident Time</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { criminals.length ? criminals.map( (criminal, index) => (<CriminalDetails criminal={criminal} key={index} />)) : <div className="null-records">Null Records</div>  }
                </tbody>
            </table>
            {showModal && <CRUDOverlay element={<CriminalForm refresh={refresh} crud='New Criminal Record'/>} visible={toggleShowModal}  />}
        </div>
    );
}
 
export default CriminalTable;