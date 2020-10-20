import {
    ACTION_SET_DISHES,
    ACTION_CREATE_DISH,
    ACTION_UPDATE_DISH,
    ACTION_DELETE_DISHES,
    ACTION_SET_SELECT_DISH,
    ACTION_SET_UNSELECT_DISH,
} from "../actions/dishes";

const initialState = {
    items: [],
    onSelectDish: false,
};

export default function (state = initialState, { type, payload }) {
    const updateItem = (data) => state.items.map(item => item._id !== data._id ? item : data);
    const deleteItem = (data) => state.items.filter(item => item._id !== data);
    switch (type) {
        case ACTION_SET_DISHES:
            return { ...state, items: payload };
        case ACTION_CREATE_DISH:
            return { ...state, items: [...state.items, payload] };
        case ACTION_UPDATE_DISH:
            return { ...state, items: updateItem(payload) };
        case ACTION_DELETE_DISHES:
            return { ...state, items: deleteItem(payload) };
        case ACTION_SET_SELECT_DISH:
            return { ...state, onSelectDish: true };
        case ACTION_SET_UNSELECT_DISH:
            return { ...state, onSelectDish: false };
        default:
            return state
    }
};