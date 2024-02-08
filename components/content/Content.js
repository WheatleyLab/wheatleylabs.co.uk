import Image from "next/image"
import React, { useContext } from "react"
import AppContext from "../../contexts/app"
import { sendToGoogleAnalytics } from '../../helpers/ga'
import {
  content,
  contentInput,
  contentInputTitleCalc,
  contentInputTitleText,
  contentAnchor,
  contentChangeMe,
} from './Content.module.scss'

const Content = () => {

  const { appState, setAppState } = useContext(AppContext)

  const updateTitle = evt => {
    setAppState({
      ...appState,
      title: evt.target.value
    })

    sendToGoogleAnalytics({
      name: 'title-change',
      value: evt.target.value,
    })
  }

  return (
    <div className={content}>
        <div className={contentChangeMe}>
          <Image src="/change-me.svg" alt="instructions" width={196} height={89} layout="fixed" priority />
        </div>
        <p className={`${contentInput} ${contentInputTitleCalc}`} id="title-calc">{appState.title}</p>
        <input
          className={`${contentInput} ${contentInputTitleText}`}
          type="text"
          spellCheck="false"
          id="title-text"
          defaultValue={appState.title}
          onChange={updateTitle}
        />
        <a className={contentAnchor} href="mailto: craig@wheatleylabs.co.uk">Get in touch</a>
      </div>
  )
}

export default Content