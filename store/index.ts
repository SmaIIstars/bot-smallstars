import _ from "lodash";
const { defaults } = _;

type BotInfo = {
  qq: number;
  nickname: string;
};

type Store = {
  botInfo: BotInfo;
};

let store: Store = {
  botInfo: {
    qq: 0,
    nickname: "",
  },
};

export const getStore = () => {
  return store;
};

export const changeStore = (s: Partial<Store>) => {
  store = defaults(s, store);
  return store;
};

const useStore = () => {
  return [getStore, changeStore] as [() => Store, (s: Partial<Store>) => Store];
};

export default useStore;
