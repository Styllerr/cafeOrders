import {
    ACTION_SET_WAITERS,
    ACTION_CREATE_WAITER,
    ACTION_UPDATE_WAITER,
    ACTION_DELETE_WAITER,
} from "../actions/waiters";

const initialState = {
    items: [],
}

export default function (state = initialState, { type, payload }) {
    const updateWaiters = (data) => state.items.map((item) => (item._id === data._id ? data : item));
    const deleteItem = (data) => state.items.filter(item => item._id !== data)

    switch (type) {
        case ACTION_SET_WAITERS:
            return { ...state, items: payload };
        case ACTION_CREATE_WAITER:
            return { ...state, items: [...state.items, payload] };
        case ACTION_UPDATE_WAITER:
            return { ...state, items: updateWaiters(payload) };
        case ACTION_DELETE_WAITER:
            return { ...state, items: deleteItem(payload) };
        default:
            return state
    }
}