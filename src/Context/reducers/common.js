export function common(state, action) {
    switch (action.type) {
        case "SET_CONNECTION_STATUS":
            return { ...state, connectionStatus: action.payload};
        case "SET_TODO_ITEMS":
            console.log(action);
            return { ...state, todoItems: action.payload};
        default:
            return state;
    }
}
