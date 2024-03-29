import { SHOW_ALERT, HIDE_ALERT } from "../action/type";

const INITIAL = {
    isOpen: false,
    type: "",
    message: "",
};

const alertReducer = (state = INITIAL, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, isOpen: true, ...action.payload };
        case HIDE_ALERT:
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export default alertReducer;
