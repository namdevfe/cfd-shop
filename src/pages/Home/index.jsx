import PageLoading from "@/components/PageLoading";
import HotProductSection from "./HotProductSection";
import IntroSection from "./IntroSection";
import useHomePage from "./useHomePage";
import useDebounce from "@/hooks/useDebounce";
import DealSection from "./DealSection";
import BrandSection from "./BrandSection";
import FeaturedSection from "./FeaturedSection";
import ServiceSection from "./ServiceSection";
import GetDealSection from "./GetDealSection";

const Home = () => {
  const {
    introProps,
    hotProductProps,
    dealProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
    apiLoading,
  } = useHomePage();
  const loading = useDebounce(apiLoading, 300);

  if (loading) {
    return <PageLoading />;
  }

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
