# Yael Group Job Tracker Extension

A lightweight Chrome Extension designed to help job seekers track their applications on the Yael Group careers website. It automatically marks jobs as "Applied" once they are clicked/opened, saving the state locally so you can easily visually filter positions you have already interacted with.

## Features

* **Visual Tracking:** Automatically changes the background color of opened jobs to a green tint and adds a "✅ Applied" badge.
* **Persistent Storage:** Uses `localStorage` to remember which jobs you have already viewed/applied to across browser sessions.
* **Dynamic UI Support:** Uses a MutationObserver to ensure newly loaded or dynamically rendered jobs are tracked in real-time.
* **Status Banner:** Displays a minimal, non-intrusive floating indicator to confirm the extension is active on the site.

## Directory Structure

```text
yael-job-tracker/
├── manifest.json   # Extension configuration and permissions
├── content.js      # Core logic for tracking clicks and extracting Job IDs
├── styles.css      # Styling for the marked jobs and status banner
└── README.md       # Project documentation