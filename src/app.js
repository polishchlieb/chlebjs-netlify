import { Bread, Component } from '@chlebjs/core';

class Example extends Component {
    data = {
        style: {}
    };

    render() {
        return (
            <div>
                <button onclick={this.click} style={this.style}>klik</button>
            </div>
        );
    }

    click() {
        this.randomize();
    }

    ready() {
        this.randomize();
    }

    randomize() {
        this.style = {
            position: 'absolute',
            left: `${Math.floor(Math.random() * window.innerWidth)}px`,
            top: `${Math.floor(Math.random() * window.innerHeight)}px`
        };
    }
}

const app = new Bread({ app: Example });
app.render(document.querySelector('#root'));