# angular-seed — the seed for AngularJS apps
This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.

The seed app doesn't do much, just shows how to wire two controllers and views together.

## Getting Started
To get you started you can simply clone the angular-seed repository and install the dependencies:

### Prerequisites
You need git to clone the angular-seed repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone angular-seed
Clone the angular-seed repository using [git][git]:

```
git clone https://github.com/quadam/angular-seed.git
cd angular-seed
```

If you just want to start a new project without the angular-seed commit history then you can do:

```bash
git clone --depth=1 https://github.com/quadam/angular-seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies
We have two kinds of dependencies in this project: tools and angular framework code.  The tools help us manage and test the application.
- We get the tools we depend upon via `npm`, the [node package manager][npm].
- We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new folders in your project.
- `node_modules` - contains the npm packages for the tools we need
- `app/bower_components` - contains the angular framework files

_Note that the `bower_components` folder would normally be installed in the root folder but angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes it easier to serve the files by a webserver._

### Run the Application
We have preconfigured the project with a simple development web server.  The simplest way to start this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  view1/                --> the view1 view template and logic
    view1.html            --> the partial template
    view1.js              --> the controller logic
    view1_test.js         --> tests of the controller
  view2/                --> the view2 view template and logic
    view2.html            --> the partial template
    view2.js              --> the controller logic
    view2_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Testing
There are two kinds of tests in the angular-seed application: Unit tests and End to End tests.

### Running Unit Tests
The angular-seed app comes preconfigured with unit tests. These are written in [Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma configuration file to run them.
- the configuration is found at `karma.conf.js`
- the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and watch the source and test files for changes and then re-run the tests whenever any of them change. This is the recommended strategy; if your unit tests are being run every time you save a file then you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to check that a particular version of the code is operating as expected.  The project contains a predefined script to do this:

```
npm run test-single-run
```

### End to end testing
The angular-seed app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has special features for Angular applications.
- the configuration is found at `e2e-tests/protractor-conf.js`
- the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds correctly. Therefore, our web server needs to be serving up the application, so that Protractor can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-seed project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the development server.

## Updating Angular
Previously we recommended that you merge in changes to angular-seed into your own fork of the project. Now that the angular framework library code and tools are acquired through package managers (npm and bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.

## Serving the Application Files
While angular is client-side-only technology and it's possible to create angular webapps that don't require a backend server at all, we recommend serving the project files using a local webserver during development to avoid issues with security restrictions (sandbox) in browsers. The sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr, etc to function properly when an html page is opened via `file://` scheme instead of `http://`.

### Running the App during Development
The angular-seed project comes preconfigured with a local development webserver.  It is a node.js tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just configure your server to serve the files under the `app/` directory.

### Preparing te app for production
To build the app gulp is used. To install gulp run

```
npm install gulp-cli -g
```

and gulp will be installed globally and you can run it from the command line.

In `gulpfile.js`, change the parameter moduleName if the main module has another name.

Then just run `gulp` to prepare for production. The result is in the `dist` directory.


## Contact
For more information on AngularJS please check out [http://angularjs.org/](http://angularjs.org/)

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[http-server]: https://github.com/nodeapps/http-server
