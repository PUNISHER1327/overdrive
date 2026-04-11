import Hero from '../components/sections/Hero'
import SportsOfferings from '../components/sections/SportsOfferings'
import BookingSystem from '../components/sections/BookingSystem'
import Facilities from '../components/sections/Facilities'
import Events from '../components/sections/Events'

import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'
import SubmitReview from '../components/sections/SubmitReview'

import FindUs from '../components/sections/FindUs'

import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <SportsOfferings />
      {/* <BookingSystem /> */}
      <Facilities />
      <Gallery />
      <Events />

      <Testimonials />
      <FindUs />
      <SubmitReview />
    </>
  )
}

export default Home;
