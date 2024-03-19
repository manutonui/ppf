const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const {Schema,model} = mongoose

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, // default: 1234
    verified: {type: Boolean, required: true, default: false},
    accessLevel: {type: String, required: true, default: 'basic'}, // basic, admin
    active: {type: Boolean, required: true, default: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String, required: true},
    region: {type: String, required: true},
    city: {type: String, required: true},
    station: {type: String, required: true},
    phone: {type: String, required: true},
    image: {type: String}
})

const accessLevels = ['basic', 'admin']

// static methods: signup, login
userSchema.statics.signup = async function(req_body){
    console.log("Req body: ", req_body)
    const {email, firstName, lastName, address, region, city, station, phone} = req_body
    if (!email || !firstName || !lastName || !address || !region || !city || !station || !phone ) throw Error("Missing fields required.")

    if ( !validator.isEmail(email) ) { throw Error('Email invalid.') }
    if ( !validator.isAlpha(firstName) || !validator.isAlpha(lastName) ) { throw Error('Name has invalid characters.') }
    if ( !validator.isNumeric(phone) ) { throw Error('Tel. no has invalid characters.') }
    // if ( !validator.isIn(accessLevel, accessLevels ) ) { throw Error('Invalid access level.') }
    // Validation
    const exists = await this.findOne({email})
    if (exists) { throw Error('Email exists.') }

    const imageData = req_body.image.toString();

    const salt = await bcrypt.genSalt(10) // gen salt of pwd hash
    const hash = await bcrypt.hash('1234', salt) // Hash pwd

    const user = await this.create({email, password: hash, firstName, lastName, accessLevel: 'basic', address, region, city, station, phone, image: imageData }) // create
    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) throw Error("All fields are required.")
    const user = await this.findOne({email})
    if (!user) { throw Error('User not found.') }
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) { throw Error('Incorrect password.')}
    return user
}

module.exports = model('User', userSchema)