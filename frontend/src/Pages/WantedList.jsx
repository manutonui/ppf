import { useState, useEffect } from "react"
import FilterDetails from "../Components/Tables/FilterDetails"
import WantedTable from "../Components/Tables/WantedTable"

const WantedList = () => {
    const [wantedpersons, setWantedPersons] = useState([])
    useEffect( () => { fetchWantedPersons() }, [] )
    const refresh = () => fetchWantedPersons()

    const fetchWantedPersons = async () => {
        console.log("Fetching wanted persons...")
        try {
            const response = await fetch(`/api/wanted`)
            const json = await response.json()
            if (response.ok) {
                setWantedPersons(json)
                console.log("Wanted persons: ", json)
            } else (
                console.log("[React] Fetching wanted persons error")
            )
        } catch (e) {
            console.log("Throw error: ", e)
        }
    }

    return (
        <div className="page">
            <div className="page-contents">
                <h3 className="highlight">Wanted Persons</h3>
                <h5 className="highlight-sm">Manage records of wanted persons</h5>
                <FilterDetails />
                <WantedTable wanted={wantedpersons} refresh={refresh} />
            </div>

        </div>
    );
}
 
export default WantedList;