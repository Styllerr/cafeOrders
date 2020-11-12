import api from '../../api';

export const ACTION_SET_WAITERS = 'ACTION/SET/WAITERS';
export function setWaiters(data) {
    return {
        type: ACTION_SET_WAITERS,
        payload: data,
    }
}

export const ACTION_CREATE_WAITER = 'ACTION/CREATE/WAITER';
export const ACTION_UPDATE_WAITER = 'ACTION/UPDATE/WAITER';
export function saveWaiter(changes) {
    return function (dispatch) {
        if (changes._id) {
            api.put('/waiters/' + changes._id, changes)
                .then((resp) => dispatch({
                    type: ACTION_UPDATE_WAITER,
                    payload: resp.data,
                }))
        } else {
            api.post('/waiters', changes)
                .then((resp) => dispatch({
                    type: ACTION_CREATE_WAITER,
                    payload: resp.data,
                }))
        }
    }
}

export const ACTION_DELETE_WAITER = 'ACTION/DELETE/WAITER';
export function deleteWaiter(id) {
    return function (dispatch) {
        api.delete('/waiters/' + id)
            .then(resp => dispatch({
                type: ACTION_DELETE_WAITER,
                payload: resp.data,
            }))
    }
}

export function fetchWaiters() {
    return function (dispatch) {
        api.get('waiters')
            .then((resp) => dispatch(setWaiters(resp.data)));
    }
}