import axios from "axios";
import{propertyDetailsAction} from "./propertyDetails-slice";
import { prepareAutoBatched } from "@reduxjs/toolkit";
const BASE_URL = "https://traveler-heaven-backkend.onrender.com";
export const getPropertyDetails=(id)=>async(dispatch)=>{
    try{
        dispatch(propertyDetailsAction.getListRequest())
        const response=await axios(`${BASE_URL}/api/v1/rent/listing/${id}`);
        if(!response){
            throw new Error("could not fetch any property details")
        }
        const {data}=response.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data));
    }catch(error){
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))

    }
}
