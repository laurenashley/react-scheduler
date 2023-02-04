import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log('InterviewerList props: ', props.interviewers);
  // ERROR: props.interviewers.map is not a fn ???????? why
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        onChange={() => props.setInterviewer(interviewer)}    
      />
    );
    
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
};