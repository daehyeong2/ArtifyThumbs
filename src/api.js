import axiosInstance from "./axiosInstance";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getOrders() {
  return axiosInstance.get(`${BACKEND_URL}/orders/getAll`);
}
export function getInquiries() {
  return axiosInstance.get(`${BACKEND_URL}/inquiry/getAll`);
}
export function getInquiry(inquiryId) {
  return axiosInstance.post(`${BACKEND_URL}/inquiry/get`, {
    inquiryId,
  });
}
