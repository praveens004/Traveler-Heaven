import {createSlice} from"@reduxjs/toolkit";


const propertySlice=createSlice({
    //slice  name
    name:"property",
    //Initial state for the property slice

    initialState:{
        properties:[],//hold the property what we are fetching from backend
        totalProperties:0,
        searchParams:{},//parameter used to search
        error:null,//error state
        loading:false,//loading state for the property
    },
    //reducers functions to  handle different functions
    reducers:{
        getRequest(state){
            state.loading=true;
        },
        //action to update properties state with fetch data 
        getProperties(state,action){
            state.properties=action.payload.data;
            state.totalProperties=action.payload.all_properties;
            state.loading=false;
        },
        //action to update search parameter
        updateSearchParams:(state,action)=>{
            state.searchParams=Object.keys(action.payload).length===0?{}:{
                ...state.searchParams,
                ...action.payload,
            };
        },
        //action to update error state 
        getErrors(state,action){
            state.error=action.payload;
        },

    },
});
//extrcting action created from our property slice
export const propertyAction=propertySlice.actions;
export default propertySlice;