import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    repos:[],
    loading:false
};

const reposSlice = createSlice({
    name:'repos',
    initialState,
    reducers: {
        fetchReposLoading: (state)=>{
            return {
                repos:[...state.repos],
                loading: true
            };
        },
        fetchReposSuccess: (state,actions)=>{
          return {
            repos:[...actions.payload],
            loading:false
          }
        },
        fetchReposRequest: (state)=>{
        return {
            ...state
         }
        }
    }
})
export const {fetchReposLoading,fetchReposSuccess,fetchReposRequest} = reposSlice.actions;
export default reposSlice.reducer;

