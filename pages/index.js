import { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { gql } from '@apollo/client'
import client from '../utils/apolloClient'

import Content from '../components/content/Content'
import {
  homeContainer
} from '../styles/Home.module.scss'

export default function Home({data}) {
  if (data) {
    console.log(data)
  }
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

export async function getStaticProps() {
  try {
    const response = await client.query({
      query: gql`
        {
          homepageCollection {
            items {
              title
            }
          }
        }
      `,
    });
    console.log("GQL RESPONSE", response)
  
    return {
      props: {
        data: [],
      },
    };
  }
  catch(e) {
    console.error("graphql error", e)
    return {
      props: {
        data: null
      }
    }
  }
}