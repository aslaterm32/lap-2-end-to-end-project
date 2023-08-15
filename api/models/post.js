const db = require('../database/connect');

class Review {

    constructor({ review_id, author, title, content}) {
        this.id = review_id;
        this.title = title;
        this.author = author;
        this.content = content;
    }

    static async getAll() {
        const response = await db.query('SELECT * FROM reviews');
        return response.rows.map(p => new post(p));
    }

    static async getReviewById(id) {
        const response = await db.query("SELECT * FROM reviews WHERE review_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new post(response.rows[0]);
    }

    static async create(data) {
        const { author, title, content } = data;
        let response = await db.query("INSERT INTO reviews (author, title, content) VALUES ($1, $2, $3) RETURNING review_id;",
         [author, title, content]);
        const newId = response.rows[0].post_id;
        const newPost = await post.getReviewById(newId);
        return newPost;
    }

    async destroy() {
        let response = await db.query("DELETE FROM reviews WHERE review_id = $1 RETURNING *;" [this.id]);
        return new post(response.rows[0]);
    }
}

module.exports = Review;