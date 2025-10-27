import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/Footer'
import PrivacyPolicy from '../components/Privacy'
function Home() {
  return (
    <div>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </div>
  )
}

export default Home