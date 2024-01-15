import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import tokenMethod from "@/utils/token";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "" }) => {
  const { handleShowAuthModal } = useAuthContext();
  const navigate = useNavigate();
  const isLogin = !!tokenMethod.get();

  useEffect(() => {
    if (!isLogin) {
      handleShowAuthModal?.(MODAL_TYPES.LOGIN);
    }
  }, [handleShowAuthModal]);

  if (!isLogin) {
    if (!!redirectPath) {
      return <Navigate to={redirectPath} />;
    } else {
      navigate(-1);
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
