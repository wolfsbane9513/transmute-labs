import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { CaseStudies } from '@/components/sections/case-studies';
import { Team } from '@/components/sections/team';
import { Advantage } from '@/components/sections/advantage';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <CaseStudies />
        <Team />
        <Advantage />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
