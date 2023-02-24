describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // 2. Clicks the add button for the first available appointment
    cy.get("[alt=Add]")
      .first()
      .click();
  
    // 3. Types name into input
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // 4. Selects interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // 5. Clicks save button
    cy.contains("Save").click();

    // 6. Asserts interview displays with correct student and interviewer
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // 2. Clicks the edit button for the first existing appointment
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // 4. Selects interviewer
    cy.get("[alt='Tori Malcolm']").click();

    // 4. Clears value and types new student name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    // 5. Clicks save button
    cy.contains("Save").click();

    // 6. Asserts new names are displayed on element
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 2. Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    // 3. Clicks the confirm button
    cy.contains("Confirm").click();

    // 4. Sees that the appointment slot is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});