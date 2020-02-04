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

async function randomFileGender(sex, format, ctx) {
    let filenames = await glob.sync('avatars/' + sex + '*.' + format).map(name => path.basename(name));

    let n = Math.floor(Math.random() * (filenames.length));

    return ctx.host + '/' + filenames[n];
}

router.get('/:format', ctx => {
    randomFile(ctx.params.format, ctx).then((link) => {
        console.log(link);
    })
});


router.get('/:sex', ctx => {
    console.log(ctx.params.sex);

    let link = ctx.params.sex.split("-");

    if (link.length == 2) {
        const sex = link[0];
        const format = link[1];

        randomFileGender(sex, format, ctx).then((link) => {
            console.log(link);
        });
    }
    
});

const PORT = 3000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));