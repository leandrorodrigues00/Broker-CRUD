import { create } from "zustand";

type RehydrateStoreState = {
  rehydrateTrigger: boolean;
  toggleRehydrateTrigger: () => void;
};

const useRehydrateStore = create<RehydrateStoreState>((set) => ({
  rehydrateTrigger: false,
  toggleRehydrateTrigger: () =>
    set((state) => ({ rehydrateTrigger: !state.rehydrateTrigger })),
}));

export default useRehydrateStore;
