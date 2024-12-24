import axios from "axios"
import { accomodationActions } from "./Accomodation-slice";
const BASE_URL = "https://traveler-heaven-backkend.onrender.com";
export const createAccomodation=(accomodationData)=>async(dispatch)=>{
    try{
        dispatch(accomodationActions.getAccomodationRequest());
        const response=await axios.post(`${BASE_URL}/api/v1/rent/user/newAccommodation`,accomodationData)
        if(!response){
            throw Error("could not get any accomodation")
        }
    }catch(error){
        dispatch(accomodationActions.getErrors(error.response.data.message));
    }
};

export const getAllAccomodation=()=>async(dispatch)=>{
    try{
        dispatch(accomodationActions.getAccomodationRequest());
        const {data}=await axios.get(`${BASE_URL}/api/v1/rent/user/myAccommodation`);
        const accom=data.data;
        dispatch(accomodationActions.getAccomodation(accom));
    }catch(error){
        dispatch(accomodationActions.getErrors(error.response.data.message));
    }
}
