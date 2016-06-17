import * as Immutable from 'immutable';
import * as _ from 'lodash';
import i18n from './i18n.ts';
import Tile from './gameObjects//tile.ts';
import Person from './gameObjects/person.ts';
import { FRAME_IN_SECOND, MAP_EDGE_LENGTH } from './constants.ts';

export enum GameState {
	Welcome,
	Playing,
	PauseDialog,
	SaveLoadDialog
}

const gameState = (state = GameState.Welcome, action: any) => {
	switch (action.type) {
		case 'START_GAME':
		return GameState.Playing;

		default:
		return state;
	}
}

const mapCameraOffset = (state = [0, 0], action: any) => {
	switch (action.type) {
		case 'OFFSET_CAMERA':
		return action.point;

		case 'KEY_PRESSED':
		return state;

		default:
		return state;
	}
}

const selectedTilePos = (state: [number, number], action: any) => {

}

const tiles = (state: Tile[][] = [], action: any) => {
	switch (action.type) {
		case 'START_GAME':
		return Tile.createWorld(MAP_EDGE_LENGTH);

		default:
		return state;
	}
}

const msgs = (state: string[] = [], action: any) => {
	switch (action.type) {
		case 'START_GAME':
		return [];

		default:
		return state;
	}
}

const person = (state: Person[] = [], action: any) => {
	switch (action.type) {
		case 'START_GAME':
		// let heroName = prompt(i18n.t('asking.hreoName'));
		return state;

		default:
		return state;
	}
}

const time = (state = 0, action: any) => {
	switch (action.type) {
		case 'ON_FRAME':
		return state + 1000 / FRAME_IN_SECOND;

		case 'START_GAME':
		return 0;

		default:
		return state;
	}
}

import { combineReducers } from 'redux';
const reducer = combineReducers({ gameState, mapCameraOffset, tiles, msgs, person, time });
export default reducer;
