import { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Content from '../components/content/Content'
import {
  homeContainer
} from '../styles/Home.module.scss'

export default function Home() {

  let needLoader = true

  const pixiInjector = () => {
    if (window?.pixiApp?.view) {
      if (needLoader) {
        needLoader = false
        document.getElementsByClassName(homeContainer)[0].prepend(window?.pixiApp?.view)
        document.removeEventListener('DOMContentLoaded', pixiInjector)
      }
    }
    else setTimeout(() => pixiInjector(), 50);
  }

  useEffect(() => {
    if (document.readyState != 'loading') pixiInjector()
    else document.addEventListener('DOMContentLoaded', pixiInjector)
  })

  const Rain = dynamic(() => import('../components/rain/rain'), {
    ssr: false
  });

  return (
    <div className={homeContainer}>
      <Head>
        <title>WheatleyLabs.co.uk</title>
      </Head>

      <Rain />
      <Content />
    </div>
  )
}
