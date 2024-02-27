import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState ={
    loading:false,
    data:null,
    error:""
}

const fetchSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        getLoading(state){
            state.loading=true;
            state.data=null
        },
        getData(state, action){
            state.loading=false;
            state.data=action.payload
        },
        getError(state, action){
            state.error=action.payload
        }
    }
})

export const {getLoading, getData, getError} = fetchSlice.actions

// export const func = (searchTerm) => {
//     return async (dispatch)=>{
//         dispatch(getLoading)
//         try {
//             const response = await axios.get(
//               `https://itunes.apple.com/search?media=podcast&term=${searchTerm}&entity=podcast&limit=20`
//             );
//             dispatch(getData((response.data.results)));
//             console.log("data", response.data.results)
//           } catch (error) {
//             dispatch(getError())
//           }
//     }
// }
export default fetchSlice.reducer