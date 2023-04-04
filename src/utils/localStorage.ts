import { EventEmitter } from "eventemitter3";
export const localStorageEventEmitter = new EventEmitter();

export enum LocalStorage {
    highScore = "highScore",
  }

export const setToLocalStorage = (name: string, value: string) => {
  localStorage.setItem(name, value);
  localStorageEventEmitter.emit("change");
};
export const deleteFromLocalStorage = (name: string) => {
  localStorage.removeItem(name);
  localStorageEventEmitter.emit("change");
};

export const getFromLocalStorage = (name: string) => {
  return localStorage.getItem(name) || null;
};
