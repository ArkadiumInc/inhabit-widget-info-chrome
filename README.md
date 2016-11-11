# Angular2ChromeExtensionSeed
Seed of a Chrome extension using typescript Angular 2 (07/03/2016, v2.0.0-beta.8)

This project is based on the Google tutorial: https://angular.io/docs/ts/latest/quickstart.html, adds Angular-CLI typical project NPM managment and the extension CSP rights to allow Angular 2 execution. 

# Requirement
Install NPM (with node) for your platform: https://nodejs.org/download/release/latest/

Get the project localy: git clone https://github.com/Toldwin/Angular2ChromeExtensionSeed.git

# Use
To launch/use the extension directly in your browser as a standard web page, in the project folder use: npm start

To use project as an extension in Chrome: 
- Open Chrome preferences
- Choose "Parameters"
- Select "Extensions" on the left
- Activate "developer mode" on the top right
- Select "Load none packaged extension"
- Select the Angular2ChromeExtensionSeed folder

The extension shown with a little angular 2.0 icon. If you click on it it should show you "loading..." and next "My Firest Angular 2 App".

You are now free to modify this seed project to make the wonderful extension you like.
