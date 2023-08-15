const Review = require('../models/post')
const Token = require('../models/token')

async function index(req, res) {
    try {
        const posts = await Review.getAll()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const token = await Token.getTokenByToken(req.headers['authorization'])
        const result = await Review.create(data, token['user_id'])
        res.status(201).send(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id)
        const result = await Review.getReviewById(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id)
        const review = await Review.getReviewById(id)
        const result = review.destroy()
        res.status(204).end()
    } catch (error) {}
}

module.exports = {
    index,
    create,
    show,
    destroy,
}
