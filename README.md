# Project-IS
B9IS123 PROGRAMMING FOR INFORMATION SYSTEMS (B9IS123_2425_TMD3)

# Client Management System

## Overview

This is a basic proof-of-concept Client Management System built as part of the Programming for Information Systems module at Dublin Business School (Module Code: B9IS123).

The system allows users to add, view, update, and delete client records using a simple web interface. It is designed to simulate how a small company might manage their client data.

## Features

- Add a new client
- View a list of clients
- Update client details
- Delete a client
- Basic client data stored in a local JSON file (mock database)
- API-based architecture (frontend makes requests to backend)

## Technologies Used

- HTML5
- JavaScript (Vanilla JS)
- JSON for backend mock database
- (Planned: Node.js or Flask for API backend)

## Architecture & Workflow

User fills in the client form and clicks "Save"

Data is sent to the Express API (POST / PUT)

Backend inserts/updates data in SQLite database

Table refreshes via GET request to display updated list

Users can edit/delete existing clients

All frontend-backend communication is done via fetch() calls (API-based, not post-refresh)

## Testing Summary

Manual unit tests for each feature (add, edit, delete, validation, search)


## References & Attribution

I confirm that this project was fully built by me, and I used the following resources only for syntax help and conceptual understanding:

## Reference Websites:

W3Schools

GeeksForGeeks

MDN Web Docs

Stack Overflow

CSS-Tricks

JavaScript.info

TutorialsPoint

freeCodeCamp

YouTube tutorials – for basic Express + frontend form handling guidance

## AI Use Disclosure:

I used ChatGPT strictly for learning syntax, debugging help, and understanding file structure.

All final code, logic, UI design, and documentation was written and tested by me.

## Git Commit Justification Log

This section has been moved to the submitted project documentation for detailed reference.


## Final Note

This is an academic project submitted for the Programming for Information Systems module (B9IS123) under Paul Laird, Dublin Business School. I have complied with all academic integrity rules and AI usage policies as outlined in the assessment brief.