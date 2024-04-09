export function getUser() {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get`, {
    credentials: "include",
  }).then((res) => res.json());
}
export function getOrder(id) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
    credentials: "include",
  }).then((res) => res.json());
}
export function getOrders() {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/getAll`, {
    credentials: "include",
  }).then((res) => res.json());
}
export function getInquiries() {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/getAll`, {
    credentials: "include",
  }).then((res) => res.json());
}
export function getInquiry(inquiryId) {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inquiryId,
    }),
    credentials: "include",
  }).then((res) => res.json());
}
