import csrfFetch from "./csrf";
import * as sessionActions from "./session";

const SET_USERS = 'users/setUsers';
const SET_USER = 'users/setUser';


export const setUsers = (users) => ({
    type: SET_USERS,
    payload: users
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users')
    if (res.ok) {
        const data = await res.json();
        dispatch(setUsers(data.users));
    }
};

export const updateUser = (user) => async dispatch => {
    const {           
        firstName,
        lastName,
        about,
        phoneNumber, 
        birthDate
    } = user;
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            firstName,
            lastName,
            about,
            phoneNumber,
            birthDate
        })
    });
    const data = await res.json();
    dispatch(sessionActions.getCurrentUser(data));
    return res;
};

// export const fetchUser = (userId) => async dispatch => {
//     const res = await csrfFetch(`/api/users/${userId}`)
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(setUser(data.user));
//     }
//     return data.user
// }

 
function usersReducer(state = {}, action) {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        case SET_USER:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case SET_USERS:
            return {...nextState,...action.payload};
        default:
            return state;
    }
}

export default usersReducer;