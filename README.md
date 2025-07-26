# FTC Live Keyboard Control Plugin

This browser plugin allows keyboard shortcuts to trigger key actions.

## 🚀 Features

This plugin allows you to control specific buttons on the FTC Live control page using keyboard shortcuts. The key mappings are defined within the `contentScript.js` file and can be customised.

**Example Keyboard Mappings (Configurable in `contentScript.js`):**

- **1:** Triggers the "Load Next Match" button.
- **2:** Triggers the "Show Preview" button.
- **3:** Triggers the "Show Match" button.

## 📋 Prerequisites

Before using this plugin, ensure you have:

- A web browser compatible with extensions (e.g., Google Chrome, Microsoft Edge, Mozilla Firefox).
- An **FTC Live instance running locally** and accessible via the specified URL (e.g., `http://192.168.0.67/event/4321/control/`).
- That URL Also needs to be the same in the manifest.json to restrict the button aliases to just the Match Control page.
- An active event loaded in FTC Live with the correct Event ID in the URL (e.g. 4321).
- Node.js and npm (or yarn) installed if you plan to run the provided Cypress tests.

## 📦 Installation (Load as Unpacked Extension)

1.  **Download/Clone:** Get the plugin files. You should have a folder (e.g., `FtcLiveKeyboardControlPlugin`) containing at least:
    ```
    FtcLiveKeyboardControlPlugin/
    ├── manifest.json
    └── contentScript.js
    ```
2.  **Open Browser Extensions:**
    - **Chrome/Edge:** Go to `chrome://extensions` or `edge://extensions`.
    - **Firefox:** Go to `about:debugging#/runtime/this-firefox`.
3.  **Enable Developer Mode:**
    - On Chrome/Edge, toggle the "Developer mode" switch, usually in the top-right corner.
    - On Firefox, this is enabled by default in the `about:debugging` interface.
4.  **Load Unpacked Extension:**
    - Click the "Load unpacked" button (Chrome/Edge) or "Load Temporary Add-on" (Firefox).
    - Navigate to and select the `FtcLiveKeyboardControlPlugin` folder.
5.  **Verify:** The plugin should now appear in your list of extensions.

## 🚀 Usage

1.  Ensure your local FTC Live application is running an event.
2.  Open your browser and navigate to the FTC Live control page (e.g., `http://192.168.0.67/event/4321/control/`).
3.  Log in with your credentials (as tested by Cypress, typically `local` for username).
4.  Once on the control page, use the configured keyboard shortcuts (e.g., F13, F14, F15, etc.) to trigger the corresponding buttons.
5.  Observe the changes in the FTC Live interface as the buttons are virtually clicked by the plugin.

## ⚙️ Customisation

The keys are defined in the "case" args of the switch statement in remote-game-start.js

## 🧪 Testing with Cypress

This plugin has Cypress tests to show the state changes in the FTC Live application.

### Test Setup

**Install Cypress:**

    ```bash
    npm install cypress --save-dev
    ```

### How to Run Tests

1.  **Start your FTC Live application** locally and navigate to the control page (`http://192.168.0.67/event/4321/control/`). Ensure it's fully loaded and ready for interaction.
2.  Open your terminal in the root directory of your Cypress project.
3.  Run the Cypress test runner:
    ```bash
    npm run cypress:open
    ```
4.  In the Cypress UI, choose your preferred browser and click on `plugin.cy.js` to run the tests.

These tests will launch the browser, load your plugin, navigate to your local FTC Live instance, log in, and verify the specified button behaviors.
