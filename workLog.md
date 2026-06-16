# 20260616

## To do next

- Add editing of existing topics
- Decide on the editing workflow (inline editing, edit mode within the card, or reuse of the topic editor)
- Preserve topic IDs when editing existing topics
- Review the implementation and code structure
- Commit and push changes

## Done

- Reviewed the topic validation logic in script.js
- Analyzed the responsibilities of createTopic, isValidTopic, and parseStoredTopics
- Distinguished between:
  - UI validation (topic submission)
  - Structural validation (topic object shape)
  - Future data cleanup/migration
- Decided that non-empty titles are currently a UI rule rather than a data-model rule
- Determined that extra fields on stored topic objects are acceptable for now
- Identified a misleading comment in isValidTopic and clarified the intended meaning of the function
- Requested comment/documentation updates rather than stricter validation logic
- Implemented improved handling of empty topic titles in the editor
- Replaced silent failure with visible user feedback
- Added handling for whitespace-only titles
- Added button enable/disable logic based on title validity
- Reviewed the resulting user experience and concluded that the functionality is satisfactory, with possible visual refinements deferred
- Committed and pushed the validation and documentation changes

---

# 20260614

## To do next
- Review the Simplify Data Feedback changes in detail.
- Understand the rationale behind the refactoring.
- Check whether the persistence status handling is now clearer.
- Commit and push the changes if the review is satisfactory.
- Improve topic submission UX.
  - Disable "Add topic" button when title is empty.
  - Re-enable when a non-whitespace title is entered.
  - Keep server/business-logic validation in the submit handler.

## Done
- Clarified Cursor Pro payment issue with bank.
- Card had been locked by fraud detection; lock removed.
- Successfully upgraded to Cursor Pro.
- Implemented Simplify Data Feedback refactoring.

---

# 20260613

## To do next

- Resolve Cursor payment issue or contact support.
- Implement persistence feedback simplification.
- Review code changes.
- Commit and push.

## Done

- Reviewed persistence feedback design.
- Decided to remove the persistence status area and use browser alerts for successful save/load operations.
- Prepared a prompt for the refactoring.
- Investigated Cursor Pro payment issue (Mastercard + PhotoTAN authentication succeeds, payment still rejected).
- Captured screenshots for possible support request.

---

# 20260612

## To do next

- Commit and push the localStorage persistence work.
- Review Cursor's proposal for improving persistence-status handling.
- Review Cursor's proposal for validating topic submission when the title is empty.
- Decide whether to refactor the persistence-status logic.
- Decide how validation feedback for missing titles should work.
- If the proposals are accepted, implement and test the changes.

## Done

- Reviewed the current HTML and JavaScript code.
- Traced the control flow through the event handlers.
- Confirmed that the overall structure is logical and understandable.
- Identified a code-clarity issue:
  - `clearPersistenceStatus()` is called from several event handlers without a clearly documented rule.
- Identified a submit-logic issue:
  - If the title field is empty, the Add Topic handler returns without feedback and without clearing the persistence status.
- Asked Cursor to analyze both issues and propose improvements before making code changes.
- Received a design proposal for review.

---

# 20260611

## To do next

- Review the generated code.
- Request a high-level explanation of the application's current architecture and logical flow.
- Consider improving comments in `script.js` to document the flow of data and control.
- Commit and push the changes after review.

## Done

- Reviewed options for persistent storage of topics.
- Discussed JSON as a storage format and how it can support future extensions (categories, timestamps, rich-text markup, etc.).
- Asked Cursor to propose a JSON data structure and localStorage key before implementation.
- Implemented topic persistence using browser localStorage.
- Added **Store Topics** and **Load Topics** buttons.
- Verified that topics can be stored, reloaded, and that topic order is preserved.
- Identified potential data-loss scenarios:
  - Storing an empty topic list can overwrite a previously saved list.
  - Loading a saved list can discard unsaved edits in the current session.
- Added confirmation dialogs to protect against accidental data loss during load and store operations.
- Learned about JavaScript `confirm()` dialogs and their use as a simple safeguard before destructive actions.
- Improved status message handling:
  - Success messages are shown after successful load/store operations.
  - Old status messages are cleared when the user edits data or cancels a load/store operation.
- Reached a point where the application contains enough interacting features that understanding the overall data flow and architecture becomes important.

---

# 20260610

## To do next

- Ask Cursor to propose the JSON data structure and localStorage design.
- Implement storing topics in localStorage.
- Implement loading topics from localStorage.
- Test persistence across browser restart.
- Review the code changes and commit them to Git.

## Done

- Reviewed the current state of the violinTopics project.
  - Read and understood the overall project structure.
  - Asked Cursor to explain the CSS file and reviewed its styling approach.
  - Confirmed that topics are already represented as objects stored in an array.
- Discussed options for persistent storage of topics:
  - text-based storage (JSON)
  - localStorage
  - database solutions
- Decided to introduce persistence incrementally:
  - first localStorage using JSON
  - later optional JSON import/export
  - database only if needed in the future
  Designed the next implementation step:
  - store and load topics from localStorage
  - preserve topic order
  - add explicit "Store topics" and "Load topics" buttons
  - review the planned JSON data structure before implementation

