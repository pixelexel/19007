# Student Analysis Portal

## Building the project
Requirements:
1. Python >= 3.3
2. Node >= 6.0

Building:
1. In the root of the repo, run `pip install -r requirements.txt`
2. Navigate to `./frontend` and run `npm install`

## Running the project
1. In `./frontend` run `npm run start`. This starts the webpack dev server
2. In root, run `python manage.py runserver`
3. Navigate to `localhost:8000` in browser

## Project Structure
- The React application resides in `./frontend/src`
    + index.js is the root of the application
    + App.js is the parent container
    + Container Components are in `./frontend/src/containers`
    + Presentation Components are in `./frontend/src/components`
    + Redux:
        * Actions and action creators reside in `./frontend/src/actions`
        * Reducers reside in `./frontend/src/reducers`
    + SCSS files are used for styling (if internal React styles are not being used). They reside in `./frontend/src/styles/`, and can be imported within components
- The Django api resides in `./studentapp`
