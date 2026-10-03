export interface SceneStoreState {
  scrollProgress: number; // 0 to 1
  pointer: { x: number; y: number }; // normalized -1 to 1
  isReducedMotion: boolean;
  isMobile: boolean;
  isTabVisible: boolean;
  hoveredChip: string | null;
}

export const sceneStore: SceneStoreState = {
  scrollProgress: 0,
  pointer: { x: 0, y: 0 },
  isReducedMotion: false,
  isMobile: false,
  isTabVisible: true,
  hoveredChip: null,
};
