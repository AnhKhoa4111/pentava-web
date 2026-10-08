import Header from "../components/layouts/Header"
import Footer from "../components/layouts/Footer"
import Hero from "../components/sections/Hero"
import Solution from "../components/sections/Solution"
import Features from "../components/sections/Features"
import Cinema from "../components/sections/Cinema"
import CommunityPreview from "../components/sections/CommunityPreview"
import CTA from "../components/sections/CTA"
import FAQ from "../components/sections/FAQ"
import ContactSection from "../components/sections/ContactSection"

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#F7FAFF] pt-[76px] text-black">
        <Hero />
        <Solution />
        <Features />
        <Cinema />
        <CommunityPreview />
        <CTA />
        <FAQ />
        <ContactSection id="contact" />
      </main>
      <Footer />
    </>
  )
}
