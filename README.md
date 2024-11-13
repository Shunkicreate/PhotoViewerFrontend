# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## 開発環境
compose buildして、upする
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`

compose up
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

Dockerの状態確認
`docker ps`

Docker compose down
`docker-compose down`

## 本番環境
compose buildして、upする
`docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`
compose up
`docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

ログを見る
`docker logs remix-app-container`
`docker logs nginx-container`
