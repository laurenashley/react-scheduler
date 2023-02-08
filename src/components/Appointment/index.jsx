import React, {Fragment} from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  // console.log('appointment compnt props: ', props);

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      { mode === CREATE && (
        <Form
          student={props.interview && props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview && props.interview.interviewer}
          onCancel={() => back()}
          onSave={save}
          onComplete={() => transition(SHOW)}
        />
      )}
      { mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          onConfirm={() => transition(DELETING)}
          onComplete={() => transition(EMPTY)}
        />
      )}
      </article> 
    </Fragment>
  );
}