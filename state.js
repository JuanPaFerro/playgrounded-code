import create from "zustand/vanilla";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const initialState = getLocalStorage("initialState") || {
  fontSize: 14,
  lineNumbers: "on",
  minimap: false,
  theme: "vs-dark",
  wordWrap: "on",
};

const useStore = create((set) => ({
  ...initialState,
  updateSettings: ({ key, value }) => {
    set((state) => {
      setLocalStorage("initialState", {
        ...state,
        [key]: value,
      });
      return {
        [key]: value,
      };
    });
  },
}));

export const { getState, setState, subscribe, destroy } = useStore;
