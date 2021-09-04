import {
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_FAILURE,
    FETCH_SERVICE_SUCCESS,
    FETCH_SERVICES_SUCCESS,
    CHANGE_SELECTED_ID,
    CLEAR_SELECTED_ID
} from '../Actions/actionTypes'

const initialState = {
    items: [],
    loading: false,
    error: null,
    selectedService: {
        id: null,
        name: '',
        price: '',
        content: '',
    },
    selectedId: null
};

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
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
        case FETCH_SERVICE_SUCCESS:
            const { service } = action.payload;
            return {
                ...state,
                selectedService: service,
                loading: false,
                error: null,
            };
        case FETCH_SERVICES_SUCCESS:
            const { items } = action.payload;
            return {
                ...state,
                items,
                loading: false,
                error: null,
            };
        case CHANGE_SELECTED_ID:
            const { id } = action.payload;
            return {
                ...state,
                selectedId: id
            }
        case CLEAR_SELECTED_ID:
            return {
                ...state,
                selectedId: null,
                selectedService: {
                    id: null,
                    name: '',
                    price: '',
                    content: '',
                }
            }
        default:
            return state;
    }
}