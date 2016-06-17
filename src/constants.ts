const APPROXIMATE_PX_PER_TILE = 30;

let cameraSize = Math.floor(Math.min(window.innerHeight, window.innerWidth) / APPROXIMATE_PX_PER_TILE);

export const CAMERA_SIZE = cameraSize % 2 === 0 ? cameraSize - 1 : cameraSize;

export const FINAL_TILE_EDGE_LENGTH_UNIT = window.innerHeight < window.innerWidth ? 'vh' : 'vw';
export const FINAL_TILE_EDGE_LENGTH = (100 / CAMERA_SIZE) + FINAL_TILE_EDGE_LENGTH_UNIT;

export const MAP_EDGE_LENGTH = 33; // 2^n + 1

export const FRAME_IN_SECOND = 1;
