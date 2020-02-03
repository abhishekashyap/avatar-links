'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const glob = require('glob');

const app = new Koa();
const router = new Router();

app.use(router.allowedMethods());
app.use(router.routes());
app.use(require('koa-body')()); // Body parser

app.use(serve(path.join(__dirname, 'avatars'))); // Serving a static folder

function randomFile(format, ctx) {
    // random svg
    let filenames = glob.sync(path.join('avatars/*.', format)).map(name => path.basename(name)); // returns basename instead of absolute path
    let n = Math.floor(Math.random() * (filenames.length)); // Generating random array index
    return path.join(ctx.host, filenames[n]);
}

// router.get('/:format', cts => {

// });


router.get('/svg', ctx => {
    console.log(randomFile('svg', ctx));
});

// router.get('/boy-svg', ctx => {

// });

// router.get('/girl-svg', ctx => {

// });

// router.get('/png', ctx => {

// });

// router.get('/boy-png', ctx => {

// });

// router.get('/girl-png', ctx => {

// });

const PORT = 3000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));