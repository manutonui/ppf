import { useState, useEffect, useCallback } from "react";
import IncidentDetails from "../Records/IncidentDetails";
import IncidentForm from "../Forms/IncidentForm";
import BasicFunctions from "../BasicFunctions";
import CRUDOverlay from "../CRUDOverlay";

const IncidentTable = ({incidents, refresh}) => {
    const [is, setIs] = useState([])
    const [activeTab, setActiveTab] = useState('active');
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const toggleShowModal = () => setShowModal(!showModal)

    const filterIncidents = useCallback((activeTab) => {
        console.log("Filtering incidents: ", activeTab)
        let is = []
        if ( activeTab === 'active' ) { is = incidents.filter( c => c.active ) }
        if ( activeTab === 'deleted' ) { is = incidents.filter( c => !c.active ) }
        console.log("Is: ", is)
        return is
    }, [incidents])
    
    useEffect( () => {
        setIs(filterIncidents(activeTab))
    }, [activeTab, incidents, filterIncidents] )

    return (
        <div className="incidents-table">
            <BasicFunctions toggleShowModal={toggleShowModal} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <nav>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')} href="#active">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'deleted' ? 'active' : ''}`} onClick={() => setActiveTab('deleted')} href="#deleted">Closed</a>
                    </li>
                </ul>
            </nav>

            <table class="table table-light table-sm">
                <thead class="">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Location</th>
                        <th scope="col">Type</th>
                        <th scope="col">Reported by</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id={activeTab === 'active' ? 'active':'deleted'}>
                    { is.length ? is.map( (ic, index) => (<IncidentDetails incident={ic} key={index} />)) : <tr><td>Null</td></tr>  }
                </tbody>
            </table>

            {showModal && <CRUDOverlay element={<IncidentForm refresh={refresh} crud="New Incident"/>} visible={toggleShowModal}  />}
        </div>
    );
}
 
export default IncidentTable;