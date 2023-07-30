export const initialState = {
    problem_state: {
        problemCount: 0,
        problemName: "",
        rating: [],
        tags: [],
        contestID: [],
        problems: [],
        selectedProblems: [],
        selectedTags: {
            contestId: [],
            rating: [],
            tags: [],
        },
        apiStatus: "",
        apiResponce: "",
    },
    submission_state: {
        rating: [],
        tags: [],
        contestID: [],
        language: [],
        verdict: [],
        submission: [],
        selectedTags: {
            contestId: [],
            rating: [],
            verdict: [],
            tags: [],
            language: [],
        },
        apiStatus: "",
        apiResponce: "",
    },
    user_state: {
        userId: "",
        token: "",
        tokenExpirationDate: "",
        groups: [],
        selectedGroup: "",
        selectedUserName: "",
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_PROBLEM_STATE_PROBLEM_COUNT":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    problemCount: action.data,
                },
            };
        case "SET_PROBLEM_STATE_PROBLEMS":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    problems: action.data,
                },
            };
        case "SET_PROBLEM_STATE_PROBLEM_NAME":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    problemName: action.data,
                },
            };
        case "SET_PROBLEM_STATE_RATINGS":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    rating: action.data,
                },
            };
        case "SET_PROBLEM_STATE_TAGS":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    tags: action.data,
                },
            };
        case "SET_PROBLEM_STATE_CONTEST_ID":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    contestID: action.data,
                },
            };
        case "PROBLEM_STATE_ADD_SELECTED_PROBLEMS":
            const selectedProblems = [
                ...state.problem_state.selectedProblems,
                action.data,
            ];
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    selectedProblems: selectedProblems,
                    selectedTags: {
                        contestId: [],
                        rating: [],
                        tags: [],
                    },
                },
            };
        case "PROBLEM_STATE_ADD_SELECTED_TAG":
            const add_selectedTag = [
                ...state.problem_state.selectedTags[action.data.split(",")[0]],
                action.data,
            ];
            add_selectedTag.sort();

            const add_selectedTags = { ...state.problem_state.selectedTags };
            add_selectedTags[action.data.split(",")[0]] = add_selectedTag;
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    selectedTags: add_selectedTags,
                },
            };
        case "PROBLEM_STATE_REMOVE_SELECTED_TAG":
            if (action.data.split(",")[0] === "name") {
                const remove_selected_problems =
                    state.problem_state.selectedProblems.filter(
                        (prb) => action.data !== prb
                    );
                return {
                    ...state,
                    problem_state: {
                        ...state.problem_state,
                        selectedProblems: remove_selected_problems,
                    },
                };
            } else {
                const remove_selected_tags = {
                    ...state.problem_state.selectedTags,
                };
                remove_selected_tags[action.data.split(",")[0]] =
                    remove_selected_tags[action.data.split(",")[0]].filter(
                        (tg) => action.data != tg
                    );

                return {
                    ...state,
                    problem_state: {
                        ...state.problem_state,
                        selectedTags: remove_selected_tags,
                    },
                };
            }
        case "SET_PROBLEM_STATE_API_STATUS":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    apiStatus: action.data,
                },
            };
        case "SET_PROBLEM_STATE_API_RESPONCE":
            return {
                ...state,
                problem_state: {
                    ...state.problem_state,
                    apiResponce: action.data,
                },
            };
        case "SET_SUBMISSION_RATINGS":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    rating: action.data,
                },
            };

        case "SET_SUBMISSION_TAGS":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    tags: action.data,
                },
            };
        case "SET_SUBMISSION_CONTEST_ID":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    contestID: action.data,
                },
            };
        case "SET_SUBMISSION_LANGUAGE":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    language: action.data,
                },
            };
        case "SET_SUBMISSION_VERDICT":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    verdict: action.data,
                },
            };
        case "SET_SUBMISSION_SUBMISSIONS":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    submission: action.data,
                },
            };
        case "SUBMISSION_ADD_SELECTED_TAG":
            const submission_add_selectedTag = [
                ...state.submission_state.selectedTags[
                    action.data.split(",")[0]
                ],
                action.data,
            ];
            submission_add_selectedTag.sort();

            const submission_add_selectedTags = {
                ...state.submission_state.selectedTags,
            };
            submission_add_selectedTags[action.data.split(",")[0]] =
                submission_add_selectedTag;
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    selectedTags: submission_add_selectedTags,
                },
            };
        case "SUBMISSION_REMOVE_SELECTED_TAG":
            if (action.data.split(",")[0] === "name") {
                const remove_selected_problems =
                    state.submission_state.selectedProblems.filter(
                        (prb) => action.data !== prb
                    );
                return {
                    ...state,
                    submission_state: {
                        ...state.submission_state,
                        selectedProblems: remove_selected_problems,
                    },
                };
            } else {
                const remove_selected_tags = {
                    ...state.submission_state.selectedTags,
                };
                remove_selected_tags[action.data.split(",")[0]] =
                    remove_selected_tags[action.data.split(",")[0]].filter(
                        (tg) => action.data != tg
                    );

                return {
                    ...state,
                    submission_state: {
                        ...state.submission_state,
                        selectedTags: remove_selected_tags,
                    },
                };
            }
        case "SET_SUBMISSION_API_STATUS":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    apiStatus: action.data,
                },
            };
        case "SET_SUBMISSION_API_RESPONCE":
            return {
                ...state,
                submission_state: {
                    ...state.submission_state,
                    apiResponce: action.data,
                },
            };
        case "USER_UPDATE_USER_ID":
            return {
                ...state,
                user_state: {
                    ...state.user_state,
                    userId: action.data,
                },
            };
        case "USER_UPDATE_USER_TOKEN":
            return {
                ...state,
                user_state: {
                    ...state.user_state,
                    token: action.data,
                },
            };
        case "USER_UPDATE_TOKEN_EXPIRATION_DATE":
            return {
                ...state,
                user_state: {
                    ...state.user_state,
                    tokenExpirationDate: action.data,
                },
            };
        case "USER_SET_GROUPS":
            return {
                ...state,
                user_state: {
                    ...state.user_state,
                    groups: action.data,
                    selectedGroup: action.data.length > 0 ? action.data[0].name : ""
                },
            };
        case "USER_SET_SELECTED_GROUP":
            return {
                ...state,
                user_state: {
                    ...state.user_state,
                    selectedGroup: action.data,
                },
            };
        case "USER_UPDATE_SELECTED_USERNAME":
            return {
                ...state,
                user_state: {
                    ...state.user_state,
                    selectedUserName: action.data,
                },
            };
        default:
            return state;
    }
}

export default reducer;
