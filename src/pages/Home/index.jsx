import BrandSection from "./BrandSection";
import DealSection from "./DealSection";
import FeaturedSection from "./FeaturedSection";
import GetDealSection from "./GetDealSection";
import HotProductSection from "./HotProductSection";
import IntroSection from "./IntroSection";
import ServiceSection from "./ServiceSection";
import useHomePage from "./useHomePage";

const Home = () => {
  const {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
    // apiLoading,
  } = useHomePage();
  // const loading = useDebounce(apiLoading, 300);

  // if (loading) {
  //   return <PageLoading />;
  // }

  return (
    <main className="main">
      <IntroSection {...introProps} />
      <HotProductSection {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection {...dealProps} />
      <BrandSection {...brandProps} />
      <FeaturedSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServiceSection {...serviceProps} />
      <GetDealSection {...getDealProps} />
    </main>
  );
};

export default Home;
