# restaurant-app

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Stack
- Vue 3
- Vite

## Development quick start

### Setting up development environment

1. Clone repository

```bash
git clone .....
```

2. Install dependencies

```bash
npm install
```

### Running application in development mode

```bash
npm run dev
```


### Building distribution code

```bash
npm run build
```

## Building docker image

```bash
docker build -t restaurant-app:latest .
```


## Configuration

Application configuration variables are located in `.env.*` files. Each environment has its own configuration file.
Copy or download one.
```bash
cp .env.example .env
```

## Production deployment

For `production` deployment of application:

1. Create container image `docker build -t restaurant-app:latest .`
2. Create (or download available) `.env` configuration file.

```bash
docker run -it -p 8080:80 -d --name restaurant-app restaurant-app:latest
```

- Application is accessible via port `8080`
