import HomeHero from "./components/HomeHero";
import Intro from "./components/Intro";
import HomePartners from "./components/HomePartners";
import Supporters from "./components/Supporters";
import ScrollAnimationWrapper from "./components/Animations/ScrollAnimationWrapper";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <ScrollAnimationWrapper>
        <Intro />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <HomePartners />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
        <Supporters />
      </ScrollAnimationWrapper>
    </main>
  );
}
