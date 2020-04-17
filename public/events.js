window.addEventListener('DOMContentLoaded', () => {

    fetchImage();

    const newPicButton = document.getElementById('new-pic');
    const upvoteButton = document.getElementById('upvote');
    const downvoteButton = document.getElementById('downvote');
    const submitForm = document.querySelector('.comment-form');
    const commentBox = document.querySelector('.comments');

    newPicButton.addEventListener('click', event => {
        fetchImage();
        document.querySelector('.score').innerHTML = 0;
        commentBox.innerHTML = '';

    })

    upvoteButton.addEventListener('click', event => {
        upvote();
    })

    downvoteButton.addEventListener('click', event => {
        downvote();
    })

    submitForm.addEventListener('submit', event => {
        event.preventDefault();
        let formData = new FormData(submitForm);
        let comments = formData.get("user-comment")
        comment(comments);
        document.querySelector('.comment-form').reset();
    })

    // document.getElementById('myform').reset();
})

function fetchImage() {
    const catImage = document.querySelector('img');
    document.querySelector('.loader').innerHTML = 'Loading...';
    fetch("http://localhost:3000/kitten/image")
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            document.querySelector('.loader').innerHTML = '';

            return res.json();
        })
        .then(json => {
            catImage.src = json.src;
        })
        .catch(error => error.json())
        .then(json => {
            alert(json.message);
        });
}

function upvote() {
    fetch("http://localhost:3000/kitten/upvote", { method: 'PATCH' })
        .then(res => res.json())
        .then(json => displayScore(json));
}

function downvote() {
    fetch("http://localhost:3000/kitten/downvote", { method: 'PATCH' })
        .then(res => res.json())
        .then(json => displayScore(json));
}

function displayScore(json) {
    let { score } = json;
    document.querySelector('.score').innerHTML = score;
}

function comment(comment) {
    fetch("http://localhost:3000/kitten/comments", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
    })
        .then(res => res.json())
        .then(json => {
            commentBox = document.querySelector('.comments');
            const div = document.createElement('div');
            const lastEl = json.comments[json.comments.length - 1];
            div.innerHTML = lastEl;
            commentBox.appendChild(div);
        })


}
