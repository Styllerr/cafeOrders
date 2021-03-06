import {
    ACTION_CREATE_ORDER,
    ACTION_SET_ORDERS,
    ACTION_SET_BLANK_ORDERS,
    ACTION_UPDATE_ORDER,
    ACTION_SET_DATE_ORDER,
    ACTION_ADD_DISH_IN_ORDER,
    ACTION_DEL_DISH_FROM_TEMP_ORDER,
    ACTION_SET_QUANTITY_ORDER,
    ACTION_CHANGE_IN_ORDER,
    ACTION_SET_EDIT_ORDER,
    ACTION_DELETE_ORDER,
    ACTION_SET_ORDER_CLOSED,
} from "../actions/orders"

const BLANK_ORDER = {
    date: '',
    waiterID: '0',
    table: '0',
    orderOpenTime: '',
    orderClosed: false,
    orderCloseTime: '',
    sum: '0',
    listSelectedDishes: [],
}
const initialState = {
    items: [],
    tempOrder: { ...BLANK_ORDER },
}
const getDateNow = () => {
    let dateNow = new Date();
    let day = dateNow.getDate() < 10
        ? '0' + dateNow.getDate()
        : dateNow.getDate();
    let month = dateNow.getMonth() + 1;
    month = month < 9
        ? '0' + month
        : month;
    return `${day}/${month}/${dateNow.getFullYear()}`
}
const getTimeNow = () => {
    let dateTime = new Date();
    let hour = dateTime.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute = dateTime.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    return `${hour}:${minute}`
}

export default function (state = initialState, { type, payload }) {
    const updateOrder = (data) => state.items.map(item => item._id === data._id ? data : item);
    const findOrderForEdit = (id) => state.items.find(item => item._id === id);
    const deleteOrder = (id) => state.items.filter(item => item._id !== id);
    const deleteFromTemp = (id) => state.tempOrder.listSelectedDishes.filter(item => item.id !== id);
    const setOrderClosingTime = (flag) => flag ? {orderCloseTime: getTimeNow()} : {orderCloseTime: ''}
    const addDish = (data) => {
        return {
            ...state, tempOrder: {
                ...state.tempOrder,
                listSelectedDishes: [...state.tempOrder.listSelectedDishes, { id: Date.now(), ...data, quantity: '1' }]
            }
        }
    }
    const setQuantity = ({ id, qnt }) => {
        let tempArray = state.tempOrder.listSelectedDishes.map(item => item.id === id
            ? { ...item, quantity: qnt }
            : item);
        return tempArray;
    }
    switch (type) {
        case ACTION_SET_ORDERS:
            return { ...state, items: payload };
        case ACTION_SET_BLANK_ORDERS:
            return { ...state, tempOrder: { ...BLANK_ORDER } };
        case ACTION_CREATE_ORDER:
            return {
                ...state, items: [...state.items, payload], tempOrder: { ...BLANK_ORDER },
            }
        case ACTION_UPDATE_ORDER:
            return {
                ...state, items: updateOrder(payload)
            }
        case ACTION_DELETE_ORDER:
            return {
                ...state, items: deleteOrder(payload)
            }
        case ACTION_SET_DATE_ORDER:
            return {
                ...state, tempOrder: {
                    ...state.tempOrder,
                    date: getDateNow(),
                    orderOpenTime: getTimeNow()
                }
            }
        case ACTION_CHANGE_IN_ORDER:
            return {
                ...state, tempOrder: { ...state.tempOrder, ...payload }
            }
        case ACTION_SET_ORDER_CLOSED:
            return {
                ...state, tempOrder: {
                    ...state.tempOrder,
                    orderClosed: payload,
                    ...setOrderClosingTime(payload)
                }
            }
        case ACTION_ADD_DISH_IN_ORDER:
            return addDish(payload)

        case ACTION_DEL_DISH_FROM_TEMP_ORDER:
            return {
                ...state,
                tempOrder: { ...state.tempOrder, listSelectedDishes: deleteFromTemp(payload) }
            }
        case ACTION_SET_QUANTITY_ORDER:
            return {
                ...state,
                tempOrder: { ...state.tempOrder, listSelectedDishes: setQuantity(payload) }
            }
        case ACTION_SET_EDIT_ORDER:
            return {
                ...state,
                tempOrder: findOrderForEdit(payload)
            }
        default:
            return state
    }
} 