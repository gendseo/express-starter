# express-starter

express-starter is a quick boot cli.

## Folder Structure

```

```

## Technology Stack

### Back-end Framework

- [express](https://github.com/expressjs/express)
- [express-session](https://github.com/expressjs/session) - Simple session middleware for Express.
- [cors](https://github.com/expressjs/cors) - Node.js CORS middleware.
- [csurf](https://github.com/expressjs/csurf) - Node.js CSRF protection middleware.
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js.
- [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.
- [pm2](https://github.com/Unitech/pm2) - Node.js Production Process Manager with a built-in Load Balancer.
- [cross-env](https://github.com/kentcdodds/cross-env) - Cross platform setting of environment scripts.

### NoSQL And Ecology

- [mongodb](https://github.com/mongodb/mongo)
- [mongoose](https://github.com/Automattic/mongoose) - ORM
- [connect-mongo](https://github.com/jdesboeufs/connect-mongo) - MongoDB session store for Express

### API doc

- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - Generates swagger doc based on JSDoc.
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - Adds middleware to your express app to serve the Swagger UI bound to your Swagger document. This acts as living documentation for your API hosted from within your app.

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

## TODO

### 1、接口文档

- jsdoc
- swagger

### 2、用户-角色权限-资源管理设计

- casbin
- 数据库动态赠删改查

### 3、权限验证中间件

### 4、日志生成中间件
