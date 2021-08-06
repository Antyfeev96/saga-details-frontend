import { takeLatest, put, spawn, debounce, retry, take, fork } from 'redux-saga/effects';
import { searchSkillRequest, searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure } from '../Actions/actionCreators';
import { SEARCH_SKILLS_REQUEST } from '../Actions/actionTypes';

function filterChangeSearchAction({type, payload}) {
    return payload.search.trim() !== ''
}

// worker
function* handleChangeSearchSaga(action) {
    yield put(searchSkillsRequest(action.payload.search));
}

// watcher
function* watchChangeSearchSaga() {
    yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

// worker
function* handleSearchSkillsSaga(action) {
    try {
        const retryCount = 3;
        const retryDelay = 1000; // ms
        const data = yield retry(retryCount, retryDelay, searchSkills, action.payload.search);
        yield put(searchSkillsSuccess(data));
    } catch (e) {
        yield put(searchSkillsFailure(e.message));
    }
}

// watcher
function* watchSearchSkillsSaga() {
    yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga)
}