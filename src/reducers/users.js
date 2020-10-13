const initialState = {
    user: {},
    profile:{},
    members:[],
    active: 'user',
    categories:['Chef','Musician','Rapper','Singer','Music Producer','Sound Engineer',
              'Visual Artist','Painter','Illustrator','Fashion Designer','Barber','Hair Dresser',
              'Tattoo Artist', 'Digital Artist', 'Video Editor','Photographer']

}
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_ERROR':
          return state;

        case 'COMMUNITY_LOADED':
          return{
            ...state,
            members: [...action.payload.data.members]
          }
          case 'MEMBER_FOLLOWED':
          const followed = action.payload.data.followed;
            return{
              ...state,
           members: state.members.map(e => (e._id !== followed._id)?  e : {...followed}  )
              
            }
          case 'MEMBER_UNFOLLOWED':
            return{
                ...state,
         
            }
          case 'MEMBER_PROFILE_LOADED':
            console.log (action.payload);
            return{
              ...state,
              profile: {...action.payload.data.memberProfile},
              active:'member'
            }
            case 'USER_PROFILE_LOADED':
            console.log (action.payload);
            return{
              ...state,
              active:'user'

            }
        default:  
          return state;
      }
}

export default usersReducer;