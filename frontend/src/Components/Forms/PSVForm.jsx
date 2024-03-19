import { useEffect, useState } from "react";

const PSVForm = ({psv, refresh, crud}) => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [address, setAddress] = useState('')
    const [mother, setMother] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [nationality, setNationality] = useState('')
    const [passportid, setPassportid] = useState('')
    const [guarantor, setGuarantor] = useState('')
    const [guarantoraddress, setGuarantoraddress] = useState('')
    const [guarantortel, setGuarantortel] = useState('')
    const [photo, setPhoto] = useState(null)
    const [tel, setTel] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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
    const handleFrom = (e) => { setFrom(e.target.value) }
    const handleTo = (e) => { setTo(e.target.value) }
    const handleNationality = (e) => { setNationality(e.target.value) }
    const handlePassportid = (e) => { setPassportid(e.target.value) }
    const handleGuarantor = (e) => { setGuarantor(e.target.value) }
    const handleGuarantoraddress = (e) => { setGuarantoraddress(e.target.value) }
    const handleGuarantortel = (e) => { setGuarantortel(e.target.value) }

    const handlePsv = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/psv/new`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, dob, gender, address, telephone: tel, mother, from, to, nationality, passportid, guarantor, guarantoraddress, guarantortel, photo})
            })
            const json = await response.json()
            if (response.ok) {
                setError(null);
                setSuccess("PSV successfully saved!");
                console.log("Response returned! ", json);
                refresh()
            } else { console.log("Response error!") }
        } catch (e) {
            console.log("Error submitting PSV form")
            console.log(e)
        }
    }

    useEffect(()=>{
        if (psv) {
            setName(psv.name)
            setGender(psv.gender)
            setDob(psv.dob)
            setAddress(psv.address)
            setMother(psv.mother)
            setFrom(psv.from)
            setTo(psv.to)
            setNationality(psv.nationality)
            setPassportid(psv.passportid)
            setGuarantor(psv.guarantor)
            setGuarantoraddress(psv.guarantoraddress)
            setGuarantortel(psv.guarantortel)
            setPhoto(psv.photo)
            setTel(psv.telephone)
        }
    },[psv])

    return (
        <div>
            <form className="psv-form" onSubmit={handlePsv}>
                <h3 className="highlight">{crud}</h3>
                <div className="form-subsection-desc">Personal Info</div>
                <div className="image-preview">
                    <label htmlFor="">Photo</label>
                    <img className="citizen-photo" src={photo} alt="Citizen" />
                    <input type="file" name="citizen-image" className="form-control form-control-sm" onChange={handleImage} />
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
                        <label htmlFor="">Telephone</label>
                        <input value={tel} onChange={handleTel} type="number" placeholder="Telephone" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Mother's Name</label>
                        <input value={mother} onChange={handleMother} placeholder="Mother's Name" className="form-control form-control-sm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Place From</label>
                        <input value={from} onChange={handleFrom} placeholder="From" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Place To</label>
                        <input value={to} onChange={handleTo} placeholder="To" className="form-control form-control-sm" /></div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="">Nationality</label>
                        <input value={nationality} onChange={handleNationality} placeholder="Nationality" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="">Passport/ID</label>
                        <input value={passportid} onChange={handlePassportid} type="number" placeholder="Passport no" className="form-control form-control-sm" />
                    </div>
                </div>
                
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
                    <label htmlFor="">Guarantor Address</label>
                    <input value={guarantoraddress} onChange={handleGuarantoraddress} placeholder="Address" className="form-control form-control-sm" />
                </div>

                <input type="submit" value="Save PSV Details" className="form-control form-control-sm btn btn-primary btn-sm" />

                {error && <div className="alert alert-danger my-2">{error}</div>}
                {success && <div className="alert alert-success my-2">{success}</div>}
            </form>
        </div>
    );
}
 
export default PSVForm;