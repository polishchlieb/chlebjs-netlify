import { Pixel, Component } from 'chleb';
import Counter from './Counter';
import Button from './Button';

export default class App extends Component {
    render() {
        return (
            <div>
                <Counter/>
                <Button/>
            </div>
        );
    }
}