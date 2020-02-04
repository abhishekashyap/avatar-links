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

async function randomFile(format, ctx) {
    // random svg
    
    let filenames = await glob.sync('avatars/*.' + format).map(name => path.basename(name)); // returns basename instead of absolute path
    
    let n = Math.floor(Math.random() * (filenames.length)); // Generating random array index
    
    return ctx.host + '/' + filenames[n];
}

router.get('/:format', ctx => {
    randomFile(ctx.params.format, ctx).then((link) => {
        console.log(link);
    })
});


// router.get('/svg', ctx => {
    
// });

const PORT = 3000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));