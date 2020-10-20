import {
    ACTION_SET_MENUSECTIONS,
    ACTION_CREATE_MENUSECTION,
    ACTION_UPDATE_MENUSECTION,
    ACTION_DELETE_MENUSECTION
} from "../actions/menuSections"

const initialState = {
    items: [],
}
export default function (state = initialState, { type, payload }) {
    const updateMenuSection = (data) => state.items.map((item) => (item._id === data._id ? data : item));
    const deleteItem = (data) => state.items.filter(item => item._id !== data)
    switch (type) {
        case ACTION_SET_MENUSECTIONS:
            return { ...state, items: payload };
        case ACTION_CREATE_MENUSECTION:
            return { ...state, items: [...state.items, payload] };
        case ACTION_UPDATE_MENUSECTION:
            return { ...state, items: updateMenuSection(payload) };
        case ACTION_DELETE_MENUSECTION:
            return { ...state, items: deleteItem(payload) };
        default:
            return state
    }
}