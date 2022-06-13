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
    console.log('injector')
    if (needLoader) {
      console.log('add pixi', homeContainer)
      needLoader = false
      document.getElementsByClassName(homeContainer)[0].prepend(window?.pixiApp?.view)
      window.removeEventListener('load', pixiInjector)
    }
  }

  useEffect(() => {
    console.log('effec trigger')
    window.addEventListener('load', pixiInjector);
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
