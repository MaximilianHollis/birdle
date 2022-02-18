import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { FC, ReactElement, ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
      scroll-behavior: smooth;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

import Navbar from '../src/components/navbar'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: FC<AppProps> = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  )
}

export default App
