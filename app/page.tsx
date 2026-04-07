export const revalidate = 0  // ← add this line

import HeroSlider from "@/components/HeroSlider";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import MissionSection from "@/components/MissionSection";
import RecentWork from "@/components/RecentWork";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import { getGoogleReviews } from "@/lib/getReviews";
import OurProcess from "@/components/Process";

export default async function Home() {
  let reviews = [];
  try {
    reviews = await getGoogleReviews();
  } catch {
    reviews = [];
  }

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
    </div>
  );
}
