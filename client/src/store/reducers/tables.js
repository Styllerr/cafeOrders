import {ACTION_SET_TABLES} from '../actions/tables';

const initialState = {
    items: '10',
    }
    
export default function (state = initialState, { type, payload }) {
    switch (type) {
        case ACTION_SET_TABLES:
            return { ...state, items: payload };
        default:
            return state
    }
}