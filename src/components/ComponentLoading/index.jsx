import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styled from "styled-components";

const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0.7;
`;

const ComponentLoading = () => {
  return (
    <Loading>
      <Spin
        indicator={<LoadingOutlined />}
        style={{ color: "#fcb941" }}
        size="large"
      />
    </Loading>
  );
};

export default ComponentLoading;
