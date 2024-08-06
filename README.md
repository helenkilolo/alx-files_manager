# ALX Files Manager

## Project Summary

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination, and background processing.

The objective is to build a simple platform to upload and view files:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (utils folder will be your friend)

Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product.

Enjoy!

## Resources

Read or watch:

- Node JS getting started
- Process API doc
- Express getting started
- Mocha documentation
- Nodemon documentation
- MongoDB
- Bull
- Image thumbnail
- Mime-Types
- Redis

## Learning Objectives

At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to create an API with Express
- How to authenticate a user
- How to store data in MongoDB
- How to store temporary data in Redis
- How to setup and use a background worker

## Requirements

- Allowed editors: vi, vim, emacs, Visual Studio Code
- All your files will be interpreted/compiled on Ubuntu 18.04 LTS using node (version 12.x.x)
- All your files should end with a new line
- A `README.md` file, at the root of the folder of the project, is mandatory
- Your code should use the `.js` extension
- Your code will be verified against lint using ESLint

## Provided files

- `package.json`
- `.eslintrc.js`
- `babel.config.js`

and…

Don’t forget to run `$ npm install` when you have the `package.json`

## Tasks

### 0. Redis utils

Inside the folder `utils`, create a file `redis.js` that contains the class `RedisClient`.

`RedisClient` should have:

- The constructor that creates a client to Redis:
  - Any error of the redis client must be displayed in the console (you should use `on('error')` of the redis client)
- A function `isAlive` that returns true when the connection to Redis is a success otherwise, false
- An asynchronous function `get` that takes a string key as argument and returns the Redis value stored for this key
- An asynchronous function `set` that takes a string key, a value and a duration in second as arguments to store it in Redis (with an expiration set by the duration argument)
- An asynchronous function `del` that takes a string key as argument and remove the value in Redis for this key

After the class definition, create and export an instance of `RedisClient` called `redisClient`.

```javascript
// utils/redis.js

import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient();
        this.client.on('error', (err) => console.error('Redis client error:', err));
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key);
    }

    async set(key, value, duration) {
        const setAsync = promisify(this.client.set).bind(this.client);
        return setAsync(key, value, 'EX', duration);
    }

    async del(key) {
        const delAsync = promisify(this.client.del).bind(this.client);
        return delAsync(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;

