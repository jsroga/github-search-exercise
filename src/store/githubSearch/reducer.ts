import { Reducer } from 'redux'
import { GithubSearchActionTypes } from './actions'
import { GithubSearchState, GithubSearchAction } from './types'

export const initialState: GithubSearchState = {
  loading: false,
  error: null,
  searchUsers: [],
  query: '',
  selectedUser: null,
  selectedUserRepos: null,
}

export const githubSearchReducer: Reducer<GithubSearchState, GithubSearchAction> = (state = initialState, action) => {
  switch (action.type) {
    case GithubSearchActionTypes.SEARCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
        query: action.payload.query,
      }
    case GithubSearchActionTypes.SEARCH_USERS_DONE:
      return {
        ...state,
        loading: false,
        searchUsers: action.payload.users.map((user) => {
          return {
            id: user.id,
            avatarUrl: user.avatarUrl,
            reposUrl: user.reposUrl,
            login: user.login,
          }
        }),
      }
    case GithubSearchActionTypes.SEARCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case GithubSearchActionTypes.SELECT_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case GithubSearchActionTypes.SELECT_USER_DONE:
      return {
        ...state,
        loading: false,
        selectedUser: {
          name: action.payload.userDetails.name,
          id: action.payload.userDetails.id,
          bio: action.payload.userDetails.bio,
          avatarUrl: action.payload.userDetails.avatarUrl,
          login: action.payload.userDetails.login
        },
        selectedUserRepos: action.payload.userRepos.map((repo) => ({
          name: repo.name,
          id: repo.id,
        })),
      }
    case GithubSearchActionTypes.SELECT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userDetails: null,
        selectedUserRepos: null,
      }
    default:
      return state
  }
}
