
export const ON_FRAME_ACTION = {
    type: 'ON_FRAME'
};

export const START_GAME_ACTION = {
    type: 'START_GAME'
};

import { CAMERA_SIZE, MAP_EDGE_LENGTH } from './constants.ts';
export const lookAt = (lookAtX: number, lookAtY: number) => {
    return (dispatch: (action: any) => void, getState: () => any) => {
        let { mapCameraOffset, tiles } = getState(),
            [x, y] = mapCameraOffset,
            distance = Math.floor(CAMERA_SIZE / 2),
            oX = lookAtX - distance,
            oY = lookAtY - distance,
            cX = Math.min(MAP_EDGE_LENGTH - CAMERA_SIZE, Math.max(0, oX)),
            cY = Math.min(MAP_EDGE_LENGTH - CAMERA_SIZE, Math.max(0, oY));
        if (cX != x || cY != y) {
            dispatch({
                type: "OFFSET_CAMERA",
                point: [cX, cY]
            });
        }
    };
};

export const onKeyPressed = (key: string) => {
    return {
        type: "KEY_PRESSED",
        key
    };
};

export const appendMsg = (msg: string) => {
    return {
        type: "APPEND_MSG",
        msg
    };
};