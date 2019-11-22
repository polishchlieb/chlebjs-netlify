import { Bread, Component } from '@chlebjs/core';
import { evaluate } from 'mathjs';

class Example extends Component {
    data = {
        value: '',
        scope: {}
    };

    render() {
        return (
            <div>
                <input type="text" onkeypress={this.keypress}></input>
                <h1>{this.value}</h1>
            </div>
        );
    }

    keypress(e) {
        if (e.keyCode === 13)
            this.value = evaluate(e.target.value, this.scope);
    }
}

const app = new Bread({ app: Example });
app.render(document.querySelector('#root'));