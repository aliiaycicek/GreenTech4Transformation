

import HomeHero from "./components/HomeHero";
import Intro from "./components/Intro";
import HomePartners from "./components/HomePartners";
import Supporters from "./components/Supporters";
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
        <Supporters />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <SurveyCTA />
      </ScrollAnimationWrapper>
    </main>
  );
}
