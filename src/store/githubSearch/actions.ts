import { createAction } from 'typesafe-actions'
import { UserDetails, UserRepo, UserSearch } from './types';

export const enum GithubSearchActionTypes {
  SEARCH_USERS_REQUESTED = '@@githubSearch/SEARCH_USERS_REQUESTED',
  SEARCH_USERS_DONE = '@@githubSearch/SEARCH_USERS_DONE',
  SEARCH_USERS_ERROR = '@@githubSearch/SEARCH_USERS_ERROR',
  SELECT_USER_REQUESTED = '@@githubSearch/SELECT_USER_REQUESTED',
  SELECT_USER_DONE = '@@githubSearch/SELECT_USER_DONE',
  SELECT_USER_ERROR = '@@githubSearch/SELECT_ERROR',
}

export const githubSearchActions = {
  searchUsersRequested: createAction(
    GithubSearchActionTypes.SEARCH_USERS_REQUESTED,
    (resolve) => (query: string) => resolve({query})
  ),
  searchUsersDone: createAction(
    GithubSearchActionTypes.SEARCH_USERS_DONE,
    (resolve) => (users: UserSearch[]) => resolve({users})
  ),
  searchUsersError: createAction(
    GithubSearchActionTypes.SEARCH_USERS_ERROR,
    (resolve) => (error: string) => resolve({error})
  ),
  selectUserRequested: createAction(
    GithubSearchActionTypes.SELECT_USER_REQUESTED,
    (resolve) => (username: string, reposUrl: string) => resolve({username, reposUrl})
  ),
  selectUserDone: createAction(
    GithubSearchActionTypes.SELECT_USER_DONE,
    (resolve) => (userDetails: UserDetails, userRepos: UserRepo[]) => resolve({userDetails, userRepos})
  ),
  selectUserError: createAction(
    GithubSearchActionTypes.SELECT_USER_ERROR,
    (resolve) => (error: string) => resolve({error})
  )
}
