export function common(state, action) {
    switch (action.type) {
        case "SET_CONNECTION_STATUS":
            return { ...state, connectionStatus: action.payload};
        default:
            return state;
    }
}
