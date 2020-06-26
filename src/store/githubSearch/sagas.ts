import { all, call, takeEvery, put, takeLatest, debounce } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import axios, { AxiosResponse } from '../../axios'
import { githubSearchActions, GithubSearchActionTypes } from './actions'
import { ENDPOINTS } from '../../constants/endpoints'
import { UserSearch, UserDetails, UserRepo } from './types'

interface GithubUserSearchResponse<T> {
  incompleteResults: boolean
  items: T[]
  totalCount: number
}

export function* onSearchUsersRequested() {
  yield takeLatest<ActionType<typeof githubSearchActions.searchUsersRequested>>(
    GithubSearchActionTypes.SEARCH_USERS_REQUESTED,
    function* (action) {
      try {
        const response: AxiosResponse<GithubUserSearchResponse<UserSearch>> = yield call(
          axios.get,
          ENDPOINTS.GITHUB_SEARCH_USERS,
          {
            params: { q: action.payload.query },
          }
        )
        yield put(githubSearchActions.searchUsersDone(response.data.items))
      } catch (e) {
        yield put(githubSearchActions.searchUsersError(String(e)))
      }
    }
  )
}

export function* onSelectUserRequested() {
  yield takeEvery<ActionType<typeof githubSearchActions.selectUserRequested>>(
    GithubSearchActionTypes.SELECT_USER_REQUESTED,
    function* (action) {
      try {
        const [usersDetails, userRepos]: [
          AxiosResponse<UserDetails>,
          AxiosResponse<GithubUserSearchResponse<UserRepo>>
        ] = yield all([
          call(axios.get, ENDPOINTS.GITHUB_USERS + '/' + action.payload.username),
          call(axios.get, ENDPOINTS.GITHUB_SEARCH_REPOS, {
            params: { perPage: 3, q: `user:${action.payload.username}`, sort: 'stars' },
          }),
        ])

        yield put(githubSearchActions.selectUserDone(usersDetails.data, userRepos.data.items))
      } catch (e) {
        yield put(githubSearchActions.selectUserError(String(e)))
      }
    }
  )
}

export function* githubSearchSaga() {
  yield all([onSelectUserRequested(), onSearchUsersRequested()])
}
