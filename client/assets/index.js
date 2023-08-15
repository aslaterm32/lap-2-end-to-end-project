function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";

    const name = document.createElement("h2");
    name.textContent = data("name");
    post.appendChild(name);

    const author = document.createElement("h2");
    author.textContent = data("author");
    post.appendChild(author);

    const content = document.createElement("p");
    content.textContent = data("content");
    post.appendChild(content);
}

document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.get("title"),
            author: form.get("author"),
            content: form.get("content")
        })
    }

    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status == 201) {
        window.location.reload();
    }

})

async function loadPosts() {

    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        }
    }

    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status == 200) {
        const posts = await response.json();

        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    }
    else{
        window.location.assign("./register.html");
    }
}

loadPosts();