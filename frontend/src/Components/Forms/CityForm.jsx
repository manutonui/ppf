import { useEffect, useState } from "react";

const CityForm = ({city, region, refresh, crud}) => {
    const [name, setName] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(()=>{
        if (city) {
            setName(city.name)
        }
    }, [city])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (city) {
            const response = await fetch(`/api/locations/cities/${city._id}`,{
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
                setSuccess('City updated!')
                console.log("City updated!")
                refresh()
                // setName(''); setCapital('');
            } else {
                setError(json.error);
                console.log("Full Response: ", response)
            }
        }

        if (!city) {
            const response = await fetch(`/api/locations/cities/${region}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({name})
            })
            // const json = await response.json()
            if (response.ok ) {
                setError(null);
                setSuccess('City created!')
                console.log("City created!")
                refresh()
                setName('');
            } else {
                console.log("Full Response: ", response)
            }
        }
    }

    const handleNameChange = (e) => setName(e.target.value)

    return (
        <div>
            <form onSubmit={handleSubmit} className="city-form">
                <h3 className="highlight">{crud}</h3>
                <input placeholder="City Name" value={name} className="form-control form-control-sm" onChange={handleNameChange}/>
                <input type="submit" className="btn btn-sm btn-primary" />
                {error && <div className="alert alert-danger my-2">{error}</div>}
                {success && <div className="alert alert-success my-2">{success}</div>}
            </form>
        </div>
    );
}
 
export default CityForm;