//to remember things and according to that it should update the state dynamicaaly
import React,{useState} from 'react'
import {DatePicker,Space} from "antd"
import{useDispatch} from "react-redux"
import {getAllProperties} from "../../Store/Property/property-action";
import { propertyAction } from '../../Store/Property/property-slice';
import "../../CSS/Home.css"

const Search = () => {
    //datepicker is object and rangepicker is object property
    //destructuring the rangepicker component from datepicker
    //destructuring in js allows you to extract multiple properties from an object
    //<></> fragment, which allows us to create as many div tag
    const {RangePicker}=DatePicker;
    //keyword is what we are typing and setkeyword is the  function to update acc to keyword
    const [keyword,setKeyword]=useState({});
    //storing the data range value
    const[value,setValue]=useState([])
    const  dispatch=useDispatch();
    function searchHandler(e){
        e.preventDefault();
        dispatch(propertyAction.updateSearchParams(keyword));
        dispatch(getAllProperties());
        setKeyword({
            city:"",
            guests:"",
            dateIn:"",
            dateOut:","
        })
        setValue([]);
    }
    function returnDates(date,dateString){
    //setting the date range value in state
    setValue([date[0],date[1]])
        //updating keyword object with date range
        updateKeyword("dateIn", dateString[0]);
        updateKeyword("dateOut",dateString[1]);
    }
    //function to update a specific field in the keyword state object
    const updateKeyword=(field,value)=>{
        setKeyword((prevKeyword)=>({
            ...prevKeyword,
            [field]: value,
        }));
    };
    
  return (
    <>
    <div className='searchbar'>
        {/*input field for searching destinations */}
        <input
        className='search font-size:smaller;'
        id='search_destination'
        placeholder='search destination'
        type='text'
        value={keyword.city}
        onChange={(e) => updateKeyword('city', e.target.value)}
        />
        {/* date range picker*/}
        <Space direction='vertical' size={12} className='search'>
            <RangePicker
            value={value}
            format='YYYY-MM-DD'
            picker='date'
            className='date_picker'
            disabledDate={(current)=>{
                return current&&current.isBefore(Date.now(),"day")
            }}
            onChange={returnDates}
            />

        </Space>
        {/*input field for adding guests */}
        <input
        className='search'
        id='addguest'
        placeholder='Add Guest'
        type='number'
        value={keyword.guests}
        onChange={(e) =>updateKeyword("guests", e.target.value)}
        />
        {/* search icon */}
        <span className="material-symbols-outlined searchicon" onClick={searchHandler}>search</span>

    </div>

    </>
  )
}

export default Search