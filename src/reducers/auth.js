const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'USER_LOADED':
            return {
                ...state,
                isLoading: false,
                user: action.payload.data.user,
                isAuthenticated:true
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                
                
            };
        case'AUTH_ERROR':
        case'LOGIN_FAIL':
        case'LOGOUT_SUCCESS':
        case'REGISTER_FAIL':
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false

            };
        case 'PROFILE_UPDATED':
          return {
            ...state,
            user: {...state.user , ...action.payload}
          };
        case 'MEMBER_FOLLOWED':
            const {following} = action.payload.data.user
            return{
                // return state
                ...state,
                //return users
                    user:{...state.user, 
                        //return following then add followId
                        following: following
                    }
            }
        case 'MEMBER_UNFOLLOWED':
            const unfollowing = action.payload.data.user.following
            return{
                // return state
                ...state,
                //return users
                    user:{...state.user, 
                        //return following then add followId
                        following: unfollowing
                    }
                      
                }
        default:
            return state;
            

    }
}

export default authReducer;