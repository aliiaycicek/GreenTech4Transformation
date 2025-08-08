

import HomeHero from "./components/HomeHero";
import Intro from "./components/Intro";
import HomePartners from "./components/HomePartners";
import SurveyCTA from "./components/SurveyCTA";
import ScrollAnimationWrapper from "./components/Animations/ScrollAnimationWrapper";

export default function Home() {
  return (
    <main>
      <ScrollAnimationWrapper>
        <Intro />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <HomePartners />
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <SurveyCTA />
      </ScrollAnimationWrapper>
    </main>
  );
}
