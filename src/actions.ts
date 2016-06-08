
export const ON_FRAME_ACTION = {
	type: 'ON_FRAME'
};

export const START_GAME_ACTION = {
	type: 'START_GAME'
};

export const appendMsg = (msg: string) => {
    return {
        type: "APPEND_MSG",
        msg
    };
};