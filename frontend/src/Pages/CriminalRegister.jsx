import { useState, useEffect } from "react"
import FilterDetails from "../Components/Tables/FilterDetails"
import CriminalTable from "../Components/Tables/CriminalTable"

const CriminalRegister = () => {
    const [criminals, setCriminals] = useState([])

    useEffect( () => { fetchCriminals() }, [] )
    const refresh = () => fetchCriminals()

    const fetchCriminals = async () => {
        console.log("Fetching criminals...")
        try {
            const response = await fetch(`/api/criminals`)
            const json = await response.json()
            if (response.ok) {
                setCriminals(json)
                console.log("Criminals: ", json)
            } else (
                console.log("[React] Psv fetching criminals error")
            )
        } catch (e) {
            console.log("Throw error: ", e)
        }
    }

    return (
        <div className="page">
            <div className="page-contents">
                <h3 className="highlight">Criminal Register</h3>
                <h5 className="highlight-sm">Manage criminal record register</h5>
                <FilterDetails />
                <CriminalTable criminals={criminals} refresh={refresh} />
            </div>
        </div>
    );
}
 
export default CriminalRegister;