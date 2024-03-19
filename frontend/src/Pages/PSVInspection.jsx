import FilterDetails from "../Components/Tables/FilterDetails";
import { useEffect, useState } from "react";
import PSVTable from "../Components/Tables/PSVTable";

const PSVInspection = () => {
    const [psvs, setPsvs] = useState([])

    useEffect( () => {
        fetchPsvs()
    }, [] )

    const fetchPsvs = async () => {
        console.log("Fetching psvs...")
        try {
            const response = await fetch(`/api/psv`)
            const json = await response.json()
            if (response.ok) {
                setPsvs(json)
                console.log("Psvs: ", json)
            } else (
                console.log("[React] Psv fetching response error")
            )
        } catch (e) {
            console.log("Throw error: ", e)
        }
    }

    const refresh = () => fetchPsvs()

    return (
        <div className="page">
            <div className="page-contents">
                <h3 className="highlight">PSV Inspection</h3>
                <h5 className="highlight-sm">Manage PSV details</h5>
                <FilterDetails />
                <PSVTable psvs={psvs} refresh={refresh} />
                
            </div>
        </div>
    );
}
 
export default PSVInspection;