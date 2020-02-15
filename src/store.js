import { Store } from 'chleb';

const store = new Store({
    counter: 0
});

export default [
    store.state,
    (s) => store.setState(s),
    (l) => store.subscribe(l)
];