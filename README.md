# Avatar API
Koa based API for vector avatars

## API Request Types

**Avatar request**
```
https://avatar-links.herokuapp.com/[format]?[options]
```

#### Request parameters
##### Format _(required)_
* SVG
* PNG

##### Options
* boy
* girl
* man

### Installing

Clone the repo

```
git clone https://github.com/abhishekashyap/avatar-links
```

To install dependencies

```
npm install
```

To start the app use

```
npm start
```

On localhost

```
https://localhost:3000/[format]?[options]
```

## Example avatars

| ![Image of animated boy](avatars/img/boy-1.svg "Image of animated boy") | ![Image of animated girl](avatars/img/girl-1.svg "Image of animated girl") | ![Image of animated man](avatars/img/man-1.svg "Image of animated man") |
| --- | --- | --- |
| ![Image of animated man](avatars/img/man.svg "Image of animated man") | ![Image of animated girl](avatars/img/girl.svg "Image of animated girl") |  ![Image of animated man](avatars/img/man-2.svg "Image of animated man") |  ![Image of animated man](avatars/img/man-3.svg "Image of animated man") |


## Built With

* [Koa](https://koajs.com)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Abhishek Kashyap** - *Initial work* - [abhishekashyap](https://github.com/abhishekashyap)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details