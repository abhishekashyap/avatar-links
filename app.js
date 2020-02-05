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

router.get('/', ctx => {
    // Default route
    ctx.body = 'Avatar API - https://github.com/abhishekashyap/avatar-links';
})

router.get('/:format', ctx => {
    // localhost:3000/format?querystring

    // Check if query string is empty
    if (Object.entries(ctx.request.query).length === 0) {
        // For single paramters (FORMAT)
        randomFile(ctx.params.format, ctx)
            .then((link) => {
                ctx.body = link;
            })
            .catch(err => console.log(err));

    } else {
        // For two parameters (FORMAT?GENDER=...)
        randomFileGender(ctx.params.format, ctx.request.query.gender, ctx)
            .then((link) => {
                ctx.body = link;
            })
            .catch(err => console.log(err));
    }
});

async function randomFile(format, ctx) {
    // random svg
    let filenames = glob.sync('avatars/img/*.' + format).map(name => path.basename(name)); // returns basename instead of absolute path

    let n = Math.floor(Math.random() * (filenames.length)); // Generating random array index

    if (filenames.length == 0) {
        throw new Error('404: Wrong GET request');
    } else {
        return ctx.host + '/img/' + filenames[n];
    }
}

async function randomFileGender(format, gender, ctx) {
    let filenames = glob.sync('avatars/img/' + gender + '*.' + format).map(name => path.basename(name));

    let n = Math.floor(Math.random() * (filenames.length));

    if (filenames.length == 0) {
        throw new Error('404: Wrong GET request');
    } else {
        return ctx.host + '/img/' + filenames[n];
    }
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`App is listening on port:${PORT}`));