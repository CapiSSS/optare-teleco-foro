# Optare Solutions at University of Vigo's Teleco Forum

Here's the code to create and deploy a webpage which students can visit to register in a coding competition. Owned by Optare Solutions S.L.

## Architecture

This project consists of the following parts:

- Two server files coded in NodeJS:
	- server.js: it manages the registration process. It shows a few questions that the students must answer before registering their name and email. Responses (along with name and email account) are saved in a database.
	- server-competition.js: it manages the competition. Students introduce their email to set the time they start the competition, and the code is downloaded in zip format. Only students that registered before can compete.
- A cloud NoSQL database (MongoDB): all information is saved in cloud in a MongoDB database (names, emails, answers and start time of competition). This cloud database is created in https://www.mongodb.com/es

## Setup

To allow the code to run on the server side, some prerequisites are needed:

- Install NodeJS and two packages:
	- `npm install express`: to manage the http requests
	- `npm install mongodb`: to manage the database connection

The code is ready to work with an existing MongoDB account in cloud. In case a new MongoDB database in another account is required, then just modify the [line 13](server.js#L13) in `server.js` and `server-competition.js` to connect to the new deployed database:

`MongoClient.connect('modify the database URL here',...)`

## Running the webpage

To run the registration webpage:

1. Run `node server.js`;
2. Students can connect to the server via `http://<ip>:<port>/`. It will guide them through a series of questions that they must answer;
3. After that, they register their name and email by accepting the terms and conditions;
4. A video is shown at the end. To change the video to show, just modify the video in [~/client/video/fin.mp4](client/video/). Keep `fin.mp4` as the name of the file, and of course in MP4 format.

To track the students that are registered, go to `http://<ip>:<port>/2d0k2043s7980423l20d8slim7ism` to see all information, or to `http://<ip>:<port>/2d0k2043s7980423l20d8slim7ism/email` to see only the emails.

To run the competition webpage:

1. Run `node server-competition.js`;
2. Once the students insert their email accounts and press the button "COMENZAR", it will automatically download a ZIP file with the coding problem that they must solve. This file has name "StarWars-Challenge.zip" and it is inside ~/client directory. To modify this project, just go to [line 51](server-competition.js#L51) in `server-competition.js` file and insert the path of the new ZIP folder (i.e. `response.download(__dirname + "/client/StarWars-Challenge.zip")`)