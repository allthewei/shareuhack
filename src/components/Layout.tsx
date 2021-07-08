import Footer from './Footer'
import Meta from './Meta'
import Header from './Header'
import React from 'react'
import Container from './Container'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Meta />
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
