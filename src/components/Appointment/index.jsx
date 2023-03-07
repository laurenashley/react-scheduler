import React, {Fragment} from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function cancel(id) {
    transition(DELETING, true);
    props.cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment" data-testid="appointment">
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
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          onComplete={() => transition(SHOW)}
        />
      )}
      { mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
          onComplete={() => transition(SHOW)}
        />
      )}
      { mode === SAVING && (
        <Status message="Saving" />
      )}
      { mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={() => cancel(props.id)}
          onComplete={() => transition(EMPTY)}
        />
      )}
      { mode === DELETING && (
        <Status message="Deleting" />
      )}
      { mode === ERROR_SAVE && (
        <Error 
          message="Error saving this appointment"
          onClose={() => transition(EMPTY, true)}
        />
      )}
      { mode === ERROR_DELETE && (
        <Error 
        message="Error deleting this appointment"
        onClose={() => transition(EMPTY, true)}
        />
      )}
      </article> 
    </Fragment>
  );
}