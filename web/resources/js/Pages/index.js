import { Seo } from '@/components/seo';
import { usePageView } from '@/hooks/use-page-view';
import { HomeCta } from '@/sections/home/home-cta';
import { HomeFaqs } from '@/sections/home/home-faqs';
import { HomeFeatures } from '@/sections/home/home-features';
import { HomeHero } from '@/sections/home/home-hero';
import { HomeReviews } from '@/sections/home/home-reviews';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo />
      <main>
        <HomeHero />
        <HomeFeatures />
        <HomeReviews />
        <HomeCta />
        <HomeFaqs />
      </main>
    </>
  );
};

export default Page;
