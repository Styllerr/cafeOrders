import api from '../../api';

export const ACTION_SET_ORDERS = 'ACTION/SET/ORDERS';
export function setOrders(data) {
    return {
        type: ACTION_SET_ORDERS,
        payload: data,
    }
}
export const ACTION_SET_BLANK_ORDERS = 'ACTION/SET/BLANK/ORDERS';
export function setBlankOrder() {
    return {
        type: ACTION_SET_BLANK_ORDERS,
    }
}

export const ACTION_CREATE_ORDER = 'ACTION/CREATE/ORDER';
export const ACTION_UPDATE_ORDER = 'ACTION/UPDATE/ORDER';
export function saveOrders(changes) {
    return function (dispatch) {
        if (changes._id) {
            api.put('/orders/' + changes._id, changes)
                .then((resp) => {
                    dispatch({
                        type: ACTION_UPDATE_ORDER,
                        payload: resp.data,
                    })
                })
        } else {
            api.post('/orders', changes)
                .then((resp) => {
                    dispatch({
                        type: ACTION_CREATE_ORDER,
                        payload: resp.data,
                    })
                })
        }
    }
}

export const ACTION_DELETE_ORDER = 'ACTION/DELETE/ORDER';
export function deleteOrder(id) {
    return function (dispatch) {
        api.delete('/orders/' + id)
            .then(resp => dispatch({
                type: ACTION_DELETE_ORDER,
                payload: resp.data,
            }))
    }
}
export const ACTION_SET_DATE_ORDER = 'ACTION/SET/DATE/ORDER';
export function setDateOrder() {
    return {
        type: ACTION_SET_DATE_ORDER,
    }
}
export const ACTION_CHANGE_IN_ORDER = 'ACTION/CHANGE/IN/ORDER';
export function changeInOrder(changes) {
    return {
        type: ACTION_CHANGE_IN_ORDER,
        payload: changes,
    }
}
export const ACTION_SET_ORDER_CLOSED = 'ACTION/SET/ORDER/CLOSED';
export function onCloseOrder(flag) {
    return {
        type: ACTION_SET_ORDER_CLOSED,
        payload: flag,
    }
}
export const ACTION_ADD_DISH_IN_ORDER = 'ACTION/ADD/DISH/IN/ORDER';
export function addDishOrder(dishId, price) {
    return {
        type: ACTION_ADD_DISH_IN_ORDER,
        payload: { dishId, price },
    }
}
export const ACTION_DEL_DISH_FROM_TEMP_ORDER = 'ACTION/DEL/DISH/FROM/TEMP/ORDER';
export function delDishTempOrder(id) {
    return {
        type: ACTION_DEL_DISH_FROM_TEMP_ORDER,
        payload: id,
    }
}
export const ACTION_SET_QUANTITY_ORDER = 'ACTION/SET/QUANTITY/ORDER';
export function setQuantity(id, qnt) {
    return {
        type: ACTION_SET_QUANTITY_ORDER,
        payload: { id, qnt },
    }
}
export const ACTION_SET_EDIT_ORDER = 'ACTION/SET/EDIT/ORDER';
export function setEditOrder(id) {
    return {
        type: ACTION_SET_EDIT_ORDER,
        payload: id,
    }
}

export function fetchOrders() {
    return function (dispatch) {
        api.get('/orders')
            .then((resp) => dispatch(setOrders(resp.data)));
    }
}