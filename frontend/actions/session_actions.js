import * as ApiUtil from '../util/session_api_util';


export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER, 
    currentUser 
})

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS, 
    errors
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

export const login = user => dispatch => (
    ApiUtil.login(user)
    .then(currentUser => dispatch(receiveCurrentUser(currentUser)))
);

export const logout = () => dispatch => (
    ApiUtil.logout()
    .then(() => dispatch(logoutCurrentUser()))
);

export const signup = user => dispatch => (
    ApiUtil.signup(user)
    .then( currentUser => dispatch(receiveCurrentUser(currentUser)))
);