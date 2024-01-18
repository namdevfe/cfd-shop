import { MODAL_TYPES } from "@/constants/general";
import { handleShowAuthModal } from "@/store/reducers/authReducer";
import tokenMethod from "@/utils/token";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = !!tokenMethod.get();

  useEffect(() => {
    if (!isLogin) {
      dispatch(handleShowAuthModal(MODAL_TYPES.LOGIN));
    }
  }, []);

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
