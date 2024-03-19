import { useState } from "react";
import SelectBox from "../SelectBox";

const IncidentForm = ({incident, refresh, crud}) => {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState()
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    const [reportedby, setReporter] = useState('')
    const [tel, setTel] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const crime_types_arr = process.env.REACT_APP_INCIDENT_TYPES.split(',').map(type => { return {name: type}})
    console.log('Crime types: ', crime_types_arr)


    useState(()=>{
        if (incident) {
            setDate(incident.date.split('T')[0])
            setTime(incident.time)
            setLocation(incident.location)
            setType(incident.type)
            setReporter(incident.reportedby)
            setTel(incident.telephone)
        }
    },[])

    const handleDate = (e) => setDate(e.target.value)
    const handleTime = (e) => setTime(e.target.value)
    const handleLocation = (e) => setLocation(e.target.value)
    const handleType = (value) => setType(value)
    const handleReporter = (e) => setReporter(e.target.value)
    const handleTel = (e) => setTel(e.target.value)

    const handleIncident = async (e) => {
        e.preventDefault()
        // console.log(`Date: ${date}. Time: ${time}. Location: ${location}. Type: ${type}. Reporter: ${reportedby}. Tel: ${tel}.`)
        try {
            const response = await fetch(`/api/incidents/new`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({date,time,location,type,reportedby,telephone: tel})
            })
            const json = await response.json()
            if (response.ok) {
                setError(null);
                setSuccess("Incident successfully saved!");
                console.log("Response returned! ", json);
                refresh()
            } else { console.log("Response error!") }
        } catch (e) {
            console.log("Error submitting incident form")
            console.log(e)
        }
    }

    return (
        <div>
            <form className="incident-form" onSubmit={handleIncident}>
                <h3 className="highlight">{crud}</h3>
                <div className="row">
                    <div className="col">
                        <label>Date</label>
                        <input value={date} onChange={handleDate} type="date" placeholder="Date" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                    <label>Time</label>
                        <input value={time} onChange={handleTime} type="time" placeholder="Time" className="form-control form-control-sm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                    <label>Location</label>
                        <input placeholder="Location" value={location} onChange={handleLocation} className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label>Type</label>
                        <SelectBox initialValue={type} options={crime_types_arr} handleOptionChange={handleType} division="Crime Type"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Reported By</label>
                        <input placeholder="Reported by" value={reportedby} onChange={handleReporter} className="form-control form-control-sm"/>
                    </div>
                    <div className="col">
                        <label>Telephone</label>
                        <input value={tel} onChange={handleTel} type="number" placeholder="Telephone" className="form-control form-control-sm" />
                    </div>
                </div>

                <input type="submit" value="Save Incident Details" className="form-control form-control-sm btn btn-sm btn-primary"  />

                {error && <div className="alert alert-danger my-2">{error}</div>}
                {success && <div className="alert alert-success my-2">{success}</div>}

            </form>
        </div>
    );
}
 
export default IncidentForm;