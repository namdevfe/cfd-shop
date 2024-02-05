import { customerService } from "@/services/customerService";
import tokenMethod from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { handleGetCart } from "./cartReducer";

const initialState = {
  showAuthModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
    wishList: false,
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

    // Handle Add To Wishlist
    builder.addCase(handleAddWishList.pending, (state) => {
      state.loading.wishList = true;
    });
    builder.addCase(handleAddWishList.fulfilled, (state) => {
      state.loading.wishList = false;
    });
    builder.addCase(handleAddWishList.rejected, (state) => {
      state.loading.wishList = false;
    });

    // Handle Remove In Wishlist
    builder.addCase(handleRemoveInWishList.pending, (state) => {
      state.loading.wishList = true;
    });
    builder.addCase(handleRemoveInWishList.fulfilled, (state) => {
      state.loading.wishList = false;
    });
    builder.addCase(handleRemoveInWishList.rejected, (state) => {
      state.loading.wishList = false;
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
        // Handle get cart
        thunkAPI.dispatch(handleGetCart());

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

// Handle add wishlist
export const handleAddWishList = createAsyncThunk(
  "auth/handleAddWishList",
  async (actionPayload, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        const { profile } = thunkApi.getState()?.auth || {};
        const { whiteList } = profile || {};

        let payload = {};
        if (whiteList?.length > 0) {
          const matchIndex = whiteList?.findIndex(
            (item) => item?.id === actionPayload
          );
          if (matchIndex > -1) {
            message.error("Product is already in wishlist");
            return;
          } else {
            payload = { product: actionPayload };
          }
        } else {
          payload = { product: actionPayload };
        }
        const res = await customerService.addProductToWishList(payload);
        if (res?.data?.data) {
          message.success("Add to wishlist successfully");
          thunkApi.dispatch(handleGetProfile());
        }
        return res?.data?.data;
      } catch (error) {
        message.error(error?.response?.data);
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);

// Handle remove wishlist
export const handleRemoveInWishList = createAsyncThunk(
  "auth/handleRemoveInWishList",
  async (actionPayload, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        const payload = {
          product: actionPayload,
        };
        const res = await customerService.deleteProductInWishList(payload);
        if (res?.data?.data) {
          message.success("Remove product in wishlist successfully");
          thunkApi.dispatch(handleGetProfile());
          return res?.data?.data;
        }
      } catch (error) {
        message.error("Remove product in wishlist failed");
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);
