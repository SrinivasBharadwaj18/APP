import { createSlice , PayloadAction} from "@reduxjs/toolkit";

export interface tokenState{
    token: string
}

const initialState: tokenState ={
    token: "",
}

export const tokenSlice = createSlice({
    name: 'tokenizer',
    initialState,
    reducers:{

        setToken: (state, action: PayloadAction<{ value: string }>) =>{

            state.token = action.payload.value
            console.log(state.token)

        }
    }
})

export const {setToken} = tokenSlice.actions
export default tokenSlice.reducer