# Camping App

Is a mobile app for two major platform developed using React Native & Expo & Firebase for authentication & Redux Toolkit as a internal decentralized store & MongoDB for the main storage.

## Getting started

### 1. Run application locally (without building)

* Download [Node.js](https://nodejs.org/uk/) package manager.
* Clone or download project sources (a green icon in the action bar).
* Under the downloaded folder open window terminal (or another one like powershell or git bash).
* Install all the project dependencies:

```bash
npm install
```

* Create `.env` file in the project root folder a same structure:

```env
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_KEY
REACT_APP_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_GOOGLE_WEBCLIENT_ID=YOUR_GOOGLE_WEBCLIENT_ID.apps.googleusercontent.com.apps.googleusercontent.com
REACT_APP_CLIENT_ID=REACT_APP_GOOGLE_WEBCLIENT_ID (IDK why :) )
REACT_APP_CAMPING_API_KEY=YOUR_CAMPING_API_KEY
REACT_APP_CAMPING_BASE_URL=https://developer.nps.gov/api/v1/campgrounds
REACT_APP_BACKEND_URL=YOUR_BACKEND_SERVICE_URL
```

Additional info to the last variable (connecting the backend service) - [look at my Camping API repo](https://github.com/GGO-web/Camping-API) or [use my testing one](https://camping-api-ggo.onrender.com/api)

***So now all code is prepared but we need to configure out a mobile device***

1. First of all install Expo Go application from Google Play (Android) or App Store (IOS).
2. Run the development server in windows terminal:

```bash
npm run start 
```

3. Wait until expo is ready and scan the QR code of the application (for the reason when you don't see it press `C` button or `?` to show all the commands):

4. Open QR code scanner (for Android) or Camera for the IOS and follow the link, wait when bundle ended and see the working app.

### 2. Install application Android bundle APK

* Application for android devices is available or the right panel in this repo below **About section**

### 3. Install development build for Android (without Expo Go app)

* Firstly install build [follow this link](https://expo.dev/accounts/ggo_webdev/projects/camping-app-by-ggo/builds/db6cb34d-3dba-4917-9176-43986752af6d)
* Install application and [run application locally](https://github.com/GGO-web/Camping-App#1-run-application-locally-without-building) but ***don't install Expo Go application***


## Links & Sources

1. Node.js environment - https://nodejs.org/uk/
2. Expo documentation - https://docs.expo.dev/
3. Camping location api used in the app - https://www.nps.gov/subjects/developer/api-documentation.htm
4. Camping backend documentation - https://camping-api-ggo.onrender.com/api-docs/)
5. For an environment variable REACT_APP_BACKEND_URL **[use that link](https://camping-api-ggo.onrender.com/api)**.