import {
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICES_SUCCESS,
    CHANGE_SELECTED_ID
} from '../Actions/actionTypes'

const initialState = {
    items: [],
    loading: false,
    error: null,
    selectedService: {
        name: '',
        price: '',
        content: '',
    },
    selectedId: null
};

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SERVICES_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error,
            };
        case FETCH_SERVICES_SUCCESS:
            const { items } = action.payload;
            return {
                ...state,
                items,
                loading: false,
                error: null,
            };
        case FETCH_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CHANGE_SELECTED_ID:
            const { selectedId } = action.payload;
            return {
                ...state,
                selectedId
            }
        default:
            return state;
    }
}