# Inhabit Widget Information Chrome Extension
This Chrome extension is built to help gathering information about Inhabit Widget (a.k.a. Interactive) loading and configuration process directly on a client page. It shows results for the page semantic analyze, provides information about the Widget modules and process of module selection.

This project is based on the seed of a Chrome extension using typescript Angular 2 (07/03/2016, v2.0.0-beta.8) which is based on the Google tutorial: https://angular.io/docs/ts/latest/quickstart.html, adds Angular-CLI typical project NPM managment and the extension CSP rights to allow Angular 2 execution.

# Requirements
Install NPM (with node) for your platform: https://nodejs.org/download/release/latest/

Use npm run tsc:w command to compile and watch for TS file changes.
Use npm run tsc:w command to compile and watch for TS file changes.
# Usage
After installation in Chrome, open the client page you need to analyze and launch the Chrome DevTools window pessing Clt+Alt+I or F12. On the Chrome DevTools window, beside standard tabs like "Network", "Elements", "Sources" etc. the "Inhabit Interactive Info" tab should be shown.

* On the "Inhabit Interactive Info" tab there are two buttons the "Reload client page" button and the "Grab data from the client page" button.
1. Click on the "Reload client page" button to reload the client page and attach listeners that should collect information during the Inahbit Interactive loadign process.
2. When the Inhabit Interactive content is loaded or at any moment you find interesting to grab the Inhabit Interactive information, click on the "Grab data from the client page" button.

* The data collected from the client page is shown split on several sections, that could be expanded by clicking on the section header. The section at the top is expanded by default and contains verbose explanation about the process and explains in *almost* human language important data that is stored in all sections below. The raw data put in the sections below and could provide additional information if necessary.