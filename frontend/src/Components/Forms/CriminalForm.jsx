import { useEffect, useState } from "react";
import SelectBox from "../SelectBox";
import CRUDOverlay from "../CRUDOverlay";
import TakePhoto from "../TakePhoto";

const CriminalForm = ({criminal, refresh, crud}) => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [datetime, setDatetime] = useState('')
    const [address, setAddress] = useState('')
    const [mother, setMother] = useState('')
    const [incident, setIncident] = useState('')
    const [nationality, setNationality] = useState('')
    const [passportid, setPassportid] = useState('')
    const [photo, setPhoto] = useState(null)
    const [tel, setTel] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const crime_types = process.env.REACT_APP_INCIDENT_TYPES.split(',').map(type => { return {name: type}})

    // Camera
    const [cameraModal, setCameraModal] = useState(false)
    const toggleCameraModal = () => setCameraModal(!cameraModal)
    const handleCapture = (photoURL) => setPhoto(photoURL)

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (e.target.name === 'citizen-image') reader.onloadend = () => setPhoto(reader.result)
        if (file) reader.readAsDataURL(file)
        else { setPhoto(null) }
    }

    const handleName = (e) => { setName(e.target.value) }
    const handleGender = (e) => { setGender(e.target.value) }
    const handleDob = (e) => { setDob(e.target.value) }
    const handleAddress = (e) => { setAddress(e.target.value) }
    const handleTel = (e) => { setTel(e.target.value) }
    const handleMother = (e) => { setMother(e.target.value) }
    const handleIncidentType = (value) => { setIncident(value) }
    const handleNationality = (e) => { setNationality(e.target.value) }
    const handlePassportid = (e) => { setPassportid(e.target.value) }
    const handleDatetime = (e) => { setDatetime(e.target.value) }

    const handleCriminalInfo = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/criminals/new`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, dob, gender, address, telephone: tel, mother, incident, nationality, passportid, photo, datetime})
            })
            const json = await response.json()
            if (response.ok) {
                setError(null);
                setSuccess("Criminal added to database!");
                console.log("Response returned! ", json);
                refresh()
            } else { console.log("Response error!") }
        } catch (e) {
            console.log("Error submitting Criminal info")
            console.log(e)
        }
    }

    useEffect(()=>{
        if (criminal) {
            setName(criminal.name)
            setGender(criminal.gender)
            setDob(criminal.dob)
            setDatetime(criminal.datetime)
            setAddress(criminal.address)
            setMother(criminal.mother)
            setIncident(criminal.incident)
            setNationality(criminal.nationality)
            setPassportid(criminal.passportid)
            setPhoto(criminal.photo)
            setTel(criminal.telephone)
        }
    },[criminal])

    return (
        <div>
            <form className="criminal-form" onSubmit={handleCriminalInfo}>
                <h3 className="highlight">{crud}</h3>
                <div className="image-preview">
                    <img className="citizen-photo" src={photo} alt="Criminal" />
                    <input type="file" name="citizen-image" className="form-control form-control-sm" onChange={handleImage} />

                    <div className="photo-btns">
                        <label htmlFor="image" className="btn btn-sm btn-secondary"><i className="fa-solid fa-paperclip"></i></label>
                        <label onClick={toggleCameraModal} className="btn btn-sm btn-primary"><i className="fa-solid fa-camera"></i></label>
                    </div>

                    {cameraModal && <CRUDOverlay element={<TakePhoto onCapture={handleCapture} closeModal={toggleCameraModal}/>} visible={toggleCameraModal} />}
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Full Name</label>
                        <input onChange={handleName} value={name} placeholder="Name" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Gender</label>
                        <select className="form-control form-control-sm" value={gender} onChange={handleGender}>
                            <option value="" disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="male">Female</option>
                        </select>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col">
                        <label htmlFor="">Date of Birth</label>
                        <input value={dob} onChange={handleDob} type="date" placeholder="D.O.B" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Residence Address</label>
                        <input value={address} onChange={handleAddress} placeholder="Address" className="form-control form-control-sm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Nationality</label>
                        <input value={nationality} onChange={handleNationality} placeholder="Nationality" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Telephone</label>
                        <input value={tel} onChange={handleTel} type="number" placeholder="Telephone" className="form-control form-control-sm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Incident Type</label>
                        <SelectBox initialValue={incident} options={crime_types} handleOptionChange={handleIncidentType} division="Crime Type"/>
                    </div>
                    <div className="col">
                        <label htmlFor="">Incident Date</label>
                        <input value={datetime} onChange={handleDatetime} type="date" placeholder="Date Time of Incident" className="form-control form-control-sm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Mother's Name</label>
                        <input value={mother} onChange={handleMother} placeholder="Mother's Name" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Passport/ID no.</label>
                        <input value={passportid} onChange={handlePassportid} type="number" placeholder="Passport no" className="form-control form-control-sm" />
                    </div>
                </div>

                <input type="submit" value="Save Criminal Info" className="form-control form-control-sm btn btn-primary btn-sm" />

                {error && <div className="alert alert-danger my-2">{error}</div>}
                {success && <div className="alert alert-success my-2">{success}</div>}
            </form>
        </div>
    );
}
 
export default CriminalForm;