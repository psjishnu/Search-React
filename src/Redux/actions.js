import { fireRequest } from "./fireRequest";

export const getConfirmed = () => {
  return fireRequest("getConfirmed");
};

export const getDeaths = () => {
  return fireRequest("getDeaths");
};

export const getRecovered = () => {
  return fireRequest("getRecovered");
};
