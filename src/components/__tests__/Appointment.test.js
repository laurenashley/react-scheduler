import React from "react";
import { render } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointments", () => {
  it("renders without crashing", () =>{
    render(<Appointment />);
  });
});