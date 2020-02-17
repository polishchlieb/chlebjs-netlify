import { Pixel, Component } from 'chleb';
import store from '../store';

const [state, setState] = store;

export default class Button extends Component {
    render() {
        return (
            <button onclick={this.increment}>clicc me</button>
        );
    }

    increment() {
        setState({
            counter: state.counter + 1,
            visible: state.counter < 10
        });
    }
}