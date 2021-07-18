export const ACTION_TYPE = {
    ADD_COUNT: 'ADD_COUNT',
    SET_USERNAME: 'SET_USERNAME'
}

export const addCount = (text) => ({
    type: ACTION_TYPE.ADD_COUNT,
    text
})

export const setUserName = (text) => {
    console.log('text', text)
    return {
        type: ACTION_TYPE.SET_USERNAME,
        payload: text
    }
}