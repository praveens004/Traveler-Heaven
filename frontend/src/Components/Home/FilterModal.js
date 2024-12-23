import React,{useEffect,useState} from 'react'
import PropTypes from "prop-types" // importing for type-checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css";//importing css file for import range styling
import InputRange from"react-input-range"

const FilterModal = ({selectedFilters,onFilterChange,onClose}) => {
    const [priceRange,setPriceRange]=useState({
        min:selectedFilters.priceRange?.min||600,
        max:selectedFilters.priceRange?.max||30000,
    });
    const [propertyType,setPropertyType]=useState(
        selectedFilters.propertyType || "" //default it is empty or the selected property type from props

    );
    const [roomType,setRoomType]=useState(selectedFilters.roomType ||"");
    const [amenities,setAmenities]=useState(selectedFilters.amenities ||[]);
    //useffect hook to update state whn selected filters props changes
    useEffect(()=>{
        setPriceRange({
            min:selectedFilters.priceRange?.min||600,
            max:selectedFilters.priceRange?.max||30000,

        });
        setPropertyType(selectedFilters.propertyType||"");
        setRoomType(selectedFilters.roomType ||"");
        setAmenities(selectedFilters.amenities || []);

    },[selectedFilters]);
    //functions to handle changes in price range change
    const handlePriceRangeChange=(value)=>{
        setPriceRange(value)//it update price range state
    }
    //fun to handle min value
    const handleMinInputChange=(e)=>{
        const minValue=parseInt(e.target.value,10);
        setPriceRange((prev)=>({...prev,min:minValue}));
    };
    //fun to handle max value
    const handleMaxInputChange=(e)=>{
        const maxValue=parseInt(e.target.value,10);
        setPriceRange((prev)=>({...prev,max:maxValue}));
    };
    //function to handle applying filter
    const handleFilterChange=()=>{
        onFilterChange("minPrice",priceRange.min);
        onFilterChange("maxPrice",priceRange.max);
        onFilterChange("propertyType",propertyType);
        onFilterChange("roomType",roomType);
        onFilterChange("amenities",amenities);
        onClose();//close the modal
    };
    //Options for property type
    const propertyTypeOptions=[
        {value:"House",label:"House",icon:"home"},
    {value:"Flat", label:"Flat",icon:"apartment"},
{value:"Guest House",label:"Guest House",icon:"hotel"},
{value:"Hotel",label:"Hotel",icon:"meeting_room"},
];
//options for room type
const roomTypeOptions=[{
    value:"Entire Room",label:"Entire Room",icon:"hotel"
},
{
    value:"Room",label:"Room",icon:"meeting_room"
},{
    value:"AnyType",label:"AnyType",icon:"apartment"
},
];
//options for amenities
const amenitiesOptions=[{
    value:"Wifi",label:"Wifi",icon:"wifi"
},
{
    value:"Kitchen",label:"Kitchen",icon:"kitchen"
},{
    value:"AC",label:"AC",icon:"ac_unit"
},
{
    value:"Washing Machine",label:"Washing Machine",icon:"local_laundry_service"

},{
    value:"Tv",label:"Tv",icon:"tv"
},
{
    value:"Pool",label:"Pool",icon:"pool"

},{
    value:"Free Parking",label:"Free parking",icon:"local_parking"
},
];
//function to handl clearing filter
const handleClearFilters=()=>{
    setPriceRange({min:600,max:30000});
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
}
//function to handle changes in amenitis
const handleAmenitiesChange=(selectedAmenity)=>{
    setAmenities((prevAmenities) =>
        prevAmenities.includes(selectedAmenity)
        ? prevAmenities.filter((item)=>item!==selectedAmenity)
        :[...prevAmenities,selectedAmenity]
    )
};
// func to handle change in propety type
const handlePropertyTypeChange =(selectedType)=>{
    setPropertyType((prevType)=>
        prevType===selectedType?"":selectedType
    );
};
//func to handle room type
const handleRoomTypeChange =(selectedType)=>{
    setRoomType((prevType)=>
        (prevType===selectedType?"":selectedType));
};





  return (
    <div className='modal-backdrop'>
        <div className='modal-content'>
            <h4>
                Filters <hr/>
            </h4>
            < button className='close-button' onClick={onClose}>
                <span>&times;</span>{/*CLOSE THE BUTTON */}
            </button>
            {/*FILTER SECTIONS*/}
            <div className='modal-filters-container'>
                <div className='filter-section'>
                    <label>Price Range:</label>
                    <InputRange
                    minValue={600}
                    maxValue={30000}
                    value={priceRange}
                    onChange={handlePriceRangeChange}/>
                    <div className='range-inputs'>
                        <input
                        type='number'
                        value={priceRange.min}
                        onChange={handleMinInputChange}/>
                        <span>-</span>
                        <input
                        type="number"
                        value={priceRange.max}
                        onChange={handleMaxInputChange}/>

                    </div>

                </div>
                <div className='filter-section' >
                    <label>Property Type:</label>
                    <div className='icon-box'>
                        {propertyTypeOptions.map((Options)=>(
                            <div  key={Options.value }
                            className={`selectable-box ${propertyType===Options.value ?"selected":""}`}
                            onClick={()=>handlePropertyTypeChange(Options.value)}
                            
                            >
                                <span className="material-icons">{Options.icon}</span>
                                <span>{Options.label}</span>

                            </div>
                        ))}
                    </div>


                </div>
                {/*room type*/}
                <div className='filter-section' >
                    <label>Room Type:</label>
                    <div className='icon-box'>
                        {roomTypeOptions.map((Option)=>(
                            <div  key={Option.value }
                            className={`selectable-box ${roomType===Option.value ?"selected":""}`}
                            onClick={()=>handleRoomTypeChange(Option.value)}
                            
                            >
                                <span className="material-icons">{Option.icon}</span>
                                <span>{Option.label}</span>

                            </div>
                        ))}
                    </div>


                </div>
                {/*Amenities*/}
                <div className='filter-section' >
                    <label>Amenities</label>
                    <div className='amenities-checkboxes'>
                        {amenitiesOptions.map((Option)=>(
                            <div  key={Option.value }
                            className='amenity-checkbox'>
                                {console.log(amenities.includes(Option.value))}
                                <input
                                type='checkbox'
                                value={Option.value}
                                checked={amenities.includes(Option.value)}
                                onChange={()=>handleAmenitiesChange(Option.value)}
                                />
                                <span className='material-icons amenitieslabel'>
                                    {Option.icon}
                                </span>
                                <span>{Option.label}</span>
                           
                            
                            

                            </div>
                        ))}
                    </div>


                </div>
                {/* Filter action buttons */}
                <div className='filter-buttons'>
                    <button className='clear-button' onClick={handleClearFilters}>Clear</button>
                    <button onClick={handleFilterChange}>Apply Filters</button>
                </div>
                

            </div>            

        </div>

    </div>
  );
};
FilterModal.propTypes={
    selectedFilters:PropTypes.object.isRequired,
    onFilterChange:PropTypes.func.isRequired,
}

export default FilterModal