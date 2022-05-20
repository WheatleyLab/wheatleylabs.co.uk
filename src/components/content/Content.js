import React, { useContext } from "react"
import AppContext from "../../contexts/app"
import './Content.scss'

const Content = () => {

  const { appState, setAppState } = useContext(AppContext)

  const updateTitle = evt => setAppState({
    ...appState,
    title: evt.target.value
  })

  return (
    <div className="content">
        <img className="change-me" src="change-me.svg" alt="instructions"/>
        <p className="input" id="title-calc">{appState.title}</p>
        <input
          type="text"
          spellCheck="false"
          className="input"
          id="title-text"
          defaultValue={appState.title}
          onChange={updateTitle}
        />
        <a href="mailto: craigster1991@gmail.com">Get in touch</a>
      </div>
  )
}

export default Content