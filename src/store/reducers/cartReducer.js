import { cartService } from "@/services/cartService";
import tokenMethod from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleShowAuthModal } from "./authReducer";
import { MODAL_TYPES } from "@/constants/general";
import { message } from "antd";
import { sumArrayNumber } from "@/utils/calculate";

// Init State
const initialState = {
  cartInfo: {},
  cartLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(handleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
    });
    builder.addCase(handleGetCart.rejected, (state) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });

    // ADD CART
    builder.addCase(handleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleAddCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleAddCart.rejected, (state) => {
      state.cartLoading = false;
    });

    // REMOVE CART
    builder.addCase(handleRemoveFromCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleRemoveFromCart.fulfilled, (state) => {
      state.cartLoading = false;
    });
    builder.addCase(handleRemoveFromCart.rejected, (state) => {
      state.cartLoading = false;
    });
  },
});

const { reducer: cartReducer, actions } = cartSlice;
export const { clearCart } = actions;
export default cartReducer;

// Async Actions

// Handle Get Cart
export const handleGetCart = createAsyncThunk(
  "cart/handleGetCart",
  async (_, thunkAPI) => {
    if (!!tokenMethod.get()) {
      try {
        const cartRes = await cartService.getCart();
        if (cartRes?.data?.data) {
          return thunkAPI.fulfillWithValue(cartRes.data.data);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

// Handle Add To Cart
export const handleAddCart = createAsyncThunk(
  "cart/handleAddCart",
  async (payload, thunkAPI) => {
    // Logged in
    if (!!tokenMethod.get()) {
      try {
        const { cartInfo } = thunkAPI.getState()?.cart || {};
        const { addedId, addedColor, addedQuantity, addedPrice } =
          payload || {};

        let addPayload = {};

        if (cartInfo.id) {
          // Case 1: Already have product in the cart
          const matchIndex = cartInfo.product?.findIndex(
            (product) => product.id === addedId
          );

          const newProduct = cartInfo.product?.map((product) => product.id);
          const newVariant = [...(cartInfo.variant ?? [])];
          const newQuantity = [...(cartInfo.quantity ?? [])];
          const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

          if (matchIndex > -1 && newVariant[matchIndex] === addedColor) {
            // Case 2: Duplicate product id and duplicate variant
            newQuantity[matchIndex] =
              Number(newQuantity[matchIndex]) + Number(addedQuantity);

            newTotalProduct[matchIndex] =
              Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity;
          } else {
            // Case 3: Duplicate product id but different variant
            newProduct.push(addedId);
            newVariant.push(addedColor);
            newQuantity.push(addedQuantity);
            newTotalProduct.push(addedPrice * addedQuantity);
          }

          const newSubTotal =
            newTotalProduct.reduce((curr, next) => {
              return Number(curr) + Number(next);
            }, 0) || 0;

          const newTotal = newSubTotal - cartInfo.discount;

          addPayload = {
            ...cartInfo,
            product: newProduct,
            variant: newVariant,
            quantity: newQuantity,
            totalProduct: newTotalProduct,
            subTotal: newSubTotal,
            total: newTotal,
          };
        } else {
          // Case 4: Empty cart
          addPayload = {
            product: [addedId],
            variant: [addedColor],
            quantity: [addedQuantity],
            price: addedPrice,
            totalProduct: [addedPrice * addedQuantity],
            subTotal: addedPrice * addedQuantity,
            total: addedPrice * addedQuantity,
            discount: 0,
            paymentMethod: "",
          };
        }

        // Call API
        const cartRes = await cartService.updateCart(addPayload);
        if (cartRes?.data?.data?.id) {
          thunkAPI.dispatch(handleGetCart());
          message.success("Add to cart successfully!");
          return cartRes.data.data;
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }

    // Not login
    else {
      message.info("Please login to continue shopping!");
      thunkAPI.dispatch(handleShowAuthModal(MODAL_TYPES.LOGIN));
    }
  }
);

// Handle Remove Product From Cart
export const handleRemoveFromCart = createAsyncThunk(
  "cart/handleRemoveFromCart",
  async (payload, thunkApi) => {
    const { removedIndex } = payload || {};
    const { getState, rejectWithValue, dispatch } = thunkApi;
    const { cartInfo } = getState()?.cart || {};

    // Check removedIndex invalid
    if (removedIndex < 0) return false;

    try {
      const newProduct = cartInfo.product
        ?.filter((_, index) => index !== removedIndex)
        .map((item) => item.id);
      const newVariant = cartInfo.variant?.filter(
        (_, index) => index !== removedIndex
      );
      const newQuantity = cartInfo.quantity?.filter(
        (_, index) => index !== removedIndex
      );
      const newTotalProduct = cartInfo.totalProduct?.filter(
        (_, index) => index !== removedIndex
      );

      // Recalc TOTAL & SUBTOTAL
      const newSubTotal = sumArrayNumber(newTotalProduct);
      const newTotal =
        newSubTotal -
        (cartInfo.discount ?? 0) +
        (cartInfo.shipping?.price ?? 0);

      const updatePayload = {
        ...cartInfo,
        product: newProduct,
        variant: newVariant,
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
        discount: newProduct?.length > 0 ? cartInfo.discount : 0,
        shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
      };

      const cartRes = await cartService.updateCart(updatePayload);
      if (cartRes?.data?.data) {
        dispatch(handleGetCart());
        message.success("Remove from cart successfully");
        return cartRes.data.data;
      }
    } catch (error) {
      rejectWithValue(error?.response?.data);
      message.error("Remove from cart failedd");
      console.log("🚀error---->", error);
    }
  }
);
