# smart-checkout-frontend

Smart Checkout is a mobile app that allows users to self-checkout from supermarkets without having to stand in long queues. This is the frontend of the application, check the [Backend Repo](https://github.com/Lujine/smart-checkout-backend "Backend application repo") of the application done with Node.JS, Express and MongoDB.

### Built With
- React Native
- Expo SDK

### Prerequisites
This project requires Node and npm to be installed on your machine. It has been tested on node version 10.15.0. The project is build with React Native Expo, thus the Expo SDK must be installed globally on your machine. And you need to install the Expo mobile app on your phone to quickly start up the application, no Android nor IOS setup is needed. 
This app was tested on Expo versions 3.4.1 and 3.7.1, and may not work with newer versions of the Expo SDK.
To instal expo:
```
npm i -g expo-cli@3.7.1
```

### Getting Started
1. git clone the repo or download as a zip file.
```bash
git clone https://github.com/Lujine/smart-checkout-frontend.git
```
2. Install the dependancies.
```sh
npm i
expo i
```

## Running the app
- start the development server
```sh
npm start
```
- Open the Expo mobile application and scan the QR code generated, the app will start shortly.

## Acknowlegements
This app was built with the help of the free version of [Material Kit React Native template by Creative Tim](https://www.creative-tim.com/product/material-kit-react-native "Material Kit React Native")

## License
[MIT](https://choosealicense.com/licenses/mit/)
