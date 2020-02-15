import { Pixel, Component } from 'chleb';
import store from '../store';

const [state, setState, subscribe] = store;

export default class Counter extends Component {
    constructor() {
        super();
        subscribe(() => this.renderComponent());
    }

    render() {
        return (
            <h1>{String(state.counter)}</h1>
        );
    }
}