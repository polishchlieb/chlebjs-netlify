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
            <div>
                {state.visible && <h1>{String(state.counter)}</h1>}
            </div>
        );
    }
}