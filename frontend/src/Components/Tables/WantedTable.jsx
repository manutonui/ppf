import { useState } from "react";
import WantedPersonDetails from "../Records/WantedPersonDetails";
import WantedPersonForm from "../Forms/WantedPersonForm";
import BasicFunctions from "../BasicFunctions";
import CRUDOverlay from "../CRUDOverlay";

const WantedTable = ({wanted, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const toggleShowModal = () => setShowModal(!showModal)

    return (
        <div className="wantedpersons-table">
            <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

            <table class="table table-light table-sm">
                <thead class="">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Address</th>
                        <th scope="col">D.O.B</th>
                        <th scope="col">Incident</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { wanted.length ? wanted.map( (w, index) => (<WantedPersonDetails wanted={w} key={index} />)) : <div className="null-records">Null Records</div>  }
                </tbody>
            </table>

            {showModal && <CRUDOverlay element={<WantedPersonForm wanted={wanted} refresh={refresh} crud='New Wanted Person'/>} visible={toggleShowModal}  />}
        </div>
    );
}
 
export default WantedTable;