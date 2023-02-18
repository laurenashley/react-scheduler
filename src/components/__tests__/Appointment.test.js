import React from "react";
import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointments", () => {
  it("renders without crashing", () =>{
    render(<Appointment />);
  });
});