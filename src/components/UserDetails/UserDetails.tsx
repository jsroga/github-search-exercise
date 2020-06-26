import React from 'react'
import BEMhelper from 'react-bem-helper'
import './UserDetails.less'

interface UserDetailsProps {
  avatarUrl?: string
  name?: string
  bio?: string
  login: string
}

const cn = new BEMhelper({
  name: 'user-details',
  prefix: 'pw-',
})

export function UserDetails({ avatarUrl, name, bio, login }: UserDetailsProps) {
  return (
    <div {...cn()}>
      <div {...cn('header')}>
        <div {...cn('avatar')} style={{ backgroundImage: `url(${avatarUrl})` }}></div>
        <div {...cn('name')}>{name || login}</div>
      </div>
      <div {...cn('bio')}>{bio}</div>
    </div>
  )
}
