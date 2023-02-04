import React, {Fragment} from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log('appointment compnt props: ', props);

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      { mode === CREATE && (
        <Form
          student="Name"
          interviewer={2}
          interviewers={props.interviewers}
        />
      )}
      </article> 
    </Fragment>
  );
}