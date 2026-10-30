import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div className="login-intro">
      <span className="login-intro__eyebrow">Admin Portal</span>
      <h1 className="login-intro__title">
        Welcome to <span className="login-intro__accent">Enrichers</span>
      </h1>
      <p className="login-intro__text">
        Manage pages, posts, media and enquiries for Enrichers Investment Group.
      </p>
    </div>
  )
}

export default BeforeLogin
