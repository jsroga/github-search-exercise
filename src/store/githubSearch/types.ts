import { ActionType } from 'typesafe-actions'

import { githubSearchActions } from './actions'

export interface UserBase {
  login: string;
  id: number;
  nodeId: string;
  avatarUrl: string;
  gravatarId: string;
  url: string;
  htmlUrl: string;
  followersUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  reposUrl: string;
  receivedEventsUrl: string;
  type: string;
}

export interface UserSearch extends UserBase {
  score: number;
}

export interface UserDetails extends UserBase {
  siteAdmin: boolean;
  name: string;
  company?: any;
  blog: string;
  location?: any;
  email?: any;
  hireable?: any;
  bio: string;
  twitterUsername?: any;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepoLicense {
  key: string;
  name: string;
  spdxId: string;
  url: string;
  nodeId: string;
}

export interface UserRepo {
  id: number;
  nodeId: string;
  name: string;
  fullName: string;
  private: boolean;
  owner: UserBase;
  htmlUrl: string;
  description: string;
  fork: boolean;
  url: string;
  forksUrl: string;
  keysUrl: string;
  collaboratorsUrl: string;
  teamsUrl: string;
  hooksUrl: string;
  issueEventsUrl: string;
  eventsUrl: string;
  assigneesUrl: string;
  branchesUrl: string;
  tagsUrl: string;
  blobsUrl: string;
  gitTagsUrl: string;
  gitRefsUrl: string;
  treesUrl: string;
  statusesUrl: string;
  languagesUrl: string;
  stargazersUrl: string;
  contributorsUrl: string;
  subscribersUrl: string;
  subscriptionUrl: string;
  commitsUrl: string;
  gitCommitsUrl: string;
  commentsUrl: string;
  issueCommentUrl: string;
  contentsUrl: string;
  compareUrl: string;
  mergesUrl: string;
  archiveUrl: string;
  downloadsUrl: string;
  issuesUrl: string;
  pullsUrl: string;
  milestonesUrl: string;
  notificationsUrl: string;
  labelsUrl: string;
  releasesUrl: string;
  deploymentsUrl: string;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date;
  gitUrl: string;
  sshUrl: string;
  cloneUrl: string;
  svnUrl: string;
  homepage: string;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language: string;
  hasIssues: boolean;
  hasProjects: boolean;
  hasDownloads: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  forksCount: number;
  mirrorUrl?: any;
  archived: boolean;
  disabled: boolean;
  openIssuesCount: number;
  license: RepoLicense;
  forks: number;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
}

export interface GithubSearchState {
  readonly loading: boolean
  readonly error: string | null
  readonly searchUsers: Pick<UserSearch, 'id' | 'avatarUrl' | 'reposUrl' | 'login'>[]
  readonly query: string
  readonly selectedUser: Pick<UserDetails, 'id' | 'avatarUrl' | 'bio' | 'name' | 'login'> | null
  readonly selectedUserRepos: Pick<UserRepo, 'name' | 'id'>[] | null
}

export type GithubSearchAction = ActionType<typeof githubSearchActions>

