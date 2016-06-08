import * as React from 'react';
import * as ReactDom from 'react-dom';
import 'purecss';
import { FRAME_IN_SECOND } from '../reducers.ts';
import { ON_FRAME_ACTION } from '../actions.ts';

interface IGameProps {
  dispatch?: (action: any) => void;
  t?: (key: string) => any;
  frame?: number;
}

class Game extends React.Component<IGameProps, {}> {
	loopingTimer: number;
	
	constructor(props: any) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		let { dispatch } = this.props;
		this.loopingTimer = setInterval(() => dispatch(ON_FRAME_ACTION),
			1000/FRAME_IN_SECOND);
	}

	componentWillUnmount() {
		clearInterval(this.loopingTimer);
	}

	render () {
		let res = this.props.t("lang");
		return (
			<div>
				<div className="pure-g">
				    <div className="pure-u-1-3"><ul></ul></div>
				    <div className="pure-u-1-3">{"Current lang: " + res}</div>
				    <div className="pure-u-1-3">{this.props.frame}</div>
				</div>
			</div>
		);
	}
}

import { translate } from 'react-i18next';
let TranslatedGame = translate()(Game);

const mapStateToProps = (state: any) => {
	return {
		frame: state.time.get('gameTime') as number
	}
};
import { connect } from 'react-redux';
export default connect(mapStateToProps)(TranslatedGame);
