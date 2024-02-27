import { createSlice } from "@reduxjs/toolkit";

const initial = {
    data:[]
}

const podSlice= createSlice({
    name:"podcasts",
    initialState:initial,
    reducers:{
        addPodcasts(state, action){
            state.data= action.payload
        }
    }
})

export const {addPodcasts} = podSlice.actions
export default podSlice.reducer