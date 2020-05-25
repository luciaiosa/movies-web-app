# Movies web app

Movies web app using OMDB open API, React, Typescript, Redux, Sagas, material-ui and Sass.

## Prerequisites

* **npm >= 5.5.0**
* **node > 10.13.0**

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the dependencies of the project (development and production).

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for development to the `dist` folder.<br />
It correctly bundles React in development mode and optimizes the build for the best performance.

See the section about [deployment](https://webpack.js.org/guides/development/) for more information.

### `yarn build:prod`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

See the section about [production](https://webpack.js.org/guides/production/) for more information.

## Log in to test favorite movies

``` 
email: test@test.com
password: Test1+
```

## Learn More

You can learn more in the [Webpack documentation](https://webpack.js.org/guides/getting-started/).

To learn React, check out the [React documentation](https://reactjs.org/).

## Code splitting using DLL (Dynamic-Link Library)

Webpack provides plugins such as DllPlugin and DllReferencePlugin that allow to extract the libraries that rarely change and reference them in the project instead of building them every time.
Steps:

* **Create the DLL bundle**
Create a file called vendor.js that points to all commonly used libraries in the project.

``` 
require('react');
require('react-dom');
require('react-redux');
require('react-router');
require('react-router-dom');
require('redux');
require('redux-logger');
require('redux-saga');
require('axios');
```

* **Build the DLL Libraries**
To build the DLL libraries, create a new webpack.config.dll.js file with the following configuration:

``` 
const webpack = require("webpack");
const path = require("path");

module.exports = {
  context: __dirname,
  entry: {
    vendor: [path.join(__dirname, "vendor.js")]
  },
  devtool: "#source-map",
  mode: "development",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "vendor", "[name]-manifest.json"),
      name: "[name]"
    })
  ]
};
```

DllPlugin is used in a separate webpack configuration exclusively to create a dll-only-bundle.

DllPlugin creates a manifest.json file, which is then used by DllReferencePlugin to map dependencies.

Running the following command creates creates two files, which are going to be used in the next steps: 

build/vendor.js
vendor/vendor-manifest.json

```
webpack --config webpack.config.dll.js
```

* **Build the project**
After creating the DLL bundle, reference it in the webpack.config.js using DllReferencePlugin:

``` 
const path = require('path');
const webpack = require('webpack')

module.exports = {
  // other config...
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./vendor/vendor-manifest.json")
    }),
  ]
}
```

The DllReferencePlugin loads the libraries in the manifest file from DllPlugin and references them in the source code.

This also works for multiple projects. Reference the generated manifest.json file in the webapck.config.js of the respective projects.

* **Vendor file in HTML**
 Add webpack plugins such as html-webpack-plugin and add-asset-html-webpack-plugin into webpack.config.js.
 The entire webpack.config.js:

``` 
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, "app.js"),
  devtool: "#source-map",
  mode: "development",
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./vendor/vendor-manifest.json")
    }),
    new HtmlWebpackPlugin(),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "./build/vendor.js")
    })
  ]
};
```