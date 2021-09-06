# Angular Coffeemaker

System under Test for my Bachelor Thesis. All important info is listed below.  

<br/>

## 1. Coffeemaker Web App 

### 1.1 Installation

If NPM was not already installed, use the following CLI call: 
> npm install -g

### 1.2 Launch and view

To start the web app and open it in browser: 
> ng serve --open  

Opens your Default Browser on http://localhost:4200/, where the Coffeemaker is running.  

<br/>

## 2. API and DB

Created following the instructions in the packages' readme:  
https://www.npmjs.com/package/json-server / https://github.com/typicode/json-server.

### 2.1 Installation

If json-server was not already installed, use the following CLI call: 
> npm install -g json-server

### 2.2 Launch and view

To start the DB and open it in browser: 
> json-server --watch db.json

<br/>

## 3. Cypress  

### 3.1 Installation

If Cypress was not already installed, use the following CLI call: 
> TODO

### 3.2 Launch and view

To start the Cypress Test Runner and see all executable tests: 
> npx cypress open 

<br/>

# Default text by Angular

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
