const Wanted = require('../models/wantedSchema')

const newWantedPerson = async (req, res) => {
    const {name, gender, dob, address, telephone, mother, nationality, passportid, incident, datetime} = req.body

    console.log("Request body: ",req.body)

    
    let missing_fields = []
    if (!name) missing_fields.push("name")
    if (!mother) missing_fields.push("mother")
    if (!dob) missing_fields.push("dob")
    if (!address) missing_fields.push("address")
    if (!telephone) missing_fields.push("telephone")
    if (!gender) missing_fields.push("gender")
    if (!nationality) missing_fields.push("nationality")
    if (!passportid) missing_fields.push("passportid")
    if (!incident) missing_fields.push("incident")

    console.log("Missing fields:", missing_fields)

    if (!name || !address || !gender || !nationality || !incident) return res.status(400).json({error: "Missing fields are required"})

    try {
        const wanted = await Wanted.create({name,gender,dob,address,telephone,mother,nationality,passportid,incident,datetime})
        res.status(200).json(wanted)
        console.log("[ppf] Successfully created wanted person")
    } catch (e) {
        console.log("[ppf] FAILED creating wanted persons")
        console.log(e)
        res.status(400).json({error: e.message })
    }
}

const fetchWantedPersons = async (req, res) => {
    try {
        const wanted = await Wanted.find()
        res.status(200).json(wanted)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = { newWantedPerson, fetchWantedPersons }