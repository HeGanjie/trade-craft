import * as React from 'react';
import * as ReactDom from 'react-dom';
import { GameState } from '../reducers.ts';
import { FRAME_IN_SECOND, CAMERA_SIZE, MAP_EDGE_LENGTH, FINAL_TILE_EDGE_LENGTH } from '../constants.ts';
import { ON_FRAME_ACTION, START_GAME_ACTION, onKeyPressed, lookAt } from '../actions.ts';
import * as ReactModal from 'react-modal';
import Tile, { TileTypeEnum } from '../gameObjects/tile.ts';
import * as keyboardJS from 'keyboardjs';

import '../../styles/game.less';

interface ICommonProps {
	t?: (key: string) => any;
	dispatch?: (act: any) => void;
	onKeyPressed?: (key: string) => void;
}

interface IGameProps {
	time?: number;
	msgs?: string[];
	gameState?: GameState;
	onStartGameBtnClick?: () => void;
	onFrame?: () => void;
	tiles?: Tile[][];
	mapCameraOffset?: [number, number];
	lookAt?: (x: number, y: number) => void;
}

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

interface IGameState {
	mouseEnteredTilePos?: [number, number];
	showGrayLevel?: boolean;
}

class Game extends React.Component<ICommonProps & IGameProps, IGameState> {
	loopingTimer: number;

	constructor(props: any) {
		super(props);
		this.state = {
			mouseEnteredTilePos: [-1, -1],
			showGrayLevel: false
		};
	}

	componentDidMount() {
		this.loopingTimer = setInterval(this.props.onFrame, 1000 / FRAME_IN_SECOND);
		keyboardJS.bind('up', ev => this.props.onKeyPressed('up'));
		keyboardJS.bind('down', ev => this.props.onKeyPressed('down'));
		keyboardJS.bind('left', ev => this.props.onKeyPressed('left'));
		keyboardJS.bind('right', ev => this.props.onKeyPressed('right'));
	}

	componentWillUnmount() {
		clearInterval(this.loopingTimer);
	}

	tileOnClick = (ev: React.MouseEvent) => {
		let el = (ev.currentTarget as HTMLScriptElement),
			x = parseInt(el.getAttribute('data-x')),
			y = parseInt(el.getAttribute('data-y'));
		this.props.lookAt(x, y);
	}

	tileOnMouseEnter = (ev: React.MouseEvent) => {
		let el = (ev.currentTarget as HTMLScriptElement),
			x = parseInt(el.getAttribute('data-x')),
			y = parseInt(el.getAttribute('data-y'));
		this.setState({mouseEnteredTilePos: [x, y]});
	}

	tileOnMouseLeave = (ev: React.MouseEvent) => {
		this.setState({mouseEnteredTilePos: [-1, -1]});
	}

	render() {
		let { msgs, gameState, tiles, onStartGameBtnClick, mapCameraOffset: [coX, coY] } = this.props;
		let { mouseEnteredTilePos: [hX, hY] } = this.state,
			hoverTile = hX == -1 || hY == -1 ? null : tiles[hX][hY];
		let PC_SCREEN = window.innerHeight < window.innerWidth;
		return (
			<div>
				<div className="container-fluid">
					<div className="map" style={{
							width: PC_SCREEN ? '100vh' : '100vw',
							height: PC_SCREEN ? '100vh' : '100vw'
						}}>
						<div className="row">
							{tiles.slice(coX, coX + CAMERA_SIZE).map((col, cx) => col.slice(coY, coY + CAMERA_SIZE)
								.map((t, cy) => <div className="tile"
									style={{
										width: FINAL_TILE_EDGE_LENGTH,
										height: FINAL_TILE_EDGE_LENGTH,
										backgroundColor: this.state.showGrayLevel ? t.getGrayLevelColor() : t.getTileColor(),
									}}
									data-x={coX+cx}
									data-y={coY+cy}
									onClick={this.tileOnClick}
									onMouseEnter={this.tileOnMouseEnter}
									onMouseLeave={this.tileOnMouseLeave}
								>︎
								︎</div>)
							)}
						</div>
					</div>
					<div className="operationPanel">
						<input type='checkbox' checked={this.state.showGrayLevel}
							onClick={ev => this.setState({showGrayLevel: (ev.currentTarget as HTMLInputElement).checked})} />
						{hoverTile == null ? null :
							<ul>
								<li>Pos: {hX},{hY}</li>
								<li>HeightLevel: {hoverTile.altitudePos.toFixed(3)}</li>
								<li>Altitude: {hoverTile.altitude}</li>
								<li>Humidity: {hoverTile.humidity}</li>
								<li>TileType: {TileTypeEnum[hoverTile.getTileType()]}</li>
							</ul>
						}
						<ul>{msgs.map(m => <li>m</li>) }</ul>
					</div>
				</div>
				<ReactModal isOpen={gameState === GameState.Welcome} style={customStyles} >
					<button onClick={onStartGameBtnClick}>Start Game</button>
					<button>Load Game</button>
				</ReactModal>
			</div>
		);
	}
}

import { translate } from 'react-i18next';
let TranslatedGame = translate()(Game);

const mapStateToProps = (state: any) => {
	return {
		gameState: state.gameState as GameState,
		//time: state.time as number,
		msgs: state.msgs as string[],
		tiles: state.tiles as Tile[][],
		mapCameraOffset: state.mapCameraOffset as [number, number]
	}
};

const mapDispatchToProps = (dispatch: (action: any) => void, ownProps?: any) => {
	return {
		onStartGameBtnClick: () => {
			dispatch(START_GAME_ACTION);
		},
		onFrame: () => {
			dispatch(ON_FRAME_ACTION);
		},
		onKeyPressed: (key: string) => dispatch(onKeyPressed(key)),
		lookAt: (x: number, y: number) => dispatch(lookAt(x, y)),
	}
}

import { connect } from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(TranslatedGame);
