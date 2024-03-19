import { useState } from "react";
import PSVDetails from "../Records/PSVDetails";
import PSVForm from "../Forms/PSVForm";
import BasicFunctions from "../BasicFunctions";
import CRUDOverlay from "../CRUDOverlay";

const PSVTable = ({psvs, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const toggleShowModal = () => setShowModal(!showModal)

    return (
        <div className="psv-table">
            <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>

            <table class="table table-light table-sm">
                <thead class="">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Address</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { psvs.length ? psvs.map( (p, index) => (<PSVDetails refresh={refresh} psv={p} key={index} />)) : <tr><td>Null</td></tr>  }
                </tbody>
            </table>

            {showModal && <CRUDOverlay element={<PSVForm refresh={refresh} crud='New PSV Inspection Record'/>} visible={toggleShowModal}  />}
        </div>
    );
}
 
export default PSVTable;