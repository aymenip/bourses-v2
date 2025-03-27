import { TPosition } from "@/types/positions";
import { create } from "zustand";

interface PositionState {
  positions: TPosition[];
  setPositions: (positions: TPosition[]) => void;
}

export const usePositionStore = create<PositionState>((set) => ({
  positions: [],
  setPositions: (positions) => set({ positions: positions }),
}));
