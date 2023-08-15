const Post = require('../models/post')

async function index(req, res) {
    try {
        const posts = await Post.getAll()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const result = await Post.create(data)
        res.status(201).send(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function show(req, res) {
    try {
        const id = parseInt(req.params.id)
        const result = await Post.getReviewById(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id)
        const post = await Post.getReviewById(id)
        const result = post.destroy()
        res.status(204).end()
    } catch (error) {}
}

module.exports = {
    index,
    create,
    show,
    destroy,
}
