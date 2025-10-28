import axios from 'axios';

const API_BASE_URL = 'https://8080-fdecbbdbfdadffecfdcdfaeabfbabbcbebecf.premiumproject.examly.io/api/cookies';

export const addCookie = (cookie) => axios.post(`${API_BASE_URL}/addCookie`, cookie);
export const getAllCookies = () => axios.get(`${API_BASE_URL}/allCookies`);
export const getCookiesByFlavor = (flavor) => axios.get(`${API_BASE_URL}/byFlavor?flavor=${flavor}`);
export const getCookiesSortedByPrice = () => axios.get(`${API_BASE_URL}/sortedByPrice`);
