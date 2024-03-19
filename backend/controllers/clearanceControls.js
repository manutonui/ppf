const Clearance = require('../models/clearanceSchema')

const newClearance = async (req, res) => {
    const {name, destination, date, citizenphoto, guarantorphoto, address, telephone, gender, mother, birthplace, occupation, nationality, minors, passport, remarks, guarantor, guarantoraddress, guarantortel} = req.body
    try {
        validateClearancePostRequest(req)
        const clearance = await Clearance.create({fullname: name, destination, birthdate: date, citizenphoto, guarantorphoto, address, telephone, gender, mother, birthplace, occupation, nationality, minors, passport, remarks, guarantor, guarantoraddress, guarantortel})
        res.status(200).json(clearance)
        console.log("[ppf] Successfully created clearance")
    } catch (e) {
        console.log("[ppf] FAILED creating clearance")
        console.log(e)
        res.status(400).json({error: e.message })
    }
}

const fetchClearances = async (req, res) => {
    try {
        const clearances = await Clearance.find()
        res.status(200).json(clearances)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

const updateClearance = async (req, res) => {}

const deleteClearance = async (req, res) => {}

const validateClearancePostRequest = (request) => {
    const {name, date, address, telephone, gender, mother, birthplace, occupation, nationality, passport} = request.body
    
    let missing_fields = []
    if (!name) missing_fields.push("name")
    if (!mother) missing_fields.push("mother")
    if (!date) missing_fields.push("birthdate")
    if (!birthplace) missing_fields.push("birthplace")
    if (!address) missing_fields.push("address")
    if (!telephone) missing_fields.push("telephone")
    if (!gender) missing_fields.push("gender")
    if (!nationality) missing_fields.push("nationality")
    if (!occupation) missing_fields.push("occupation")
    if (!passport) missing_fields.push("passport_id")
    // console.log("Missing fields:", missing_fields)

    if (!name || !date || !address || !telephone || !gender || !mother || !birthplace || !nationality || !occupation || !passport) {
        console.log(missing_fields.toString())
        throw Error(`Missing fields are required: ${missing_fields.join(', ')}` )
    }
}

module.exports = { newClearance, fetchClearances, updateClearance, deleteClearance }