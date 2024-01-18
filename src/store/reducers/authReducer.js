import { customerService } from "@/services/customerService";
import tokenMethod from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  showAuthModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleShowAuthModal(state, action) {
      state.showAuthModal = action.payload;
    },
    handleCloseAuthModal(state) {
      state.showAuthModal = "";
    },
    handleLogout(state) {
      tokenMethod.remove();
      state.profile = null;
      state.showAuthModal = "";
      message.success("Account is logged out!");
    },
  },
  extraReducers: (builder) => {
    // Handle get profile
    builder.addCase(handleGetProfile.pending, (state) => {
      state.loading.getProfile = true;
    });
    builder.addCase(handleGetProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loading.getProfile = false;
    });
    builder.addCase(handleGetProfile.rejected, (state) => {
      state.loading.getProfile = false;
    });

    // Handle login
    builder.addCase(handleLogin.pending, (state) => {
      state.loading.login = true;
    });
    builder.addCase(handleLogin.fulfilled, (state) => {
      state.loading.login = false;
      state.showAuthModal = "";
    });
    builder.addCase(handleLogin.rejected, (state) => {
      state.loading.login = false;
    });

    // Handle register
    builder.addCase(handleRegister.pending, (state) => {
      state.loading.register = true;
    });
    builder.addCase(handleRegister.fulfilled, (state) => {
      state.loading.register = false;
    });
    builder.addCase(handleRegister.rejected, (state) => {
      state.loading.register = false;
    });
  },
});

const { reducer: authReducer, actions } = authSlice;
export const { handleShowAuthModal, handleCloseAuthModal, handleLogout } =
  actions;
export default authReducer;

// Handle get profile
export const handleGetProfile = createAsyncThunk(
  "auth/handleGetProfile",
  async (_, thunkAPI) => {
    if (!!tokenMethod.get()) {
      try {
        const res = await customerService.getProfile();
        return res?.data?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

// Handle login
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, thunkAPI) => {
    try {
      const res = await customerService.login(payload);
      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};

        // Save token to client storage
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // Handle get profile
        thunkAPI.dispatch(handleGetProfile());

        // Notify
        message.success("Logged in successfully!");
        return true;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Not Found") {
        message.error("Username or password is not correct!");
      }
      return thunkAPI.rejectWithValue(errorInfo);
    }
  }
);

// Handle register
export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (payload, thunkAPI) => {
    try {
      const res = await customerService.register(payload);
      if (res?.data?.data?.id) {
        // Notify
        message.success("Register success!");

        // Handle login
        thunkAPI.dispatch(
          handleLogin({ email: payload?.email, password: payload?.password })
        );

        return true;
      }
    } catch (error) {
      console.log("error", error);
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("This email has been registered!");
      }
      return thunkAPI.rejectWithValue(errorInfo);
    }
  }
);
