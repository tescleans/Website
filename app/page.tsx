import HeroSlider from "@/components/HeroSlider";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import MissionSection from "@/components/MissionSection";
import RecentWork from "@/components/RecentWork";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import { getGoogleReviews } from "@/lib/getReviews";
import Process from "@/components/Process";


export default async function Home() {
  const reviews = await getGoogleReviews();

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="sr-only">Total Excellence Services - Commercial & Residential Cleaning in Miami Lakes</h1>
      <HeroSlider />
      <IntroSection />
      <ServicesSection />
      <MissionSection />
      <RecentWork />
      <Features />
      <OurProcess />
      <Testimonials reviews={reviews} />
      {/* Contact Us is covered by Footer and CTA in other sections */}
    </div>
  );
}

