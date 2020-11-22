require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config({path: 'development.env'});

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, ALLOWED_EMAIL_TOKEN } = process.env;
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_product_listings, write_orders', 'write_checkouts'],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        // Store token on Aveste

          if (accessToken) {
            fetch('http://localhost:8000/api/update_vendor/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Token ${ALLOWED_EMAIL_TOKEN}`
                },
                body: JSON.stringify({"name": shop, "api_access_token": accessToken})
              })
              // A list of promises
              .then(function(response) {
                if (response.status == 200) {
                  console.log(response.status)
                  return response.json()
                } else {
                  console.log(response.status)
                }
              }).then(json => {
                console.log(json)
              
              }).catch(error => {
                console.log(error)
              });
          };


        ctx.redirect('/');
      },
    }),
  );

  // Koa stuff
  server.use(graphQLProxy({version: ApiVersion.April20}))
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
