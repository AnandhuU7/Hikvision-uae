import { Homepage, type Media } from '@/payload-types'
import AnimatedHeroSlider from '../slider/animated-slider'

const HeroSection = ({ homepage }: { homepage: Homepage }) => {
  return (
    <section
      style={{ height: 'calc(100vh - 100px)' }} // Increased offset to 100px
      className="pt-20 pb-8 bg-background text-foreground mt-16" // Added padding-top and margin-top
    >
      <AnimatedHeroSlider homepage={homepage} />
    </section>
  )
}

export default HeroSection