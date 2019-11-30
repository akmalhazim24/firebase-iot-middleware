# Introduction
This is an Firebase-based IoT middleware that allows collecting data from other devices.

### How to use?
1. Install Node 8 or above
2. Clone this repository to a folder
3. Run ```npm install```
4. Copy ```config.js.example``` as ```config.js```
5. Register and create a Firebase project
6. Get the service account and keep the JSON file
7. Take note the ```DATABASEURL``` from Firebase.
8. Go to the project directory and create ```/secrets``` directory
9. Place the JSON file from Firebase to ```/secrets``` as ```firebase.json```
10. Go to the ```config.js``` and rename the ```https://YOURDATABASEURL.firebaseio.com``` to the one that you took from Firebase.
11. Done!

### API Specifications
1. ```GET http://localhost/send``` with query strings parameters ```temperature``` and ```humidity```.
2. ```GET http://localhost/records```