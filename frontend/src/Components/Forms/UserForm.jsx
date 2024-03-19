import { useState, useEffect, useCallback } from "react"
import SelectBox from "../SelectBox"
import TakePhoto from "../TakePhoto"
import CRUDOverlay from "../CRUDOverlay"

const UserForm = ({user, refresh, regions, crud}) => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [address, setAddress] = useState('')
    const [region, setRegion] = useState('')
    const [city, setCity] = useState('')
    const [station, setStation] = useState('')
    const [image, setImage] = useState(''); // profile picture
    // const [regions, setRegions] = useState([])
    const [cities, setCities] = useState([])
    const [stations, setStations] = useState([])
    const [accessLevel, setAccessLevel] = useState('')
    const accessLevels = [{name: "Self"},{name: "Station"},{name: "City"},{name: "Region"}]

    // Camera
    const [cameraModal, setCameraModal] = useState(false)
    const toggleCameraModal = () => setCameraModal(!cameraModal)
    const handleCapture = (photoURL) => setImage(photoURL)
    
    const handleFnameChange = (e) => setFname(e.target.value)
    const handleLnameChange = (e) => setLname(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleTelChange = (e) => setTel(e.target.value)
    const handleAddressChange = (e) => setAddress(e.target.value)
    const handleRegionChange = (value) => setRegion(value)
    const handleCityChange = (value) => setCity(value)
    const handleStationChange = (value) => setStation(value)
    const handleRoleChange = (value) => setAccessLevel(value)

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Trying...")
            const response = await fetch('/api/users/signup',  {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({firstName: fname, lastName: lname, email, phone: tel, address, region, city, station, image})
            })
            // const json = await response.json()
            if (response.ok) {
                console.log("Profile created")
                refresh()
            }
            else console.log("Res: ", response)

        } catch (e) {
            console.log(e)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => setImage(reader.result)
    
        if (file) reader.readAsDataURL(file)
        else setImage(null)
    };

    const fetchCities = useCallback(async () => {
        console.log(`[React] Sending fetch cities of ${region} request...`)
        try {
            const response = await fetch(`/api/locations/cities/${region}`)
            const json = await response.json()
            if (response.ok) { setCities(json); console.log("Cities: ", json) }
            else console.log("[React] Level 1 error")
        } catch (e) { console.log("Throw error") }
    }, [region])

    const fetchStations = useCallback(async () => {
        console.log("[React] Sending fetch stations request...")
        try {
            const response = await fetch(`/api/locations/stations/${city}`)
            const json = await response.json()
            if (response.ok) { setStations(json); console.log("Stations: ", json) }
            else console.log("[React] Level 1")
        } catch (e) { console.log("Throw error") }
    }, [city])

    useEffect( () => {
        // if (_regions) setRegions(_regions)
        // console.log("Regions length: ", regions.length)
        console.log('User', user)
        if (user) {
            setFname(user.firstName)
            setLname(user.lastName)
            setEmail(user.email)
            setTel(user.phone)
            setAddress(user.address)
            setRegion(user.region)
            setCity(user.city)
            setStation(user.station)
            setImage(user.image)
        }
        if (region) {
            fetchCities() // to load options
            if (city) fetchStations()
        }
        
    }, [user, region, city, fetchCities, fetchStations] )

    

    return (
        <div>
            <form onSubmit={handleUserSubmit} >
                <h3 className="highlight">{crud}</h3>
                <div className="image-preview">
                    <label htmlFor="">Photo</label>
                    <img src={image} alt="User"/>
                    <input type="file" name="image" className="form-control form-control-sm" id="image" onChange={handleImageChange} />

                    <div className="photo-btns">
                        <label htmlFor="image" className="btn btn-sm btn-secondary"><i className="fa-solid fa-paperclip"></i></label>
                        <label onClick={toggleCameraModal} className="btn btn-sm btn-primary"><i className="fa-solid fa-camera"></i></label>
                    </div>

                    {cameraModal && <CRUDOverlay element={<TakePhoto onCapture={handleCapture} closeModal={toggleCameraModal}/>} visible={toggleCameraModal} />}
                </div>
                
                <div className="row">
                    <div className="col">
                        <label htmlFor="">First Name</label>
                        <input value={fname} placeholder="First Name" onChange={handleFnameChange} className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        {/* <label>Away<span className='required'>*</span></label> */}
                        <label htmlFor="">Last Name</label>
                        <input value={lname} placeholder="Last Name" onChange={handleLnameChange} className="form-control form-control-sm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Telephone</label>
                        <input type="tel" placeholder="Telephone" value={tel} onChange={handleTelChange} className="form-control form-control-sm" />
                    </div>
                </div>
                

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Address</label>
                        <input value={address} placeholder="Address" onChange={handleAddressChange} className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        {/* <label>Away<span className='required'>*</span></label> */}
                        <label htmlFor="">Region</label>
                        <SelectBox options={regions} handleOptionChange={handleRegionChange} division="Region" initialValue={region}/>
                        
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">City</label>
                        <SelectBox options={cities} handleOptionChange={handleCityChange} division="City" initialValue={city}/>
                    </div>
                    <div className="col">
                        {/* <label>Away<span className='required'>*</span></label> */}
                        <label htmlFor="">Station</label>
                        <SelectBox options={stations} handleOptionChange={handleStationChange} division="Station" initialValue={station}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Access Level</label>
                        <SelectBox options={accessLevels} handleOptionChange={handleRoleChange} division="Role" initialValue={accessLevel} />
                    </div>
                    <div className="col"></div>
                </div>
                
                <input type="submit" className="btn btn-info" /><br/>
            </form>
        </div>
    );
}
 
export default UserForm;