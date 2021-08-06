import {
    SEARCH_SKILL_REQUEST, SEARCH_SKILLS_REQUEST, SEARCH_SKILLS_SUCCESS, SEARCH_SKILLS_FAILURE
} from "./actionTypes";

export const searchSkillRequest = search => ({
    type: SEARCH_SKILL_REQUEST,
    payload: { search },
});

export const searchSkillsRequest = search => ({
    type: SEARCH_SKILLS_REQUEST,
    payload: { search },
});

export const searchSkillsFailure = error => ({
    type: SEARCH_SKILLS_FAILURE,
    payload: { error },
});

export const searchSkillsSuccess = items => ({
    type: SEARCH_SKILLS_SUCCESS,
    payload: { items },
});