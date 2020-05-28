# express-starter

express-starter is a quick boot cli.

## Folder Structure

```
├─bin
├─db
├─model
├─public
└─routes
```

## Technology Stack

### Back-end Framework

- [express](https://github.com/expressjs/express)
- [express-session](https://github.com/expressjs/session) - Simple session middleware for Express
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware

### NoSQL And Ecology

- [mongodb](https://github.com/mongodb/mongo)
- [mongoose](https://github.com/Automattic/mongoose) - ORM
- [connect-mongo](https://github.com/jdesboeufs/connect-mongo) - MongoDB session store for Express

### Configuration

- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.

### Logs

- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js

### Using es6 snytax by babel

```bash
npm i -D @babel/core @babel/preset-env @babel/register
```

```js
// register babel plugin
// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
  presets: ["@babel/preset-env"],
});
```

// TODO
