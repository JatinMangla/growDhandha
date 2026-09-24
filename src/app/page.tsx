import { JsonLd } from '@/components/seo/JsonLd';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Pricing } from '@/components/sections/Pricing';
import { RecentlyShipped } from '@/components/sections/RecentlyShipped';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { TrustBar } from '@/components/sections/TrustBar';
import { WhyMe } from '@/components/sections/WhyMe';

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <TrustBar />
      <Services />
      <WhyMe />
      <Portfolio />
      <RecentlyShipped />
      <Testimonials />
      <Process />
      <Pricing />
      <TechStack />
      <Faq />
      <Contact />
    </>
  );
}
