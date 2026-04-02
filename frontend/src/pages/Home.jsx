import Hero from '../components/sections/Hero'
import SportsOfferings from '../components/sections/SportsOfferings'
import BookingCTA from '../components/sections/BookingCTA'
import Facilities from '../components/sections/Facilities'
import Events from '../components/sections/Events'
import Gallery from '../components/sections/Gallery'
import Testimonials from '../components/sections/Testimonials'

import FindUs from '../components/sections/FindUs'

const Home = () => {
  return (
    <>
      <Hero />
      <SportsOfferings />
      <BookingCTA />
      <Facilities />
      <Gallery />
      <Events />
      <Testimonials />

      <FindUs />
    </>
  )
}

export default Home;
