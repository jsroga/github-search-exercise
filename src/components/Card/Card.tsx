import React from 'react'
import BEMhelper from 'react-bem-helper'
import './Card.less'

interface CardProps {
  children: string | JSX.Element
  className?: string
}

const cn = new BEMhelper({
  name: 'card',
  prefix: 'pw-',
})

export function Card({ children, className }: CardProps) {
  return <div {...cn('', '', className)}>{children}</div>
}
