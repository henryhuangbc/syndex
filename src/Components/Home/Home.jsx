import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Section from '../Section'
import Article from '../Section/Article'
import Footer from '../Footer'
import Ad from '../Ads/Ads'
import Prompt from '../Prompt/Prompt'

export default function Home() {
  const [trigger, setTrigger] = useState(false)
  const [prompt, setPrompt] = useState()
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setPrompt(e)
      // Update UI notify the user they can install the PWA
      setTrigger(true)
    })
  }, [trigger])

  const HandleClick = () => {
    // Hide the app provided install promotion
    setTrigger(false)
    // Show the install prompt
    prompt.prompt()
    // Wait for the user to respond to the prompt
    prompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
    })
  }
  return (
    <div>
      <Header />
      <Section />
      <Article />
      {trigger ? <Prompt handleClick={HandleClick} /> : ''}
      <Ad />
      <Footer />
    </div>
  )
}
