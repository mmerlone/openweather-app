![ProjectMark logo](https://cdn.prod.website-files.com/623b8abd0d554b6266b0b6b5/63c9c7fe8cce38960cea03b1_Logo%20ProjectMark%20Main.svg)
# Openweather app

## About
This application show the current weather condidtions for three cities:
- San Francisco, CA, USA
- Joinville, SC, Brasil
- Urubici, SC, Brasil

This project runs on [Vite](https://vite.dev/), using [React](https://react.dev/) and [Typescript](https://react.dev/learn/typescript).

It queries the Openweathermap API for weather data every 10 minutes and displays the information on cards.

## Run the code
First you need a Openweather API KEY. Go to [https://openweathermap.org/](https://openweathermap.org/) and create an account if you don't have one. Then go to ["API Keys"](https://home.openweathermap.org/api_keys) and create a new Openweather API key and copy it.

Then copy the `.env.example` file to `.env`, edit it with your editor of choice, and add your Openweathermap API key on `VITE_OWM_API_KEY`:
```sh
cp .env.example .env
vi .env
```

Next, run the code, executing the following commands:
```sh
npm install
npm run dev
```

The application will be available on your browser at [http://localhost:5173/](http://localhost:5173/)

## Build
To build the application, run the following commands:
```sh
npm run build
```
