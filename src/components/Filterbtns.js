import React from 'react';
import './FilterBtn.css';

const FilterButton = props =>  {
  return (
    <div className="filter-btns">
      {props.filterNames.map((filterName) => {
        return <button
          onClick={() => props.onFilter(filterName)}
        >
          {filterName}
        </button>
      })}
    </div>
  )
}

export default  FilterButton;