import { CookieService } from "Utils/cookieService";

export const setToStorage = (key, value) => {
  CookieService.set(key, value);
}

export const getFromStorage = (key) => {
  return CookieService.get(key);
}
