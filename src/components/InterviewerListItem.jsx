import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const liClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  return (
    <li 
      className={liClass} 
      key={props.id}
      onClick={props.setInterviewer}
    >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
      {(props.name) && props.name}
    </li>
  );
}