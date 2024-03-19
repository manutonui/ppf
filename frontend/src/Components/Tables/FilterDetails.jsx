import { useEffect, useState } from "react"
import SelectBox from "../SelectBox";

const FilterDetails = ({newDateFrom, newDateTo, newRegion}) => {
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState('')

    const handleDateFrom = (e) => {
        setDateFrom(e.target.value)
        newDateFrom(e.target.value)
    }
    const handleDateTo = (e) => {
        setDateTo(e.target.value)
        newDateTo(e.target.value)
    }
    const handleRegionChange = (value) => {
        setRegion(value)
        newRegion(value)
    }

    const fetchRegions = async () => {
        console.log("Fetching regions...")
        try {
            const response = await fetch(`/api/locations/regions`)
            const json = await response.json()
            // console.log("Response: ", response)
            if (response.ok) {
                setRegions(json)
                console.log("Regions: ", json)
            } else (
                console.log("[React] Regions fetching response error")
            )
        } catch (e) {
            console.log("Throw error: ", e)
        }
    }

    useEffect(() => {
        // if ( !regions.length )
        fetchRegions()
    }, [])

    return (
        <div className="filter">
            <div className="row">
                <div className="col">
                    <label htmlFor="">From</label>
                    <input className="form-control form-control-sm" type="date" value={dateFrom} onChange={handleDateFrom}/>
                </div>
                <div className="col">
                    <label htmlFor="">To</label>
                    <input className="form-control form-control-sm" type="date" value={dateTo} onChange={handleDateTo}/>
                </div>
                <div className="col">
                    <label htmlFor="">Region</label>
                    <SelectBox options={regions} handleOptionChange={handleRegionChange} division="Region" initialValue={region}/>
                </div>
            </div>
        </div>
    );
}
 
export default FilterDetails;