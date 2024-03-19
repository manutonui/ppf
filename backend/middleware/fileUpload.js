const multer = require('multer');
const path = require('path')

// Storage configuration for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage/images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({storage})

module.exports = upload;