const PSV = require('../models/psvSchema')

const newPsv = async (req, res) => {
    console.log("Posting psv...")
    const {name, gender, dob, address, mother, from, to, nationality, passportid, guarantor, guarantoraddress, guarantortel, photo, telephone} = req.body
    // console.log("Request body: ", req.body)
    
    let missing_fields = []
    if (!address) missing_fields.push("address")
    if (!name) missing_fields.push("name")
    if (!dob) missing_fields.push("dob")
    if (!gender) missing_fields.push("gender")
    if (!mother) missing_fields.push("mother")
    if (!from) missing_fields.push("from")
    if (!to) missing_fields.push("to")
    if (!nationality) missing_fields.push("nationality")
    if (!passportid) missing_fields.push("passportid")
    if (!guarantor) missing_fields.push("guarantor")
    if (!guarantoraddress) missing_fields.push("guarantoraddress")
    if (!guarantortel) missing_fields.push("guarantortel")
    if (!photo) missing_fields.push("photo")
    if (!telephone) missing_fields.push("telephone")

    console.log("Missing :", missing_fields)

    if (!address || !name || !dob || !gender || !mother || !from || !to || !nationality || !passportid || !guarantor || !guarantoraddress || !guarantortel || !photo || !telephone) return res.status(400).json({error: "All fields are required"})

    try {
        const psv = await PSV.create({address, name, dob, gender, mother, from, to, nationality, passportid, guarantor, guarantoraddress, guarantortel, photo, telephone})
        res.status(200).json(psv)
        console.log("[ppf] Successfully created psv")
    } catch (e) {
        console.log("[ppf] FAILED creating psv")
        console.log(e)
        res.status(400).json({error: e.message })
    }
}

const fetchPsvs = async ( req, res ) => {
    try {
        const psv = await PSV.find()
        res.status(200).json(psv)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = { newPsv, fetchPsvs }