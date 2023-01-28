import React from "react";
import DayListItem from "./DayListItem";

function DayList (props) {
  const days = props.days.map(day => {
    const selected = (day.name === props.day );

    return (
      <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots}
        selected={selected}
        setDay={() => {props.setDay(day.name)}}  
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