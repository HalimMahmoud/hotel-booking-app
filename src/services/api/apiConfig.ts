export const baseURL = "https://upskilling-egypt.com:3000/api/v0";
export const imageURL = "https://upskilling-egypt.com:3000/";

export const users_endpoints = {
  LOGIN: `/portal/users/login`,
  REGISTER: `/portal/users`,
  VERIFY: `/Users/Verify`,
  RESET_REQUEST: `/Users/Reset/Request`,
  restPassword: `portal/users/reset-password`,
  GET_USER: `/Users/currentUser/`,
  getUser: (id: number) => `/Users/${id}`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  UPDATE_USER: (id: number) => `/Users/${id}`,
  forgetPass: "portal/users/forgot-password",
  RESET: `/Users/Reset`,
  // GET_USER: (id: string) => `/admin/users/${id}`,
  // CHANGE_PASSWORD: `/Users/ChangePassword`,
};

export const facilities_endpoints = {
  GET_ALL_FACILITIES: `/admin/room-facilities`,
  UPDATE_FACILITY: (id: string) => `/admin/room-facilities/${id}`,
  DELETE_FACILITY: (id: string) => `/admin/room-facilities/${id}`,
  ADD_FACILITY: `/admin/room-facilities`,
};
