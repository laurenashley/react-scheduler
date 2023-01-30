import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { student, setStudent } = useState(props.student || "");
  const { interviewer, setInterviewer } = useState(props.interviewer || null);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={() => setStudent(student)}
          />
        </form>
        <InterviewerList 
          value = {props.student}
          interviewers={props.interviewers}
          onChange={() => setInterviewer(interviewer)}  
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger >Cancel</Button>
          <Button confirm >Save</Button>
        </section>
      </section>
    </main>
  );
};