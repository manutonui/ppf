import { useState, useEffect, useCallback } from "react";
import ClearanceDetails from "../Records/ClearanceDetails";
import BasicFunctions from "../BasicFunctions";
import CRUDOverlay from "../CRUDOverlay";
import ClearanceForm from "../Forms/ClearanceForm";

const ClearanceTable = ({clearances, refresh}) => {
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)
    const [searchTerm, setSearchTerm] = useState('')
    const [cs, setCs] = useState([])
    const [activeTab, setActiveTab] = useState('active');
    

    const filterClearances = useCallback((activeTab) => {
        console.log("Filtering clearances: ", activeTab)
        let cs = []
        if ( activeTab === 'active' ) { cs = clearances.filter( c => c.active ) }
        if ( activeTab === 'deleted' ) { cs = clearances.filter( c => !c.active ) }
        console.log("Cs: ", cs)
        return cs
    }, [clearances])

    useEffect( () => {
        setCs(filterClearances(activeTab))
    }, [activeTab, clearances, filterClearances] )

    return (
        <div className="clearance-table">
            <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <nav>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')} href="#active">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'deleted' ? 'active' : ''}`} onClick={() => setActiveTab('deleted')} href="#deleted">Deleted</a>
                    </li>
                </ul>
            </nav>

            <table className="table table-light table-sm">
                <thead className="">
                    <tr>
                        <th scope="col">Address</th>
                        <th scope="col">Name</th>
                        <th scope="col">Tel</th>
                        <th scope="col">Occupation</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody id={activeTab === 'active' ? 'active':'deleted'}>
                    { cs.length ? cs.map( (c, index) => (<ClearanceDetails clearance={c} key={index} refresh={refresh} />)) : <tr><td className="null-records">Null Records</td></tr> }
                </tbody>
            </table>
            {showModal && <CRUDOverlay element={<ClearanceForm refresh={refresh} crud='New Clearance Report'/>} visible={toggleShowModal}  />}
            
        </div>
    );
}
 
export default ClearanceTable;