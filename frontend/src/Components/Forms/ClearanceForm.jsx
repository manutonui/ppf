import { useState } from "react";
import CRUDOverlay from "../CRUDOverlay";
import TakePhoto from "../TakePhoto";

const ClearanceForm = ({clearance, refresh, crud}) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [citizenphoto, setCitizenPhoto] = useState(''); // profile picture
    const [guarantorphoto, setGuarantorPhoto] = useState(''); //
    const [name, setName] = useState('')
    const [dest, setDest] = useState('')
    const [address, setAddress] = useState('')
    const [tel, setTel] = useState('')
    const [mother, setMother] = useState('')
    const [birthplace, setBirthPlace] = useState('')
    const [dob, setDob] = useState(null)
    const [occupation, setOccupation] = useState('')
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const [passport, setPassport] = useState('')
    const [remarks, setRemarks] = useState('')
    const [minors, setMinors] = useState(0)
    const [guarantor, setGuarantor] = useState('')
    const [guarantortel, setGuarantortel] = useState(0)
    const [guarantoraddress, setGuarantoraddress] = useState('')

    // Camera
    const [cameraModal1, setCameraModal1] = useState(false)
    const [cameraModal2, setCameraModal2] = useState(false)
    const toggleCameraModal1 = () => setCameraModal1(!cameraModal1)
    const toggleCameraModal2 = () => setCameraModal2(!cameraModal2)
    const handleCapture1 = (photoURL) => setCitizenPhoto(photoURL)
    const handleCapture2 = (photoURL) => setGuarantorPhoto(photoURL)

    useState(()=>{
        if (clearance) {
            setName(clearance.name)
            setDob(clearance.date)
            setGender(clearance.gender)
            setAddress(clearance.address)
            setTel(clearance.telephone)
            setMother(clearance.mother)
            setNationality(clearance.nationality)
            setPassport(clearance.passportid)
            setCitizenPhoto(clearance.citizenphoto)
            setGuarantorPhoto(clearance.guarantorphoto)
            setDest(clearance.destination)
            setBirthPlace(clearance.birthplace)
            setOccupation(clearance.occupation)
            setRemarks(clearance.remarks)
            setMinors(clearance.minors)
            setGuarantor(clearance.guarantor)
            setGuarantortel(clearance.guarantortel)
            setGuarantoraddress(clearance.guarantoraddress)
        }
    }, [])
    

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (e.target.name === 'citizen-image') reader.onloadend = () => setCitizenPhoto(reader.result)
        if (e.target.name === 'guarantor-image') reader.onloadend = () => setGuarantorPhoto(reader.result)
        if (file) reader.readAsDataURL(file)
        else { setCitizenPhoto(null); setGuarantorPhoto(null) }
    }
    const handleClearance = async (e) => {
        e.preventDefault()
        if (!clearance) { // new: post
            try {
                console.log("Submitting clearance form...")
                const response = await fetch(`/api/clearances/new`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, date:dob, destination: dest, address, telephone: tel, gender, mother, birthplace, occupation, minors, nationality, passport, remarks, citizenphoto, guarantorphoto, guarantor, guarantoraddress, guarantortel })
                })
                const json = await response.json()
    
                if (response.ok) {
                    setError(null);
                    setSuccess("Clearance successfully saved!");
                    console.log("Response returned! ", json);
                    refresh()
                } else {
                    setError(json.error)
                    console.log("Response error!")
                }
            } catch (e) {
                console.log("Error submitting clearance form")
                console.log(e)
            }
        } else if (clearance) { // existing: update
            try {
                console.log("Submitting clearance form...")
                const response = await fetch(`/api/clearances/update/${clearance._id}`, {
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name, date:dob, destination: dest, address, telephone: tel, gender, mother, birthplace, occupation, minors, nationality, passport, remarks, citizenphoto, guarantorphoto, guarantor, guarantoraddress, guarantortel })
                })
                const json = await response.json()
    
                if (response.ok) {
                    setError(null);
                    setSuccess("Clearance successfully updated!");
                    console.log("Response returned! ", json);
                    refresh()
                } else {
                    setError(json.error)
                    console.log("Response error!")
                }
            } catch (e) {
                console.log("Error updating clearance form")
                console.log(e)
            }
        }
    }
    const handleName = (e) => { setName(e.target.value) }
    const handleDest = (e) => { setDest(e.target.value) }
    const handleAddress = (e) => { setAddress(e.target.value) }
    const handleTel = (e) => { setTel(e.target.value) }
    const handleGender = (e) => { setGender(e.target.value) }
    const handleMother = (e) => { setMother(e.target.value) }
    const handleBirthPlace = (e) => { setBirthPlace(e.target.value) }
    const handleDOB = (e) => { setDob(e.target.value) }
    const handleOccupation = (e) => { setOccupation(e.target.value) }
    const handleMinors = (e) => { setMinors(e.target.value) }
    const handleNationality = (e) => { setNationality(e.target.value) }
    const handlePassport = (e) => { setPassport(e.target.value) }
    const handleRemarks = (e) => { setRemarks(e.target.value) }
    const handleGuarantor = (e) => { setGuarantor(e.target.value) }
    const handleGuarantortel = (e) => { setGuarantortel(e.target.value) }
    const handleGuarantoraddress = (e) => { setGuarantoraddress(e.target.value) }

    return (
        <div>
            <form className="clearance-form" onSubmit={handleClearance}>
                <h3 className="highlight">{crud}</h3>
                <div className="row">
                    <div className="col-md-3">
                        <div className="image-preview">
                            <img className="citizen-photo" src={citizenphoto} alt="Citizen" />
                            <input type="file" name="citizen-image" onChange={handleImage} />
                            <div className="photo-btns">
                                <label htmlFor="image" className="btn btn-sm btn-secondary"><i className="fa-solid fa-paperclip"></i></label>
                                <label onClick={toggleCameraModal1} className="btn btn-sm btn-primary"><i className="fa-solid fa-camera"></i></label>
                            </div>
                            {cameraModal1 && <CRUDOverlay element={<TakePhoto onCapture={handleCapture1} closeModal={toggleCameraModal1}/>} visible={toggleCameraModal1} />}
                            <br />
                            <img className="guarantor-photo" src={guarantorphoto} alt="Guarantor"/>
                            <input type="file" name="guarantor-image" onChange={handleImage} />
                            <div className="photo-btns">
                                <label htmlFor="image" className="btn btn-sm btn-secondary"><i className="fa-solid fa-paperclip"></i></label>
                                <label onClick={toggleCameraModal2} className="btn btn-sm btn-primary"><i className="fa-solid fa-camera"></i></label>
                            </div>
                            {cameraModal2 && <CRUDOverlay element={<TakePhoto onCapture={handleCapture2} closeModal={toggleCameraModal2}/>} visible={toggleCameraModal2} />}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="personal-info-section">
                            <div className="form-subsection-desc">Personal Info</div>
                            <label htmlFor="">Destination</label>
                            <input placeholder="Destination" className="form-control form-control-sm" value={dest} onChange={handleDest} />
                            <label htmlFor="">Full Name</label>
                            <input placeholder="Name" className="form-control form-control-sm" value={name} onChange={handleName} />
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Residence Address</label>
                                    <input placeholder="Residence Address" className="form-control form-control-sm" value={address} onChange={handleAddress}/>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Telephone</label>
                                    <input type="text" placeholder="Telephone" className="form-control form-control-sm" value={tel} onChange={handleTel}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Gender</label>
                                    <select className="form-control form-control-sm" onChange={handleGender} value={gender} defaultValue={''}>
                                        <option value="" disabled>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="male">Female</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Mother's Name</label>
                                    <input value={mother} placeholder="Mother" className="form-control form-control-sm" onChange={handleMother} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Birth Place</label>
                                    <input value={birthplace} placeholder="Birth Place" className="form-control form-control-sm" onChange={handleBirthPlace} />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Date of Birth</label>
                                    <input type="date" value={dob} placeholder="Birth Date" className="form-control form-control-sm" onChange={handleDOB} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Nationality</label>
                                    <input value={nationality} placeholder="Nationality" className="form-control form-control-sm" onChange={handleNationality}/>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Passport/ID</label>
                                    <input type="number" value={passport} placeholder="Passport no." className="form-control form-control-sm" onChange={handlePassport}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Occupation</label>
                                    <input value={occupation} placeholder="Occupation" className="form-control form-control-sm" onChange={handleOccupation}/>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Minors</label>
                                    <input value={minors} type="number" placeholder="Minors" className="form-control form-control-sm" onChange={handleMinors}/>
                                </div>
                                
                            </div>

                            <label htmlFor="">Remarks</label>
                            <textarea  cols="30" rows="3" className="form-control form-control-sm" placeholder="Remarks" value={remarks} onChange={handleRemarks}></textarea>
                        </div>
                        <br/>

                        <div className="guarantor-info-section">
                            <div className="form-subsection-desc">Guarantor Info</div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Guarantor Full Name</label>
                                    <input value={guarantor} onChange={handleGuarantor} placeholder="Guarantor" className="form-control form-control-sm" />
                                </div>
                                <div className="col">
                                    <label htmlFor="">Guarantor Telephone</label>
                                    <input value={guarantortel} onChange={handleGuarantortel} type="number" placeholder="Tel" className="form-control form-control-sm" />
                                </div>
                            </div>
                            <label htmlFor="">Guarantor Residence Address</label>
                            <input value={guarantoraddress} onChange={handleGuarantoraddress} placeholder="Address" className="form-control form-control-sm" />
                        </div>
                        
                        

                        <input type="submit" value="Submit Clearance" className="form-control form-control-sm btn btn-primary btn-sm" />

                        {error && <div className="alert alert-danger my-2">{error}</div>}

                        {success && <div className="alert alert-success my-2">{success}</div>}
                        
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default ClearanceForm;