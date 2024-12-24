import axios from "axios";
import { propertyAction } from "./property-slice";
const BASE_URL = "https://traveler-heaven-backkend.onrender.com";
//action creator to fetch  property 
export const getAllProperties=()=>async(dispatch,getState)=>{
    try{
        dispatch(propertyAction.getRequest())

        const {searchParams}=getState().properties
        const response=await axios.get(`${BASE_URL}/api/v1/rent/listing`,{
            params:{...searchParams},
        });

        if(!response){
            throw new Error("could not fetch any properties")
        }
        const {data}=response;
        dispatch(propertyAction.getProperties(data));
    }
    catch(error){
        dispatch(propertyAction.getErrors(error.message));
    }
} 
