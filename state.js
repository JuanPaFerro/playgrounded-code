import create from "zustand/vanilla";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const initialState = getLocalStorage("initialState") || {
  fontSize: 14,
  lineNumbers: "off",
  minimap: false,
  theme: "vs-dark",
};

const useStore = create((set) => ({
  ...initialState,
  updateSettings: ({ setting, newValue }) => {
    set((state) => {
      const { [setting]: removeOldSetting, ...restOfState } = state;
      const newState = {
        ...restOfState,
        [setting]: newValue,
      };
      setLocalStorage(initialState, newState);
      return newState;
    });
  },
}));

export const { getState, setState, subscribe, destroy } = useStore;
