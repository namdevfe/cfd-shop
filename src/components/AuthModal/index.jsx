import { MODAL_TYPES } from "@/constants/general";
import { useAuthContext } from "@/context/AuthContext";
import cn from "@/utils/cn";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseAuthModal,
  handleShowAuthModal,
} from "@/store/reducers/authReducer";

const AuthModalContainer = styled.div`
  display: ${(props) => (props?.$isShow ? "block" : "none")};
`;

const AuthModal = () => {
  const { showAuthModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    e?.stopPropagation();
    dispatch(handleShowAuthModal(tab));
  };

  const _onCloseModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    dispatch(handleCloseAuthModal());
  };

  return (
    <>
      <AuthModalContainer
        className={cn("modal", {
          "fade show": !!showAuthModal,
        })}
        $isShow={!!showAuthModal}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={_onCloseModal}>
                <span>
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab" style={{ position: "relative" }}>
                  <ul className="nav nav-pills nav-fill nav-border-anim">
                    <li className="nav-item">
                      <div
                        className={cn("nav-link", {
                          active: showAuthModal === MODAL_TYPES.LOGIN,
                        })}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => _onTabChange(e, MODAL_TYPES.LOGIN)}
                      >
                        Sign In
                      </div>
                    </li>
                    <li className="nav-item">
                      <div
                        className={cn("nav-link", {
                          active: showAuthModal === MODAL_TYPES.REGISTER,
                        })}
                        style={{ cursor: "pointer" }}
                        onClick={(e) => _onTabChange(e, MODAL_TYPES.REGISTER)}
                      >
                        Register
                      </div>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div className="tab-pane fade show active">
                      {showAuthModal === MODAL_TYPES.LOGIN && <LoginForm />}
                      {showAuthModal === MODAL_TYPES.REGISTER && (
                        <RegisterForm />
                      )}
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
        {/* Overlay Modal */}
        {!!showAuthModal && (
          <div
            style={{ zIndex: -1 }}
            className={cn("modal-backdrop", { "fade show": !!showAuthModal })}
            onClick={_onCloseModal}
          />
        )}
      </AuthModalContainer>
    </>
  );
};

export default AuthModal;
