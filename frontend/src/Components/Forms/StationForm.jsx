import { useEffect, useState } from "react";
// import { AuthHook } from '../Hooks/AuthHook';

const StationForm = ({station, city, refresh, crud}) => {
    const [name, setName] = useState(null)
    // const {user} = AuthHook()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(()=>{
        if (station) {
            setName(station.name)
        }
    }, [station])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (station) {
            const response = await fetch(`/api/locations/stations/${station._id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({name})
            })
            const json = await response.json()
            if (response.ok ) {
                setError(null);
                setSuccess('Station updated!')
                refresh()
            } else {
                setError(json.error);
                console.log("Full Response: ", response)
            }
        }

        if (!station) {
            const response = await fetch(`/api/locations/stations/${city}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({name})
            })
            const json = await response.json()
            if (response.ok ) {
                setError(null);
                setSuccess('Station created!')
                setName('');
                refresh()
            } else {
                setError(json.error)
                console.log("Full Response: ", response)
            }
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="station-form">
                <h3 className="highlight">{crud}</h3>
                <input placeholder="Station Name" value={name} className="form-control form-control-sm" onChange={handleNameChange}/>
                <input type="submit" className="btn btn-sm btn-primary" /><br/>
                {error && <div className="alert alert-danger my-2">{error}</div>}
                {success && <div className="alert alert-success my-2">{success}</div>}
            </form>
        </div>
    );
}
 
export default StationForm;