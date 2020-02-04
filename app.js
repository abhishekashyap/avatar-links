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

router.get('/:format', ctx => {
    // localhost:3000/format?querystring
    console.log(ctx.query);
    
    // For single paramters (FORMAT)
    randomFile(ctx.params.format, ctx)
        .then((link) => {
            console.log(link);
            ctx.body = link;
        })
        .catch(err => console.log(err));

    // For two parameters (GENDER-FORMAT)
    randomFileGender(sex, format, ctx)
        .then((link) => {
            console.log(link);
            ctx.body = link;
        })
        .catch(err => console.log(err));
});

async function randomFile(format, ctx) {
    // random svg
    let filenames = await glob.sync('avatars/*.' + format).map(name => path.basename(name)); // returns basename instead of absolute path

    let n = Math.floor(Math.random() * (filenames.length)); // Generating random array index

    if (filenames.length == 0) {
        throw new Error('404: Wrong request');
    } else {
        return ctx.host + '/' + filenames[n];
    }
}

async function randomFileGender(sex, format, ctx) {
    let filenames = await glob.sync('avatars/' + sex + '*.' + format).map(name => path.basename(name));

    let n = Math.floor(Math.random() * (filenames.length));

    if (filenames.length == 0) {
        throw new Error('404: Wrong request');
    } else {
        return ctx.host + '/' + filenames[n];
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));