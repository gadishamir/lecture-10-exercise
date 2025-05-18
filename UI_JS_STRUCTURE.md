# Guide: How to Structure `ui.js`

This guide explains how to organize your `ui.js` file for the Post Manager project. It focuses on the logic and structure, not the actual rendering code.

## Purpose of `ui.js`
- Handles everything the user sees and interacts with in the browser.
- Manages the display and switching of tabs (View, Create, Edit, Delete).
- Calls functions from `api.js` to get or update data from the backend.
- Updates the page content based on user actions.

## Key Principles
- **Separation of Concerns:**
  - `ui.js` is responsible for the user interface and user interactions.
  - All communication with the backend (HTTP requests) should be done through `api.js`.
- **Modularity:**
  - Each major part of the UI (each tab) should have its own function for rendering and handling events.
- **Maintainability:**
  - Organizing code this way makes it easier to read, debug, and extend later.

## Suggested Structure

### 1. Tab Management
- Keep a list of tab names (e.g., `['View', 'Create', 'Edit', 'Delete']`).
- Track which tab is currently active.
- Render a tab bar that lets the user switch between tabs.
- When a tab is clicked, update the active tab and re-render the main content area.

### 2. Rendering Functions
- Create a separate function for each tab (e.g., `renderViewTab`, `renderCreateTab`, etc.).
- Each function is responsible for:
  - Displaying the correct UI for that tab.
  - Attaching any event listeners needed for that tab (e.g., form submissions, button clicks).
  - Calling the appropriate functions from `api.js` to get or update data.

### 3. Event Handling
- Attach event listeners (like form submissions or button clicks) inside the rendering functions, after the HTML for that tab is created.
- This ensures that events work even when the UI changes (e.g., when switching tabs).

### 4. Separation from API Logic
- Do **not** use `fetch` directly in `ui.js`.
- Instead, call functions from `api.js` (like `getAllPosts()`, `createPost()`, etc.).
- This makes your code easier to read and change later. If you need to change how you talk to the backend, you only update `api.js`.

### 5. Main Render Function
- Have a main `render()` function that:
  - Renders the tab bar.
  - Calls the correct rendering function for the active tab.
- Call `render()` when the page loads and whenever the user switches tabs or performs an action that changes the UI.

### 6. Understanding the Post Model
- The Post model defines the structure of a post (e.g., `id`, `title`, `content`).
- In your UI, you will display and manipulate posts based on this model.
- For example, when rendering the View tab, you will display a list of posts, each with a title and content.
- When creating or editing a post, you will collect the title and content from the user and send them to the backend.
- The Post model is defined in your backend (e.g., in `models/Post.js`), but your UI code (`ui.js`) should know what fields to expect and how to display them.

## Example Flow (No Rendering Code)
1. User opens the page. `render()` is called.
2. The tab bar and the default tab (e.g., View) are displayed.
3. User clicks the "Create" tab:
   - The active tab is updated.
   - `render()` is called again, which calls `renderCreateTab()`.
   - The Create form is displayed.
4. User submits the Create form:
   - The event handler calls `api.createPost()`.
   - After success, `render()` is called to update the UI.

## Why Organize It This Way?
- Keeps your code modular and easy to understand.
- Makes it easy to add or change features later.
- Ensures your UI updates correctly when the user switches tabs or performs actions.
- Makes debugging and maintenance much easier.

---
**Tip:** Focus on keeping each function small and focused on a single responsibility. This will help you write better, more maintainable code! 