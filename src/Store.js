import { configureStore } from "@reduxjs/toolkit";
import fetchSlice from "./Slice/Slice"
import podSlice from "./Slice/PodcastSlice";

const store = configureStore(
    {
        reducer:{
            user:fetchSlice,
            podcasts:podSlice
        }
    }
)

export default store