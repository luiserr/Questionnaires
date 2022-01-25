
// reducerHook.js
export const reducer = (state, action) => {
    switch (action.type) {
        case 'init': return  action.data;
        case 'add': return  [...state, action.data];
        case 'update':
               let data = [...state];
               let newData = action.data.newData;
               let index = data.findIndex(item => item[action.data.key] === newData[action.data.key]);
               data[index] = newData;
               return data;
        case 'updatebyid':
               let _data = [...state];
               let dataupdate = action.data.newData;
                  _data[action.data.key] = dataupdate;
               return _data;
        default: throw new Error('Unexpected action');
    }
};
