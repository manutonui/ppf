import IncidentTable from "../Components/Tables/IncidentTable";
import FilterDetails from "../Components/Tables/FilterDetails";
import { useState, useEffect } from "react";

const Incidents = () => {
    const [incidents, setIncidents] = useState([])

    const fetchIncidents = async () => {
        console.log("Fetching incidents...")
        try {
            const response = await fetch(`/api/incidents`)
            const json = await response.json()
            if (response.ok) {
                setIncidents(json)
                console.log("Incidents: ", json)
            } else (
                console.log("[React] Incident fetching response error")
            )
        } catch (e) {
            console.log("Throw error: ", e)
        }
    }

    useEffect(()=>{
        // if (!incidents.length)
        fetchIncidents()
    },[])

    const refresh = () => fetchIncidents()

    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight"><h3>Incidents</h3></div>
                <div className="highlight-sm"><h5>Manage Incidents</h5></div>

                <FilterDetails />
                <IncidentTable incidents={incidents} refresh={refresh}/>
            </div>
        </div>
    );
}
 
export default Incidents;