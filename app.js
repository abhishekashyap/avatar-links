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

router.get('/svg', ctx => {
    // random svg
    let filenames = glob.sync('avatars/*.svg').map(name => path.basename(name));
    let n = Math.floor(Math.random() * (filenames.length)); // Generating random array index
    console.log(filenames.length);
    console.log(n);

});

router.get('/boy-svg', ctx => {

});

router.get('/girl-svg', ctx => {

});

router.get('/png', ctx => {

});

router.get('/boy-png', ctx => {

});

router.get('/girl-png', ctx => {

});

const PORT = 3000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));