# Post Manager Exercise: Student Requirements

## Overview
Build a simple full-stack Post Manager app using Node.js and Express. You will create a backend with an in-memory data store and a simple web interface (frontend) that lets you view, create, edit, and delete posts. The backend will also serve the frontend files to the browser.

## Project Structure (How to Organize Your Code)

Your project should look like this:

```
project-root/
│
├── models/              # Post model (structure/validation)
│   └── Post.js
├── services/            # Business logic (CRUD for posts)
│   └── PostService.js
├── db.js                # In-memory data storage
├── server.js            # Express server (serves API and frontend)
├── frontend/            # All frontend files go here
│   ├── index.html       # Main web page (UI)
│   ├── ui.js            # Frontend logic (tabs, forms, rendering)
│   ├── api.js           # All code for talking to the backend API (see below)
│   └── style.css        # (Optional) CSS for styling
├── package.json         # Project dependencies and scripts
└── README.md            # Setup and run instructions
```

- **All your HTML, JS, and CSS for the user interface should go in the `frontend/` folder.**
- **Your backend code (model, service, db, server) stays in the main folders.**

## How the App Works
- The Express server (`server.js`) will serve both the API (for data) and the static frontend files (the web page).
- When you visit `http://localhost:3000/` in your browser, Express will send your `frontend/index.html` file, which loads the UI and connects to the backend API.
- The frontend uses JavaScript (in `ui.js`) to make HTTP requests (using `fetch`) to the backend API endpoints.

## What You Need to Build

### 1. Backend (Node.js + Express)
- Use Node.js and Express to create a REST API for posts.
- Store posts in an in-memory data structure (no database required).
- Implement the following endpoints:
  - `GET /api/posts` — List all posts (with optional search)
  - `GET /api/posts/:id` — Get a single post by ID
  - `POST /api/posts` — Create a new post
  - `PUT /api/posts/:id` — Update a post
  - `DELETE /api/posts/:id` — Delete a post
- Use a modular structure: separate files for the model, data layer, service logic, and server.
- Make sure to include this line in your `server.js` to serve the frontend:
  ```js
  app.use(express.static('frontend'));
  ```
- **You do NOT need to validate HTTP requests in your backend.** You can assume that all requests from the frontend are well-formed and contain the correct data.

### 2. Frontend (HTML + JS)
- Put your `index.html` (the main web page) in the `frontend/` folder.
- Put your JavaScript for the UI (e.g., `ui.js`) in the same folder.
- (Optional) Add a `style.css` for custom styles.
- **Create a separate `api.js` file in the `frontend/` folder.**
  - This file should contain all the code for making HTTP requests (using `fetch`) to the backend API (e.g., functions like `getAllPosts()`, `createPost()`, etc).
  - Your `ui.js` should only call functions from `api.js` to get or update data, and should not use `fetch` directly.
  - **Why?** This keeps your code modular and organized. If you ever need to change how you talk to the backend (e.g., change URLs, add authentication, or switch to a different backend), you only need to update `api.js` instead of searching through all your UI code.
- The UI should have four tabs: View, Create, Edit, Delete. Only show the relevant UI for the selected tab.
- Use JavaScript to make HTTP requests to the backend API (using `fetch` via `api.js`).
- Show all posts in the View tab, allow creating, editing, and deleting posts in their respective tabs.
- Display user-friendly messages for success and errors.

Design Note: Your frontend should follow a simple MVC-like structure:

- Model: the Post object (id, title, content)
- View: HTML rendering and tab display logic inside ui.js
- Controller: event handlers and logic in ui.js that call api.js functions

### 3. Understanding the Post Model
- A post in the Post Manager app contains the following fields:
  - **id**: A unique identifier for the post - uuidv4();
  - **title**: The title of the post (a short, descriptive text).
  - **content**: The main text or body of the post.
  - optional createdAt or other fields
- These fields are defined in the Post model (e.g., in `models/Post.js`), and your UI code (`ui.js`) will use them to display and manipulate posts. For example, when rendering the View tab, you will show a list of posts, each with its title and content. When creating or editing a post, you will collect the title and content from the user and send them to the backend.

### 4. General
- No authentication required.
- No database required (all data is in memory and resets on server restart).
- Use clean, readable code and modular file organization.

## Deliverables
- All backend and frontend code in a clear folder structure.
- A `README.md` with setup and run instructions.
- This requirements file (`STUDENT_REQUIREMENTS.md`).

## Bonus (Optional)
- Add search/filter functionality in the View tab.
- Add extra fields to the post model (e.g., tags, author).
- Add basic unit tests for the service layer.

---
**Goal:** Practice modular full-stack development, CRUD logic, and connecting a frontend to a backend API. No prior frontend experience is required—just follow the structure and use the provided examples as a guide. 