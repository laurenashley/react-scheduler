import React from "react";
import DayListItem from "./DayListItem";

function DayList (props) {
  const days = props.days.map(day => {
    const selected = (day.name === props.value );

    return (
      <DayListItem 
        key={day.id}
        value={day.name} 
        spots={day.spots}
        selected={selected}
        onChange={() => {props.onChange(day.name)}}  
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}

export default DayList;