const fs = require('fs');
const path = require('path');

// Load careers data
const careersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/careers.json'), 'utf8'));

// Get all careers
function getCareers(req, res) {
    try {
        console.log('Fetching careers data...');
        res.json({ success: true, careers: careersData.careers });
    } catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch careers.' });
    }
}

// Get career by ID
function getCareerById(req, res) {
    const id = req.params.id;
    const career = careersData.careers.find(c => c.id == id);
    if (career) {
        res.json({ success: true, career });
    } else {
        res.status(404).json({ success: false, message: 'Career not found.' });
    }
}

module.exports = {
    getCareers,
    getCareerById
};