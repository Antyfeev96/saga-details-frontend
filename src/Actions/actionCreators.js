import {
    FETCH_SERVICE_REQUEST, FETCH_SERVICE_SUCCESS,
    FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FAILURE,
    CHANGE_SELECTED_ID
} from "./actionTypes";

export const fetchServiceRequest = id => ({
    type: FETCH_SERVICE_REQUEST,
    payload: { id }
});

export const fetchServicesRequest = () => ({
    type: FETCH_SERVICES_REQUEST
});

export const fetchServicesFailure = error => ({
    type: FETCH_SERVICES_FAILURE,
    payload: { error }
});

export const fetchServiceSuccess = service => ({
    type: FETCH_SERVICE_SUCCESS,
    payload: { service }
});

export const fetchServicesSuccess = items => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: { items }
});

export const changeSelectedId = id => ({
    type: CHANGE_SELECTED_ID,
    payload: { id }
})