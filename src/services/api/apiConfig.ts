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
export const Ads_endpoints = {
  GET_ALL_Ads: `/admin/ads`,
  GET_Add_details: (id: string | number) => `/portal/ads/${id}`,
  EditOnAdd: (id: string) => `/admin/ads/${id}`,
  deleteAdd: (id: string) => `/admin/ads/${id}`,
  addAdd: `/admin/ads`,
  getRoomId: "/admin/rooms?page=1&size=10",
};
export const room_endpoints = {
  GET_ALL_ROOMS: `/admin/rooms`,
  GET_ROOM_BY_ID: (id: string) => `/admin/rooms/${id}`,
  CREATE_ROOM: `/admin/rooms`,
  UPDATE_ROOM: (id: string) => `/admin/rooms/${id}`,
  DELETE_ROOM: (id: string) => `/admin/rooms/${id}`,
};
