import { useEffect, useState } from "react";
// import { AuthHook } from '../Hooks/AuthHook';

const RegionForm = ({region, refresh, crud}) => {
    const [name, setName] = useState('')
    const [capital, setCapital] = useState('')
    // const {user} = AuthHook()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(()=>{
        if (region) {
            setName(region.name)
            setCapital(region.capital)
        }
    }, [region])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (region) { // update region
            const response = await fetch(`/api/locations/regions/${region._id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({name, capital})
            })
            const json = await response.json()
            if (response.ok ) {
                setError(null);
                setSuccess('Region updated!')
                refresh()
            } else {
                setError(json.error);
                console.log("Full Response: ", response)
            }
        }

        if (!region) { // create region
            const response = await fetch(`/api/locations/regions`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization':`Bearer ${user.token}`
                },
                body: JSON.stringify({name, capital})
            })
            const json = await response.json()
            if (response.ok ) {
                setError(null);
                setSuccess('Region created!')
                setName(''); setCapital('');
                refresh()
            } else {
                setError(json.error);
                console.log("Full Response: ", response)
            }
        }
    }

    const handleNameChange = (e) => setName(e.target.value)
    const handleCapitalChange = (e) => setCapital(e.target.value)

    return (
        <div>
            <form onSubmit={handleSubmit} className="region-form">
                <h3 className="highlight">{crud}</h3>
                <label htmlFor="">Region</label>
                <input placeholder="Region Name" value={name} className="form-control form-control-sm" onChange={handleNameChange}/>
                <label htmlFor="">Capital</label>
                <input placeholder="Capital" value={capital} className="form-control form-control-sm" onChange={handleCapitalChange}/>
                <input type="submit" className="btn btn-sm btn-primary" /><br/>
                {error && (<><div className="alert alert-danger my-2">{error}</div></>)}
                {success && (<><div className="alert alert-success my-2">{success}</div></>)}
            </form>
        </div>
    );
}
 
export default RegionForm;