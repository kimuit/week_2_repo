// write your code here

// declaring a variables
let likes = document.querySelector('#like-count');
let commentSec = document.querySelector('#comment-list');

document.addEventListener('DOMContentLoaded',()=>{

fetch('http://localhost:3000/image/1')
.then((res)=>res.json())
.then((res)=>{
// console.log(res);
let imge = res
let imageElement = document.querySelector('#card-image')
imageElement.selectAttribute('src', `${imge.image}`)
let imageTitle = document.querySelector('#card-title')
imageTitle.innerHTML = imge.title
likes.innerHTML = `${imge.likes} likes`
let likeBtn = document.querySelector('#like-button')
likeBtn.setAttribute('name', `${imge.id}`)
likeBtn.addEventListener('click', handleLike)
})})


const localHost = 'http://localhost:3000/images/1/comments'
fetch(localHost);
then((res)=>res.json())
.then((comments)=>{
    let conneComment = []
    comments.forEach((comment, indx)=> {
        let list = document.createElement('li')
        list.textContent = comment.content
        conneComment.push(list)
    })
    commentList.replaceChildren(...conneComment)
})

let inputForm = document.querySelector('#comment-form')
inputForm.addEventListener('submit', addComment)


function addcomment(event) {
    event.preventDefault()
    let input = document.querySelector('#comment')
    console.log(input.value);
    postComment(input.value).then((res)=>{
        console.log('postComment');
        return res.json()
    }).then((res)=>{
        console.log(res);
        let list = document.createElement('li')
        list.textContent =res.content
        commentlist.appendChild(list)
        input.valu = ''
    })
}

async function postComment(data){
    let comment = {       
        "imageId": 1, 
        "content": data
    }

    let configObj  = {        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(comment),                
    }
    return await fetch(localHost, configObj)

}
let hostImage = 'http://localhost:3000/images/'
let getImageById = async (id)=>{
    return await fetch(hostImage, id)
    .then((res)=>res.json())
    .then(async (res)=>{
        return res
    })
}

let updateLike = async (post, id)=>{

    let configObj  = {        
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(post),                
    }

    let obj =  await fetch(hostImage, id, configObj)
        .then((res)=> res.json())
        .then((res)=>{
            return res
        }
    )
    return obj
}
