import axios from "axios";
import { addBooking,setBookingDetails,setBookings } from "./booking-slice";
const BASE_URL = "https://traveler-heaven-backkend.onrender.com";
export const createBooking =(bookingDate)=>async(dispatch)=>{
    try{
        const response=await axios.post(`${BASE_URL}/api/v1/rent/user/booking/new`,bookingDate);
        dispatch(addBooking(response.data.data.booking));
    } catch(error){
        console.error("Error Creating Booking:",error);
    }

};
export const fetchBookingDetails=(bookingId)=>async(dispatch)=>{
    try{
        const response=await axios.get(`${BASE_URL}/api/v1/rent/user/booking/${bookingId}`);
        dispatch(setBookingDetails(response.data.data))
    }catch(error){
        console.error("Error fetching booking details",error)
    }
};

export const fetchUserBookings=()=> async(dispatch)=>{
    try{
        const response =await axios.get(`${BASE_URL}/api/v1/rent/user/booking`)
        dispatch(setBookings(response.data.data.bookings))
    }catch(error){
        console.error("Error fetching bookings:",error);
    }
}
