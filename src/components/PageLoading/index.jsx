import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const PageLoading = () => {
  return (
    <Spin
      size="large"
      indicator={<LoadingOutlined />}
      style={{ background: "#fff", color: "#fcb941" }}
      fullscreen
    />
  );
};

export default PageLoading;
