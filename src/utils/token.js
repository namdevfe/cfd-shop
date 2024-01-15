import { STORAGE } from "@/constants/storage";
import Cookies from "js-cookie";

export const localToken = {
  set: (token) => localStorage.setItem(STORAGE.token, JSON.stringify(token)),
  get: () => JSON.parse(localStorage.getItem(STORAGE.token)),
  remove: () => localStorage.removeItem(STORAGE.token),
};

export const cookieToken = {
  set: (token) => Cookies.set(STORAGE.token, JSON.stringify(token)),
  get: () =>
    JSON.parse(
      Cookies.get(STORAGE.token) === undefined
        ? null
        : Cookies.get(STORAGE.token)
    ),
  remove: () => Cookies.remove(STORAGE.token),
};

const tokenMethod = {
  set: (token) => {
    // return localToken.set(token)
    return cookieToken.set(token);
  },
  get: () => {
    // return localToken.get()
    return cookieToken.get();
  },
  remove: () => {
    // return localToken.remove()
    return cookieToken.remove();
  },
};

export default tokenMethod;
