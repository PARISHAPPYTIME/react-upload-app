import { ACTION_TYPE } from './action'

const initialState = {
    count: 0,
    username: ''
}

const reducer = (state = initialState, action = {}) => {
    const { type, payload } = action
    switch (type) {
        case ACTION_TYPE.ADD_COUNT:
            return Object.assign({}, state, {
                count: 123
            });
        case ACTION_TYPE.SET_USERNAME:
            return Object.assign({}, state, {
                username: payload
            });
        default:
            return initialState
    }
}

export default reducer
