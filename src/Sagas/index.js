import { put, spawn, take, fork, call } from 'redux-saga/effects';
import { fetchServiceSuccess, fetchServicesSuccess, fetchServicesFailure } from '../Actions/actionCreators';
import {
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICES_REQUEST
} from '../Actions/actionTypes';

import API from "../API/index";
const api = new API()

// worker
function* handleFetchServiceSaga(id) {
    console.log({id})
    try {
        const data = yield call(async () => await api.fetchItem(id));
        yield put(fetchServiceSuccess(data));
    } catch (e) {
        yield put(fetchServicesFailure(e.message));
    }
}

// watcher
function* watchFetchServiceSaga() {
    while (true) {
        const action = yield take(FETCH_SERVICE_REQUEST);
        yield fork(handleFetchServiceSaga, action.payload.id)
    }
}

// worker
function* handleFetchServicesSaga() {
    try {
        const data = yield call(async () => await api.fetchItems());
        yield put(fetchServicesSuccess(data));
    } catch (e) {
        yield put(fetchServicesFailure(e.message));
    }
}

// watcher
function* watchFetchServicesSaga() {
    while (true) {
        const action = yield take(FETCH_SERVICES_REQUEST);
        yield fork(handleFetchServicesSaga, action);
    }
}

export default function* saga() {
    yield spawn(watchFetchServicesSaga);
    yield spawn(watchFetchServiceSaga)
}