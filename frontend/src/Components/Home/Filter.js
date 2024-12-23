import React,{useEffect, useState} from 'react'
import FilterModal from './FilterModal';
import { useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Filter = () => {
    //state for ontrolling modal visibility
    const[isModalOpen,setIsModalOpen]=useState(false);
    //state for storing selected filter
    const[selectedFilters,setSelectedFilters]=useState({})
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(propertyAction.updateSearchParams(selectedFilters));
        dispatch(getAllProperties());
    },[selectedFilters,dispatch]);
    //function to handle opening the modal/popup window
    const handleOpenModal =()=>{
        setIsModalOpen(true);

    }
    // function to handle closing the modal/popup
    const handleCloseModal=()=>{
        setIsModalOpen(false);
    }
    // function to handle changes in filter
    const handleFilterChange=(filterName,value)=>{
        setSelectedFilters((prevFilters)=>({
            ...prevFilters,
            [filterName]: value,
        }));
    }
  return (
    <>
    {/*click event to opn filter */}
    <span class="material-symbols-outlined filter" onClick={handleOpenModal}>tune</span>
     {isModalOpen &&(
        <FilterModal
        selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClose={handleCloseModal}
        />
        
     )}
    </>
  )
}

export default Filter
