export function common(state, action) {
    switch (action.type) {
        case "SET_CONNECTION_STATUS":
            return { ...state, connectionStatus: action.payload};
        case "SET_TODO_ITEM_COUNT":
            console.log(action);
            return { ...state, todoCount: action.payload};
        default:
            return state;
    }
}
