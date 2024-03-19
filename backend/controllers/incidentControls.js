const Incident = require('../models/incidentSchema')

const newIncident = async (req, res) => {
    const {date, time, location, type, reportedby, telephone} = req.body
    console.log("Request body: ", req.body)

    let missing_fields = []
    if (!location) missing_fields.push("location")
    if (!type) missing_fields.push("type")
    if (!date) missing_fields.push("date")
    if (!reportedby) missing_fields.push("reportedby")
    if (!telephone) missing_fields.push("telephone")
    if (!time) missing_fields.push("time")

    console.log("Missing :", missing_fields)

    if (!location || !type || !date || !reportedby || !telephone || !time) return res.status(400).json({error: "All fields are required"})

    try {
        const incident = await Incident.create({date, time, location, type, reportedby, telephone})
        res.status(200).json(incident)
        console.log("[ppf] Successfully created incident")
    } catch (e) {
        console.log("[ppf] FAILED creating incident")
        console.log(e)
        res.status(400).json({error: e.message })
    }
}

const fetchIncidents = async ( req, res ) => {
    try {
        const incidents = await Incident.find()
        res.status(200).json(incidents)
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = { newIncident, fetchIncidents }