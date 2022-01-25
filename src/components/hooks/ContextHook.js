import React, {createContext, useReducer} from 'react';

const initialState = [];
const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {

        switch(action.type) {
            case 'set':
                let found = (state.length === 0 ) ? -1 : (state.findIndex(x => x.id === action.data.id));
                if(found === -1) return  [...state, action.data];
                return state;
                break;
            case 'update':
                let data = [...state];
                let index = data.findIndex(x => x.id === action.data.id);
                data[index] = action.data;
                return data;
                break;
            case 'delete':
                    let state_data = [...state];
                    // let index = data.findIndex(x => x.id === action.data.id);
                    state_data.splice(state_data.findIndex(a => a.id === action.data.id) , 1);
                    // data[index] = action.data;
                    return state_data;
                break;
            default:
            throw new Error();
        };
    }, initialState);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
