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
    needLoader = false
    document.getElementsByClassName(homeContainer)[0].prepend(window?.pixiApp?.view)
    window.removeEventListener('load', pixiInjector)
  }

  useEffect(() => {
    if (needLoader) window.addEventListener('load', pixiInjector);
    // console.log(pixiOnPage, window?.pixiApp?.view)
    // if (!pixiOnPage) {
    //   if (window?.pixiApp?.view) {
    //     document.getElementsByClassName('app_body')[0].prepend(window?.pixiApp?.view)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     pixiOnPage = true
    //   }
    // }
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
