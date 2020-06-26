import React, { useState, useEffect } from 'react'
import BEMhelper from 'react-bem-helper'
import './GithubSearch.less'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../store/index'
import { githubSearchActions } from '../../store/githubSearch/actions'
import { Search } from '../../components/Search/Search'
import { Card } from '../../components/Card/Card'
import { UserDetails } from '../../components/UserDetails/UserDetails'

const cn = new BEMhelper({
  name: 'github-search',
  prefix: 'pw-',
})

export function GithubSearch() {
  const dispatch = useDispatch()
  const searchUsers = useSelector((state: State) => state.githubSearch.searchUsers)
  const loading = useSelector((state: State) => state.githubSearch.loading)
  const error = useSelector((state: State) => state.githubSearch.error)
  const selectedUser = useSelector((state: State) => state.githubSearch.selectedUser)
  const selectedUserRepos = useSelector((state: State) => state.githubSearch.selectedUserRepos)
  const [open, setOpen] = useState(false)

  return (
    <div {...cn()}>
      <div {...cn('search')}>
        <Search
          isOpen={open}
          loading={loading}
          searchResults={searchUsers.map((user) => ({
            label: user.login,
            onClick: () => {
              dispatch(githubSearchActions.selectUserRequested(user.login, user.reposUrl))
              setOpen(false)
            },
          }))}
          onSubmit={(query) => {
            dispatch(githubSearchActions.searchUsersRequested(query))
            setOpen(true)
          }}
        />
      </div>
      <div {...cn('results')}>
        {error && <Card {...cn('error')}>{error}</Card>}
        {selectedUser && (
          <UserDetails
            avatarUrl={selectedUser.avatarUrl}
            bio={selectedUser.bio}
            name={selectedUser.name}
            login={selectedUser.login}
          />
        )}
        {selectedUserRepos && !!selectedUserRepos.length && (
          <div {...cn('user-repos')}>
            <h4 {...cn('top-repos')}>Top repositories</h4>
            {selectedUserRepos.map((repo) => (
              <Card key={repo.id} {...cn('repo')}>{repo.name}</Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
