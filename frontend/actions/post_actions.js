import * as ApiUtil from '../util/post_api_util'

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const DELETE_POST = "DELETE_POST";

export const receivePosts = posts => ({
    type: RECEIVE_POSTS, 
    posts
})

export const receivePost = post => ({
    type: RECEIVE_POST, 
    post
});

export const deletePost = postId => ({
    type: DELETE_POST, 
    postId
})

export const fetchPosts= () => dispatch => (
    ApiUtil.fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
)

export const fetchPost = (postId) => dispatch => (
    ApiUtil.fetchPost(postId)
        .then(post => dispatch(receivePost(post)))
)

export const fetchUserPosts = id => dispatch => (
    ApiUtil.fetchUserPosts(id)
        .then(posts => dispatch(receivePosts(posts)))
)

export const createPost = formData => dispatch => (
    ApiUtil.createPost(formData)
        .then(post => dispatch(receivePost(post)))
)

export const removePost = postId => dispatch => (
    ApiUtil.removePost(postId)
    .then(() => dispatch(deletePost(postId)))
)

export const editPost = post => dispatch => (
    ApiUtil.editPost(post)
        .then(post => dispatch(receivePost(post)))
)