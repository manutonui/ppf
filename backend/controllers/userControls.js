const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const transporter = require('../middleware/sendMail')

const signup = async (req, res) => {
    const {email} = req.body
    // console.log("Request: ", req.body)
    // console.log("Image string: ", req.body.image.toString())
    // console.log("Request Body: ", req.body)
    // getFilePath(req.body.image)
    // console.log("File path: ", req.file)
    // console.log('Req file: ', req.file)
    try {
        console.log()
        const user = await User.signup(req.body)
        const token = createToken(user._id) // for auto login on signup
        sendVerificationMail(token, email ) // send verification email
        res.status(200).json({email,token})
    } catch (e) { throw Error(e); res.status(400).json({error: e.message}) }
}

const verify = async (req, res) => {
    // console.log("Verifying mail...")
    const {token} = req.params
    // console.log(`Token: ${token}`)

    const jwtObj = jwt.verify(token, process.env.SECRET, (err, res) => {
        if (err) { return null }
        else { return res }
    })

    if (!jwtObj) {return res.status(401).json({ msg: "Invalid token" })}

    const id = jwtObj.id
    // console.log(`Extracted User id: ${id}`)

    try {
        await User.findOneAndUpdate({_id:id}, {verified: true})
    } catch (e) {
        console.log("User not found")
        console.log(e)
    }

    // console.log(token)
    res.status(200).json({msg: "Returned."})
    // return redirect
    // try {} catch (e) {}
}

const login = async (req, res) => {
    const {email, password} = req.body // deconstruct id & pwd from req
    try {
        const user = await User.login(email, password) // login()
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e.message})
    }
}

const fetchUsers = async (req, res) => {
    console.log("Fetch users")
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (e) { console.log(e) }
}

const fetchSingleUser = async (req, res) => {
    const { id } = req.params
    console.log("Fetching one user")
    try {
        const user = await User.find({_id: id})
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
    }
    
}




const sendVerificationMail = async (token, email) => {
    console.log("Sending mail...")
    // console.log(`User id: ${user_id}`)
    const url = `https://kev.litcode.xyz/api/users/confirm/${token}`

    // Define the email content
    const mailOptions = {
        from: '"LitCode" <litcode.xyz@gmail.com>',
        to: email,
        subject: 'Email Confirmation',
        html: `<a href="${url}">Click Here</a> to confirm email.`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
            } else {
                console.log('Email sent:', info.messageId);
                // Preview URL to view the sent email in Ethereal Email
                console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
            }
        });
    } catch (e) {
        console.log(e)
    }
}

// returns jwt token of signs user_id with a secret key
const createToken = (user_id) => jwt.sign({id: user_id }, process.env.SECRET, {expiresIn: '1h'})

module.exports = { signup, verify, login, fetchUsers, fetchSingleUser }