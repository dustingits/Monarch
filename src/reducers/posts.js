const initialState = {
    posts: null,
    isLoading:false,
      
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      
        case 'POST_LOADED':
            return {
                ...state,
                posts: [...action.payload]
            };
        case 'POST_CREATE_LOADING':
            return{
                ...state,
                isLoading: true
            }
        case 'POST_CREATED':
            return{
                ...state,
                posts:[...state.posts, action.payload.post],
                isLoading:false
                
            };
        case 'POST_DELETED':
            return{
                ...state,
                posts: [...state.posts.filter(e => e._id !== action.payload)]
            }
        case 'POST_EDITED':
            const postId = action.payload.post._id
            const post = action.payload.post
            return{
                ...state,
                posts: state.posts.map(item => {
                    if (item._id !== postId){
                        return item
                    }
                    return{
                        
                        ...post
                    }
                })
            }
        case 'COMMENT_CREATED':
            const commentPostId= action.payload._id
            const commentPost = action.payload
            return{
                ...state,
                posts: state.posts.map(item => {
                    if (item._id !== commentPostId){
                        return item
                    }
                    return{
                        
                        ...commentPost
                    }
                })
            }
            case 'COMMENT_DELETED':
            const delCommentPostId= action.payload._id
            const delCommentPost = action.payload
            return{
                ...state,
                posts: state.posts.map(item => {
                    if (item._id !== delCommentPostId){
                        return item
                    }
                    return{
                        
                        ...delCommentPost
                    }
                })
            }
        case 'POST_LIKED':
            const likePostId= action.payload._id
            const likePost = action.payload
            return{
                ...state,
                posts: state.posts.map(item => {
                    if (item._id !== likePostId){
                        return item
                    }
                    return{
                        
                        ...likePost
                    }
                })
            }
        case 'POST_UNLIKED':
            const unlikePostId= action.payload._id
            const unlikePost = action.payload
            return{
                ...state,
                posts: state.posts.map(item => {
                    if (item._id !== unlikePostId){
                        return item
                    }
                    return{
                        
                        ...unlikePost
                    }
                })
            }
        default:
            return state;
            

    }
}

export default postsReducer;