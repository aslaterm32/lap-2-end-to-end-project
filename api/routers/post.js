const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post')

postRouter.get('/', postController.index)
postRouter.post('/', postController.create)
postRouter.get('/:id', postController.show)
postRouter.delete('/:id', postController.destroy)

module.exports = postRouter