---

# 20260608

## To do next

- Review the generated code in detail tomorrow in order to understand: 
  - the new topic data structure, 
  - card rendering, 
  - scrolling behaviour, 
  - CSS layout decisions.

## Done

Today I made the first major structural change to the Violin Topics web app.

### Design and Planning

- Developed a longer-term UI roadmap for the application. 
- Defined the overall concept of managing workshop topics as index cards rather than a simple list. 
- Planned future support for: 
  - categories, 
  - editing existing topics, 
  - filtering and searching, 
  - sorting, 
  - semantic inline annotations.
- Discussed the implications for data modelling and future architecture.

### Implementation

- Changed the topic data model from a single text string to a structured topic object containing: 
  - id
  - title
  - description
- Replaced the simple topic input field with a card-shaped topic editor. 
- Added separate fields for: 
  - a single-line title, 
  - a longer description.
- Changed topic display from a plain list of strings to card-based topic presentation. 
- Configured new topics to appear at the top of the list. 
- Deferred the planned grid layout to a later iteration.

### Debugging and Learning

- Discovered a layout bug in which the description field of the topic editor initially appeared vertically centred. 
- Learned how to formulate a clear bug report for Cursor using: 
  - reproduction steps, 
  - observed behaviour, 
  - expected behaviour.
- Asked Cursor not only to fix the issue but also to explain the cause and solution. 
- Tracked the bug to conflicting height definitions between HTML and CSS. 
- Learned the importance of having a single source of truth for layout properties.

### Development Workflow

- Reviewed and accepted Cursor's proposed changes. 
- Prepared a Git commit for the completed work.  
Result: The application evolved from a simple topic list into the first version of a structured topic-management system with a clear path toward categories, editing, filtering, and richer topic metadata.

---

# 20260607

## To do next

Refine the prompt and use it.

## Done

Today, I developed a UI Roadmap and turned it into a prompt for Cursor to develop the initial stage.

---

# 20260606

## To do next

- Spend some time before changing the code imagining myself as a workshop participant:
  - What information do I actually want to submit? 
  - What would I like to see in the list? 
  - How much text is too much? 
  - Would I want to edit a submission later? 
  - How would I vote on it?
- Remove the label "Workshop topic".
- Decide how I want overly long topics handled.
- Structure topics into a short title and a longer elaboration.

## Done

- Reviewed the structure of the application with Cursor. 
- Added beginner-friendly comments to the main script file. 
- Removed the "Hello Violin World" greeting. 
- Reviewed the resulting code and CSS changes. 
- Prepared the next UI cleanup task (removing the "Workshop topic" label). 
- Practiced Git commits and commit messages.

---

# 20260605

## To do next

- Spend some time understanding the generated JavaScript:
  - event handling (addEventListener)
  - reading user input 
  - creating and inserting list elements 
  - updating the DOM
- Tweak formatting
  - remove "Hello Violin World"
  - decide how I want overly long topics handled
  - tweak typography of label "Workshop topic", or remove it?
- Start writing my own prompts, rather than relying on ChatGTP

## Done

- Continued setup of the Violin Topics web application in Cursor. 
- Added a first interactive feature: topic submission. 
- Implemented: 
  - text input field for workshop topics 
  - "Add topic" button 
  - validation to prevent empty submissions 
  - automatic clearing of the input field after submission 
  - display of submitted topics in a list
- Modified the behavior so that newly submitted topics are inserted at the beginning of the list rather than at the end.
- Tested the functionality in the browser and confirmed that it works as expected. 
- Reviewed the workflow for using Cursor: 
  - make small, incremental requests 
  - review generated changes 
  - accept changes 
  - test before proceeding
- Discussed Git workflow and the meaning of: 
- git status
- git add .
- git commit
- git push
- Clarified that git add . stages all changed files in the current project tree rather than re-adding the entire repository.
- Committed changes to GitHub

---

# 20260604

## To do next

- Add functionality to the app: adding a topic
  - 1. Add topic input field
  - 1. Add “Add topic” button
  - 1. Display submitted topics
  - 1. Prevent empty topics
  - 1. Later: save topics in localStorage
  - 1. Later: add voting
- Cursor prompt: Please add a simple topic submission feature to this app. Add an input field and an “Add topic” button. When the user submits a topic, show it in a list below the form. Prevent empty submissions. Keep the implementation in plain HTML, CSS, and JavaScript.

## Done

```
- Installed and verified Git
- Initialized the local repository
- Made your first commit
- Configured your Git identity (Anne Brüggemann <aMaudPowellFan@users.noreply.github.com>)
- Created the GitHub repository
- Generated and used a Personal Access Token
- Pushed the project to GitHub
- Cleaned up old repositories
- Learned the edit → add → commit → push cycle for Git

```

---

# 20260603

## To do next

- Initialize Git in violinTopics.
- Make the first commit. 
- Create a GitHub repository. 
- Push the project to GitHub.

## Done

```
- Cursor installed and logged in
- First project created (violinTopics)
- First AI-generated web application running
- Learned the review/keep workflow
- Apple Command Line Tools installed
- Git installed and working
- Terminal positioned in the project folder
```

