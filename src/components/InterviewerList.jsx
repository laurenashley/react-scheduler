import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log('InterviewerList props: ', props);
  const interviewersList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        selected={interviewer.id === props.value}
        name={interviewer.name}
        avatar={interviewer.avatar}
        onChange={() => props.setInterviewer(interviewer)}    
      />
    );
    
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>
  );
};