import { Bread, Component } from 'chleb';

class Example extends Component {
    data = {
        style: {}
    };

    render() {
        return (
            <div>
                <button onclick={this.randomize} style={this.style} class="buttong">klik</button>
            </div>
        );
    }

    randomize() {
        this.style = {
            left: `${Math.floor(Math.random() * (window.innerWidth - 300))}px`,
            top: `${Math.floor(Math.random() * (window.innerHeight - 100))}px`
        };
    }

    ready = this.randomize;
}

const app = new Bread({ app: Example });
app.render(document.querySelector('#root'));