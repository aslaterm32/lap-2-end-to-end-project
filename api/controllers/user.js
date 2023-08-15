const bcrypt = require('bcrypt')

const User = require('../models/user')
const Token = require('../models/token')

async function register(req, res) {
    try {
        const data = req.body

        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
        data['password'] = await bcrypt.hash(data['password'], salt)

        const result = await User.create(data)

        res.status(201).send(result)
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}

async function login(req, res) {
    const data = req.body
    try {
        const user = await User.getUserByUsername(data.username)
        const authenticated = await bcrypt.compare(data.password, user.password)
        if (!authenticated) {
            throw new Error('Incorrect credentials')
        } else {
            const token = await Token.create(user['id'])
            res.status(200).json({ authenticated: true, token: token.token })
        }
    } catch (err) {
        res.status(401).json({ err: err.message })
    }
}

module.exports = { register, login }
