const initialState = [
    {
        desc: "Cash",
        amount: 500
    },
    {
        desc: "Book",
        amount: -50
    },
    {
        desc: "Camera",
        amount: -300
    }
]

const TransReducer = ((state, action) => {
    switch (action.type) {
        case "ADD":
            return (
                [action.payload, ...state]
            )
        case "DELETE":
            console.log(action.payload.index)
            return (
                state.filter((item, index) =>
                    index !== action.payload.index
                )
            )
        default:
            return state
    }
})

let obj = {
    reducer: TransReducer,
    initialState
}

export default obj