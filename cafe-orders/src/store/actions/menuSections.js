import api from '../../api';

export const ACTION_SET_MENUSECTIONS = 'ACTION/SET/MENUSECTIONS';
export function setMenuSections(data) {
    return {
        type: ACTION_SET_MENUSECTIONS,
        payload: data,
    }
}

export const ACTION_CREATE_MENUSECTION = 'ACTION/CREATE/MENUSECTION';
export const ACTION_UPDATE_MENUSECTION = 'ACTION/UPDATE/MENUSECTION';
export function saveMenuSection(changes) {
    return function (dispatch) {
        if (changes._id) {
            api.put('/menuSections/' + changes._id, changes)
                .then((resp) => dispatch({
                    type: ACTION_UPDATE_MENUSECTION,
                    payload: resp.data,
                }))
        } else {
            api.post('/menuSections', changes)
                .then((resp) => dispatch({
                    type: ACTION_CREATE_MENUSECTION,
                    payload: resp.data,
                }))
        }
    }
}

export const ACTION_DELETE_MENUSECTION = 'ACTION/DELETE/MENUSECTION';
export function deleteMenuSection(id) {
    return function (dispatch) {
        api.delete('/menuSections/' + id)
            .then(resp => dispatch({
                type: ACTION_DELETE_MENUSECTION,
                payload: resp.data,
            }))
    }
}

export function fetchMenuSections() {
    return function (dispatch) {
        api.get('/menuSections').then((resp) => dispatch(setMenuSections(resp.data)));
    }
}