import useQuery from "@/hooks/useQuery";
import { pageService } from "@/services/pageService";
import { subscribeService } from "@/services/subscribeService";
import { message } from "antd";

const useContactPage = () => {
  // Get content contact page
  const { data: contactData } = useQuery(() =>
    pageService.getPageDataByName("service")
  );
  const { title, subTitle, data } = contactData || {};
  console.log("🚀data---->", data);
  const { banner, ...contactInfo } = data || {};

  // Banner Info
  const bannerInfo = {
    title: title,
    subTitle: subTitle,
    bannerImage: banner,
  };

  // Submit contact form
  const handleSubmitContactForm = async (formData) => {
    const payload = { ...formData };
    try {
      const res = await subscribeService.subscribe(payload);
      if (res?.data?.data) {
        message.success("Successfully");
      }
    } catch (error) {
      message.error(error?.response?.data);
    }
  };

  // Contact form props
  const contactFormProps = {
    handleSubmitContactForm,
  };

  // Content contact page props
  const contentContactProps = {
    bannerInfo,
    contactInfo,
  };

  return {
    contactFormProps,
    contentContactProps,
  };
};

export default useContactPage;
