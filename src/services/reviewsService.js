import axiosInstance from "@/utils/axiosInstance";

export const reviewsService = {
  getReviewsByProductId(id = "") {
    return axiosInstance.get(`/reviews/product/${id}`);
  },
  review(payload = {}) {
    return axiosInstance.post("/reviews", payload);
  },
};
