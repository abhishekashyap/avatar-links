const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(router.allowedMethods());
app.use(router.routes());
app.use(require('koa-body')()); // Body parser


app.use(ctx => {
    ctx.body = 'Hello';
})

const PORT = 3000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));