import { Bread, Component } from '@chlebjs/core';

class Example extends Component {
    data = {
        style: {}
    };

    render() {
        return (
            <div>
                <button onclick={this.click} style={this.style} class="buttong">klik</button>
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
            left: `${Math.floor(Math.random() * (window.innerWidth - 300))}px`,
            top: `${Math.floor(Math.random() * (window.innerHeight - 100))}px`
        };
    }
}

const app = new Bread({ app: Example });
app.render(document.querySelector('#root'));