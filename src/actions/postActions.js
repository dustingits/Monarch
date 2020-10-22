import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';


/*  @@ CREATE POST
    @@ PRIVATE must have authorization header to pass
    createPost takes the following object as a parameter.
    { title: string,
    content: string,
    picture: string (url),
    date : Date,
    postedBy: ref to user._id}
*/
export const createPost = (post) => (dispatch, getState) => {
    dispatch({ type: 'POST_CREATE_LOADING' })

    axios
        .post('http://18.191.229.171:3001/posts/createpost', post, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: 'POST_CREATED',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'LOGIN_ERROR'
                });
            } else {
                alert(err);
            }
        });
};


/*  @@ CREATE COMMENT
    @@ PRIVATE must have authorization header to pass
    to create a new comment on a post this function takes in an object as a parameter.
    { postId:  ref.post._id
      text: string 
      postedBy: ref.user._id
    }
*/
export const createComment = (comment) => (dispatch, getState) => {
    dispatch({ type: 'CREATE_COMMENT_LOADING' })
    axios
        .put('http://18.191.229.171:3001/posts/comment', comment, tokenConfig(getState))
        .then(res =>
            // response includes entire post based on postId provided
            dispatch({
                type: 'COMMENT_CREATED',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'COMMENT_CREATE_ERROR'
                });
            } else {
                alert(err);
            }
        });
};


/*  @@ DELETE COMMENT
    @@ PRIVATE must have authorization header to pass
    deleteComment takes the following object as a parameter.
    { postId: ref post._id
    commentId: ref to comment._id}
*/
export const deleteComment = (comment) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_COMMENT_LOADING' })
    axios
        .put('http://18.191.229.171:3001/posts/deleteComment', comment, tokenConfig(getState))
        .then(res =>
            // resonse will be entire post based on the postId provided.
            dispatch({
                type: 'COMMENT_DELETED',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'COMMENT_CREATE_ERROR'
                });
            } else {
                alert(err);
            }
        });
};


/*  @@ DELETE POST
    @@ PRIVATE must have authorization header to pass
    deletePost takes in a postId that is passed into the request url as a parameter.
   
*/
export const deletePost = (id) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_POST_LOADING' })
    axios
        .delete('http://18.191.229.171:3001/posts/' + id, tokenConfig(getState))
        .then(res =>
            // response returns nothing so we pass the original postId parameter to the reducer
            dispatch({
                type: 'POST_DELETED',
                payload: id
            })
        )

        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'POST_DELETE_ERROR'
                });
            } else {
                console.log(err);
            }
        });
};


/*  @@ EDIT POST
    @@ PRIVATE must have authorization header to pass
    editPost takes the following object as a parameter.
    {PostId: ref post._id,
    title: string,
    content: string,
    picture: string (url),
    date : Date,
    postedBy: ref to user._id}
*/

export const editPost = (post) => (dispatch, getState) => {
    dispatch({ type: 'EDIT_POST_LOADING' })
    axios
        .put('http://18.191.229.171:3001/posts/editpost', post, tokenConfig(getState))
        .then(res =>
            // response includes a replacement post of the same postId provided
            dispatch({
                type: 'POST_EDITED',
                payload: res.data
            })
        )

        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'POST_DELETE_ERROR'
                });
            } else {
                console.log(err);
            }
        });
};


/*  @@ LIKE POST
    @@ PRIVATE must have authorization header to pass
    likePost takes the following object as a parameter.
   {PostId: ref post._id,
    likedBy: ref to user._id}
*/
export const likePost = (postId) => (dispatch, getState) => {
    dispatch({ type: 'LIKE_POST_LOADING' })
    axios
        .put('http://18.191.229.171:3001/posts/like', postId, tokenConfig(getState))
        .then(res =>
            // response includes an entire replacement post object of the postId provided
            dispatch({
                type: 'POST_LIKED',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'POST_LIKE_ERROR'
                });
            } else {
                alert(err);
            }
        });
};


/*  @@ UNLIKE POST
    @@ PRIVATE must have authorization header to pass
    unlikePost takes the following object as a parameter.
   {PostId: ref post._id,
    likedBy: ref to user._id}
*/
export const unlikePost = (postId) => (dispatch, getState) => {
    dispatch({ type: 'UNLIKE_POST_LOADING' })
    axios
        .put('http://18.191.229.171:3001/posts/unlike', postId, tokenConfig(getState))
        .then(res =>
            // response includes an entire post object matching the postId provided
            dispatch({
                type: 'POST_UNLIKED',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'POST_LIKE_ERROR'
                });
            } else {
                alert(err);
            }
        });
};


/*  @@ LOAD POST
    @@ PRIVATE must have authorization header to pass
    loadost fetches all posts by all users
*/
export const loadPosts = () => (dispatch, getState) => {
    dispatch({ type: 'POST_LOADING' });
    axios
        .get('http://18.191.229.171:3001/posts/posts', tokenConfig(getState))
        .then(res =>
            // response is an array of post objects sorted by date desc.
            dispatch({
                type: 'POST_LOADED',
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'POST_LOAD_ERROR'
                });
            } else {
                alert(err);
            }
        });

};