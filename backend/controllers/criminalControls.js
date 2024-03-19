const Criminal = require('../models/criminalSchema')

const newCriminal = async (req, res) => {
    const {name, gender, dob, address, telephone, mother, nationality, passportid, incident, datetime, photo} = req.body

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
    if (!photo) missing_fields.push("photo")

    console.log("Missing fields:", missing_fields)

    if (!name || !address || !gender || !nationality || !incident || !photo) return res.status(400).json({error: "Missing fields are required"})

    try {
        const criminal = await Criminal.create({name,gender,dob,address,telephone,mother,nationality,passportid,incident,datetime,photo})
        res.status(200).json(criminal)
        console.log("[ppf] Successfully created criminal")
    } catch (e) {
        console.log("[ppf] FAILED creating criminals")
        console.log(e)
        res.status(400).json({error: e.message })
    }
}

const fetchCriminals = async (req, res) => {
    try {
        const criminals = await Criminal.find()
        res.status(200).json(criminals)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateCriminal = async (req, res) => {}

module.exports = { newCriminal, fetchCriminals, updateCriminal }