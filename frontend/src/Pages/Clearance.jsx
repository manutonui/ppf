import { useEffect, useState } from "react";
import ClearanceTable from "../Components/Tables/ClearanceTable";
import FilterDetails from "../Components/Tables/FilterDetails";

const Clearance = () => {
    const [clearances, setClearances] = useState([])
    const [dateTo, setDateTo] = useState(null)
    const [dateFrom, setDateFrom] = useState(null)
    const [region, setRegion] = useState('')

    const fetchClearances = async () => {
        console.log("Fetching clearances...")
        try {
            const response = await fetch(`/api/clearances`)
            const json = await response.json()
            if (response.ok) {
                setClearances(json)
                console.log("Clearances: ", json)
            } else (
                console.log("[React] Clearance fetching response error")
            )
        } catch (e) {
            console.log("Throw error: ", e)
        }
    }

    useEffect(()=>{
        // if (!clearances.length)
        fetchClearances()
    },[])

    useEffect(()=>{
        
    },[dateFrom, dateTo, region])

    const refresh = () => fetchClearances()

    const updateDateFrom = (value) => {setDateTo(value)}
    const updateDateTo = (value) => {setDateFrom(value)}
    const updateRegion = (value) => {setRegion(value)}    

    return (
        <div className="page">
            <div className="page-contents">
                <div className="highlight"><h3>Clearances</h3></div>
                <div className="highlight-sm"><h5>Manage clearances</h5></div>
                <FilterDetails newDateFrom={updateDateFrom} newDateTo={updateDateTo} newRegion={updateRegion} />
                <ClearanceTable clearances={clearances} refresh={refresh}/>
                
            </div>
        </div>
    );
}
 
export default Clearance;