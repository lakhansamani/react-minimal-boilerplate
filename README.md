# Minimal React Boilerplate

Fully customizable React boilerplate, using latest `React`, `webpack` and `babel`. It includes production build process + local development using `webpack-dev-server` with hot reload.

## How to use?

- `git clone https://github.com/lakhansamani/react-minimal-boilerplate.git`
- [Optional] `mv react-minimal-boilerplate PROJECT_NAME`
- `cd react-minimal-boilerplate` or `cd PROJECT_NAME`

### Development

- `yarn && yarn start`

### Production

- `yarn build`
- Production build will be part of `dist` folder

### Testing

- `yarn test`
- If you change content of `src/App.js` then you might have to change the test in `src/App.test.js`. Also similarly you can add test for more components.

### How to add env variables to the application

- `cp .env.sample .env`
- There is a sample env variable declared there, you can replace that and add more env variables.
