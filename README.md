# next-api

Next.js includes its own server with `next start` by default. If you have an existing backend, you can still use it with Next.js (this is not a custom server). A custom Next.js server allows you to programmatically start a server for custom patterns. The majority of the time, you will not need this approach. However, it's available if you need to eject.

[View the Docs](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)

## Good to Know

- Before deciding to use a custom server, keep in mind that it should only be used when the integrated router of Next.js can't meet your app requirements. A custom server will remove important performance optimizations, like [Automatic Static Optimization](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization).
- A custom server cannot be deployed on [Vercel](https://vercel.com/frameworks/nextjs).
- When using standalone output mode, it does not trace custom server files. This mode outputs a separate minimal `server.js` file, instead. These cannot be used together.

## Quick Start

```bash
$ nvm use
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
