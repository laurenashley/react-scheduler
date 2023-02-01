import React, {Fragment} from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  return (
    <Fragment>
      <Header time={props.time} />
      <article className="appointment">
      {
        props.interview 
          ? <Show student={props.interview.student} interviewer={props.interview.interviewer} />
          : <Empty />
      }
      </article> 
    </Fragment>
  );
}