import * as Immutable from 'immutable';
import * as _ from 'lodash';
import i18n from './i18n.ts';

export const FRAME_IN_SECOND = 1;

export const MapEnum = {
	Flatland: 1,
	Forest: 10,
}

export const LocationTypeEnum = {
	Area: 1,
	House: 2,
	Well: 3,
	Inn: 4,
	Market: 5,
	Field: 6,
	Orchard: 7,
	Pasture: 8,
}

const worldInitState = Immutable.Map({
	UILocationId: 0,
	LocationTree: {},
	PersonList: [],
});

export const world = (state = worldInitState, action: any) => {
	switch (action.type) {
		case 'START_GAME':
		let heroName = prompt(i18n.t('asking.hreoName'));
		return state;

		default:
		return state;
	}
}

const timeInitState = Immutable.fromJS({
	gameTime: 0,
});

export const time = (state = timeInitState, action: any) => {
	switch (action.type) {
		case 'ON_FRAME':
		return state.set('gameTime', state.get('gameTime') + 1000/FRAME_IN_SECOND);

		case 'START_GAME':
		return state.set('gameTime', 0);

		default:
		return state;
	}
}

const boardInitState = Immutable.Map({
	msgs: []
});

export const board = (state = timeInitState, action: any) => {
	switch (action.type) {
		case 'START_GAME':
		return state.set('msgs', Immutable.List());

		default:
		return state;
	}
}

import { combineReducers } from 'redux';
const reducer = combineReducers({ world, time, board });
export default reducer;
