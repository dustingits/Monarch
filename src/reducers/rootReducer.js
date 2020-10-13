import postsReducer from './posts';
import {combineReducers} from 'redux';
import usersReducer from './users';
import authReducer from './auth';
import errorsReducer from './errors';


const rootReducer = combineReducers({
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
    errors: errorsReducer
})

export default rootReducer;