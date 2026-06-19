let posts =
JSON.parse(localStorage.getItem("posts")) || [];

function savePosts(){
    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );
}

function addPost(){

    let author =
    document.getElementById("author").value;

    let title =
    document.getElementById("title").value;

    let content =
    document.getElementById("content").value;

    if(
        author === "" ||
        title === "" ||
        content === ""
    ){
        alert("Please fill all fields");
        return;
    }

    posts.unshift({
        author,
        title,
        content,
        date:new Date().toLocaleDateString(),
        likes:0,
        comments:[]
    });

    savePosts();
    displayPosts();

    document.getElementById("author").value="";
    document.getElementById("title").value="";
    document.getElementById("content").value="";
}

function displayPosts(){

    const container =
    document.getElementById("posts");

    container.innerHTML="";

    posts.forEach((post,index)=>{

        let commentsHTML="";

        post.comments.forEach(comment=>{
            commentsHTML +=
            `<li>${comment}</li>`;
        });

        container.innerHTML += `
        <div class="post">

            <h2>${post.title}</h2>

            <small>
            By ${post.author}
            |
            ${post.date}
            </small>

            <p>${post.content}</p>

            <div class="stats">
                ❤️ ${post.likes} Likes |
                💬 ${post.comments.length} Comments
            </div>

            <div class="actions">

                <button
                class="like-btn"
                onclick="likePost(${index})">
                Like
                </button>

                <button
                class="edit-btn"
                onclick="editPost(${index})">
                Edit
                </button>

                <button
                class="delete-btn"
                onclick="deletePost(${index})">
                Delete
                </button>

            </div>

            <div class="comment-section">

                <input
                type="text"
                id="comment${index}"
                placeholder="Add a comment">

                <button
                onclick="addComment(${index})">
                Comment
                </button>

                <ul>
                    ${commentsHTML}
                </ul>

            </div>

        </div>
        `;
    });
}

function likePost(index){

    posts[index].likes++;

    savePosts();
    displayPosts();
}

function editPost(index){

    let newTitle =
    prompt(
    "Edit Title",
    posts[index].title
    );

    let newContent =
    prompt(
    "Edit Content",
    posts[index].content
    );

    if(newTitle && newContent){

        posts[index].title =
        newTitle;

        posts[index].content =
        newContent;

        savePosts();
        displayPosts();
    }
}

function deletePost(index){

    if(confirm("Delete this post?")){

        posts.splice(index,1);

        savePosts();
        displayPosts();
    }
}

function addComment(index){

    let comment =
    document.getElementById(
    `comment${index}`
    ).value;

    if(comment==="") return;

    posts[index]
    .comments
    .push(comment);

    savePosts();
    displayPosts();
}

function searchPosts(){

    let input =
    document.getElementById(
    "searchInput"
    ).value.toLowerCase();

    let cards =
    document.querySelectorAll(".post");

    cards.forEach(card=>{

        let title =
        card.querySelector("h2")
        .textContent.toLowerCase();

        if(title.includes(input)){
            card.style.display="block";
        }
        else{
            card.style.display="none";
        }
    });
}

displayPosts();