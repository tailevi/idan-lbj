import React from 'react';
import HeroSection from '../components/home/HeroSection';
import OurStory from '../components/home/OurStory';
import FeaturedCollections from '../components/home/FeaturedCollections';
import ProcessTimeline from '../components/home/ProcessTimeline';
import CanvasSizes from '../components/home/CanvasSizes';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <main className="bg-[#000000]">
      <HeroSection />
      <OurStory />
      <FeaturedCollections />
      <ProcessTimeline />
      <CanvasSizes />
      <Newsletter />
    </main>
  );
}