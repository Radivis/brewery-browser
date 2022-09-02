# Brewery Browser

## Requirements

Have [node.js](https://nodejs.org) installed on your device. Node version 16.15.1 or higher suffices.
You can check your currently installed version in a console window with

### `node -v`

## Installation

### 1) Install necessary node modules

Open a console and move to the project directory. Then type:

### `npm install`

### 2) Start user data server

If you want to use the app with user data, you need to start the user data server first:

### `cd src/backend`
### `node server.js`

The data server runs on port 3010 by default. If that happens to be used already, you need to edit port constant in the server.js file first.

### 3) Start app

Finally, start the app in a different console window or tab with:

### `npm start`

A new browser tab in your default browser should open now.

## App description

The Brewery Browser uses data from the API of [Open Brewery DB](https://www.openbrewerydb.org).
Users can search for breweries via the search form.

Users can register a user account and then

- favorite
- rate
- comment

a brewery.

The top 3 breweries can be found on the ranking page.

## Default data

The user data is stored in the file `src/backend/store.json`.

For now the passwords are stored in plain text(!), so you can look them up there.

If you want to start with a user with a decent amount of data, pick "Test4". The password is "Test4", too.

Passwords for newly registered users need to be at least 8 characters long.

## Remarks

This project has been the result of a final assignment in a React "bootcamp" course by [alfatraining](https://www.alfatraining.com).

## License
MIT, see LICENSE.txt.
