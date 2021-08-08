import { takeLatest, put, spawn, debounce, retry, take, fork, call } from 'redux-saga/effects';
import { fetchServiceRequest, fetchServicesRequest, fetchServicesSuccess, fetchServicesFailure } from '../Actions/actionCreators';
import {
    FETCH_SERVICE_REQUEST,
    FETCH_SERVICES_REQUEST, FETCH_SERVICES_FAILURE, FETCH_SERVICES_SUCCESS,
    CHANGE_SELECTED_ID
} from '../Actions/actionTypes';
import API from "../API/index";
const api = new API()

// // worker
// function* handleChangeSearchSaga(action) {
//     yield put(searchServicesRequest(action.payload.search));
// }
//
// // watcher
// function* watchChangeSearchSaga() {
//     yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
// }

// worker
function* handleFetchServicesSaga() {
    try {
        const data = yield call(async () => await api.fetchItems());
        console.log({data})
        yield put(fetchServicesSuccess(data));
    } catch (e) {
        console.log({e})
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
    // yield spawn(watchSearchSkillsSaga)
}