import { subscribeService } from "@/services/subscribeService";
import { message } from "antd";

const useContactPage = () => {
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

  const contactFormProps = {
    handleSubmitContactForm,
  };

  return {
    contactFormProps,
  };
};

export default useContactPage;
