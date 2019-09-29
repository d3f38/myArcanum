const SEARCH_FILE = 'SEARCH_FILE';
const SET_VISIBILITY_FILE = 'SET_VISIBILITY_FILE';
const INPUT_SEARCH = 'INPUT_SEARCH';

/*
 * генераторы действий
 */

const initState = {
    "inputSearch": '',
    "visibleFiles": {
        "api": true,
        "ci": true,
        "contrib": true,
        "http": true,
        "lib": true,
        "local": true,
        "packages": true,
        "robots": true,
        "server": true,
        "ut": true,
        "README.md": true,
        "ya.make": true
    }
}

function searchFile(name) {
    return {
        type: SEARCH_FILE,
        file: name
    }
}

class Store {
    constructor(reducer, state) {
        this._reducer = reducer;
        this._state = state ? state : [];
        this._listeners = [];
        this.dispatch
    }

    getState() {
        return this._state;
    }

    subscribe(cb) {
        this._listeners.push(cb);
        return () => {
            const index = this._listeners.indexOf(cb);
            this._listeners.splice(index, 1);
        }
    }

    dispatch(action) {
        this._state = this.search(this._state, action);
        this._notifyListeners();
    }

    _notifyListeners() {
        this._listeners.forEach(listener => {
            listener(this._state)
        })
    }

    search(state = [], action) {
        switch (action.type) {
            case SEARCH_FILE:
                if (state.inputSearch && state.inputSearch === action.file) {
                    return state;
                } else {
                    const reg = new RegExp(`^${action.file}`);

                    for (const key in state.visibleFiles) {
                        state.visibleFiles[key] = (key.match(reg)) ? true : false;
                    }

                    return {
                        ...state,
                        inputSearch: action.file
                    }
                }
            default:
                return state;
        }
    }
}

class View {
    constructor(el, store) {
        this._el = el;
        this._store = store;
        this.unsubscribe = store.subscribe(
            this._prepareRender.bind(this)
        );
        this._prepareRender(store.getState());
    }

    _prepareRender(state) {

        this.render(state);

    }

    render(state) {
        const fileBlocks = [].slice.call(this._el);

        fileBlocks.forEach(element => {
            const fileName = element.querySelector('.directory-content-details__name').textContent.trim();
            const currentState = this._store.getState();

            if (!currentState.visibleFiles[fileName]) {
                element.style.display = 'none';
            } else {
                element.style.display = 'flex';
            }
        });
    }

}


const files = document.querySelectorAll('.directory-content-details__item');


let store = new Store(search, initState);
let view = new View(files, store);

document.querySelector('.search__button').addEventListener('click', () => {
    const searchValue = document.querySelector('#search-input').value;
    store.dispatch(searchFile(searchValue))
    view.render();

})