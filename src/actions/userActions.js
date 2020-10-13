import { tokenConfig } from './authActions';
import axios from 'axios';
import { returnErrors } from './errorActions';


/*  @@ UPDATE PROFILE 
    @@ PRIVATE must have authorization header to pass
    updateProfile takes the following object as a parameter.
   {  _id: ref to user you are updating
      picture: string (url),
      firstname: string,
      lastname: string ,
      username: string,
      facebook: string ( url ),
      instagram: string (url),
      aboutme: string,
      categories: [string]
    },
*/
export const updateProfile = (profile) => (dispatch, getState) => {

    axios
        .put('http://localhost:3001/users/updateprofile', profile, tokenConfig(getState))
        .then(res =>
            // response includes a new user object with a userId matching the one provided
            dispatch({
                type: 'PROFILE_UPDATED',
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: 'PROFILE_UPDATE_ERROR'
            });
        });
};


/*  @@ FOLLOW MEMBER 
    @@ PRIVATE must have authorization header to pass
    followMember takes the following object as a parameter.
   {    followIds: {
            _id: ref user who clickd the follow button,
            followId: ref user who is being followed
        }
    }   
*/
export const followMember = (followIds) => (dispatch, getState) => {
    console.log(followIds);
    axios.put('http://localhost:3001/users/follow', followIds, tokenConfig(getState))
        
        .then( res =>
            // response contains an entire new object for the user and the member they followed. {user{}, follwed:{}}
            dispatch({
                type: 'MEMBER_FOLLOWED',
                payload: res
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'FOLLOW_ERROR'
                });
            }else{
                console.log(err);
            }
        })   
};

/*  @@ UNFOLLOW MEMBER 
    @@ PRIVATE must have authorization header to pass
    unfollowMember takes the following object as a parameter.
   {    unfollowIds: {
            _id: ref user who clickd the unfollow button,
            unfollowId: ref user who is being unfollowed
        }
    }   
*/
export const unfollowMember = (unfollowIds) => (dispatch, getState) => {
    console.log(unfollowIds)
    axios.put('http://localhost:3001/users/unfollow', unfollowIds, tokenConfig(getState))
        
        .then( res =>
            // response contains an entire new object for the user and the member they unfollowed. {user{}, unfollwed:{}}
            dispatch({
                type: 'MEMBER_UNFOLLOWED',
                payload: res
            })
        ).then(res => console.log(res))
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'UNFOLLOW_ERROR'
                });
            }else{
                console.log(err);
            }
        })   
};


/*  @@ LOAD COMMUNITY 
    @@ PRIVATE must have authorization header to pass
    loadCommunity fetchs all other user object other than the user who is logged in.
     
*/
export const loadCommunity = () =>  (dispatch, getState) => {
    
    
    dispatch({ type: 'COMMUNITY_LOADING' });
        
    axios.get('http://localhost:3001/users/user', tokenConfig(getState))
        .then( res => 
            // response is an object with property  {members:} which contains an array of user obejects. {members:[{user},{user}]}
            dispatch({
                type: 'COMMUNITY_LOADED',
                payload: res
            })
        )
        .catch(err =>{
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'AUTH_ERROR'
                });
            }else{
                console.log(err);
            }
        
        })
}

/*  @@ GET MEMBER PROFILE
    @@ PRIVATE must have authorization header to pass
    getMemberProfile takes the following object as a parameter.
    {user._id} of the user you wish to retrieve is passed into the request url as params.
*/

export const getMemberProfile = (id) =>  (dispatch, getState) => {
    
    
    dispatch({ type: 'MEMBER_LOADING' });
        
    axios.get('http://localhost:3001/users/user/' + id, tokenConfig(getState))
        .then( res => 
            // response is a user object matching the ID provided
            dispatch({
                type: 'MEMBER_PROFILE_LOADED',
                payload: res
            })
        )
        .catch(err =>{
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'AUTH_ERROR'
                });
            }else{
                console.log(err);
            }
        
        })
}


/*  @@ GET USER PROFILE 
    @@ action creator only
    getUserProfile is just an action creator that switches the profile state from a member
    to the current user who is logged in.
   
*/
export const getUserProfile = () =>  (dispatch, getState) => {
        try{
            dispatch({
                type: 'USER_PROFILE_LOADED',
                
            })
        }catch(err){
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: 'AUTH_ERROR'
                });
            }else{
                console.log(err);
            }
        
        }
}