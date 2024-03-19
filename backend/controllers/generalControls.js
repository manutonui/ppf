const Clearance = require('../models/clearanceSchema')
const Incident = require('../models/incidentSchema')
const Criminal = require('../models/criminalSchema')

const fetchStats = async (req, res) => {
    try {
        const totalClearances = await Clearance.count()
        const totalIncidents = await Incident.count()
        const totalCriminals = await Criminal.count()
        res.status(200).json({totalClearances, totalIncidents, totalCriminals})
    } catch (e) {
        res.status(400).json({error: e.message})
    }
}

module.exports = { fetchStats }