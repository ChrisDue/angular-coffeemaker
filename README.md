# Smart Coffeemaker made in Angular

System under Test for the Bachelor Thesis of Christopher Dührkop (Matrikelnummer 2390000). This project can be also be found on GitHub https://github.com/ChrisDue/angular-coffeemaker. All important info to get this app started is listed below. 

<br/>

## 1. Smart Coffeemaker Web App 

### 1.1 Installation

If NPM was not already installed, use the following CLI call: 
> npm install -g

### 1.2 Launch and view

To start the web app and open it in browser: 
> ng serve --open  

Opens your Default Browser on http://localhost:4200/, where the Coffeemaker is running.  
Here, you won't see any recipes or ingredients listed yet. For these to be loaded, start the DB as explained below. 

<br/>

## 2. API and DB

Created following the instructions in the "json-server" package's readme: https://www.npmjs.com/package/json-server / https://github.com/typicode/json-server.

### 2.1 Installation

It's recommended to start another terminal, so you have one for the App, and a separate one for the DB.  

If json-server was not already installed, use the following CLI call: 
> npm install -g json-server

### 2.2 Launch and view

To start the DB and open it in browser with the following command: 
> json-server --watch db.json

To hold a valid data set, it has to be the db.json file that is included in this project.   

Visit http://localhost:3000/ in your browser to see an overview of the available endpoints. These are http://localhost:3000/ingredients for the ingredients and http://localhost:3000/recipes for the recipes.

Now the project is running and it's connected to a db filled with valid data. To run the automated tests, follow the instructions below. 

<br/>

## 3. Cypress  

### 3.1 Installation

Created following the instructions in the Cypress documentation: https://docs.cypress.io/guides/getting-started/installing-cypress  

If Cypress was not already installed, first navigate to the project's repo: 
> cd /your/project/path  

... and then use the following CLI call: 
> npm install cypress --save-dev

### 3.2 Launch and view

To start the Cypress Test Runner UI and see all executable tests: 
> npx cypress open 

**Note 1:**  
It is normal for the visual snapshot test to fail when running all tests. Go into the header section and run it separately.

**Note 2:**  
It is _also_ normal for the visual test "looks the same on every page" to fail when running it separately for the first time. To fix this, first run header.spec.js only. In the field of the failing test, click "COMPARE SNAPSHOT". This opens a window, comparing 2 snapshots. Here, click "Update snapshot". Then re-run the test. Repeat this step for every failing page. One after the other will succeed.  

<br/>

## 4. Interesting Files and Folders

- /cypress
  - /downloads: Used when testing file download links etc.
  - /fixtures: Unsuccessful attempts at using fixtures for resetting the db between tests
  - /integration: All the automated tests, structured by pages
  - /plugins: Importing and configuring plugins
  - /support: Global variables and methods usable by all tests
  - /videos: Recordings of tests, only made when activated
- /e2e: Not in use
- /src: The application code, structured by components, including http, ts, css and (auto-generated and unused) unit-tests
  - /assets: Usable assets like downloadable files, e.g. the user manual
- cypress.json: Mainly used to set the most important URLs as global variables and to configure the threshold-value for cypress-plugin-snapshots 
- db.json: Holds the actual database



<br/>



# Default boilerplate text block by Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
