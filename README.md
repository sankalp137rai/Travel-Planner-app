**Project Name:** # Travel Planner
**Author:** Sankalp Rai
**Language and tools:** HTML,CSS,JavaScript,express js, webpack, babel, scss , service worker
**Platform:** Udacity
**Date:** 27/06/2020

This project uses:
 1. **npm** : npm to manage project
 2. **webpack** : To build project from "src" directory and output in "dist" directory using two webpack config files. 	
	 1. ** webpack.dev.js** : To build project for during development. To start development environment`npm run start-dev` or to build project in development environment `npm run build-dev`
	 2. **webpack.prod.js** To build project for deployment.To start `npm start-prod` or to build project in production environment `npm run build-prod`
 3. **express js** : To setup the server using `/src/server/index.js`. Tp start the express server we can use `npm start`
 4. **Jest** : For testing the project javascript files. To start test `npm run test`
 5. **Geonames** : For fetching latitude and longitude
 6. **Weatherbit** : For fetching weather forecasts
 7. **Pixabay** : For generating images for cities

Dependencies of the project:
1. body-parser
2. cors
3. express
4. webpack
5. webpack-cli
6. workbox-webpack-plugin

**Ways to Stand Out section**
Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).