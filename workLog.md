
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
	1. Add topic input field
	2. Add “Add topic” button
	3. Display submitted topics
	4. Prevent empty topics
	5. Later: save topics in localStorage
	6. Later: add voting
- Cursor prompt: Please add a simple topic submission feature to this app. Add an input field and an “Add topic” button. When the user submits a topic, show it in a list below the form. Prevent empty submissions. Keep the implementation in plain HTML, CSS, and JavaScript.

## Done

- Installed and verified Git
- Initialized the local repository
- Made your first commit
- Configured your Git identity (Anne Brüggemann <aMaudPowellFan@users.noreply.github.com>)
- Created the GitHub repository
- Generated and used a Personal Access Token
- Pushed the project to GitHub
- Cleaned up old repositories
- Learned the edit → add → commit → push cycle for Git

---

# 20260603


## To do next

- Initialize Git in violinTopics.
- Make the first commit. 
- Create a GitHub repository. 
- Push the project to GitHub. 

## Done

- Cursor installed and logged in
- First project created (violinTopics)
- First AI-generated web application running
- Learned the review/keep workflow
- Apple Command Line Tools installed
- Git installed and working
- Terminal positioned in the project folder
