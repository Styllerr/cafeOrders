import api from '../../api';

export const ACTION_SET_DISHES = 'ACTION/SET/DISHES';
export function setDishes(data) {
    return {
        type: ACTION_SET_DISHES,
        payload: data,
    }
}

export const ACTION_CREATE_DISH = 'ACTION/CREATE/DISH';
export const ACTION_UPDATE_DISH = 'ACTION/UPDATE/DISH';
export function saveDish(changes) {
    return function (dispatch) {
        if (changes._id) {
            api.put('/dishes/' + changes._id, changes).then((resp) =>
                dispatch({
                    type: ACTION_UPDATE_DISH,
                    payload: resp.data,
                }))
        } else {
            api.post('/dishes', changes).then((resp) =>
                dispatch({
                    type: ACTION_CREATE_DISH,
                    payload: resp.data,
                })
            )
        }
    }
}

export const ACTION_DELETE_DISHES = 'ACTION/DELETE/DISHES';
export function deleteDishes(id) {
    return function (dispatch) {
        api.delete('/dishes/' + id)
            .then(resp => dispatch({
                type: ACTION_DELETE_DISHES,
                payload: resp.data,
            }))
    }
}

export const ACTION_SET_SELECT_DISH = 'ACTION/SET/SELECT/DISH';
export function setSelectDish() {
    return {
        type: ACTION_SET_SELECT_DISH,
    }
}
export const ACTION_SET_UNSELECT_DISH = 'ACTION/SET/UNSELECT/DISH';
export function setUnselectDish() {
    return {
        type: ACTION_SET_UNSELECT_DISH,
    }
}

export function fetchDishes() {
    return function (dispatch) {
        api.get('/dishes')
            .then((resp) => dispatch(setDishes(resp.data)));
    }
}