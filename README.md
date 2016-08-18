# generator-st [![NPM version][npm-image]][npm-url]
> Sublime text project scaffolding servant

## Installation

First, install [Yeoman](http://yeoman.io) and generator-st using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-st
```

Then generate your new project:

```bash
yo st
```

## Features

Creates a basic Sublime Text project.

#### User prompts:

* Project name
* Licence
* SCM provider
* SCM remore repository

#### Sugar

Setting up default remote repository for any supported SCM providers, so if you want to push somethins into yout git repository -- just type `git push` in a console.

#### SCM support

* Any Git repository
* Any Mercurial repository

>Assume, you allready have your desired repository installed in your environment.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Vlad Dotsenko](SOMEURL)


[npm-image]: https://badge.fury.io/js/generator-st.svg
[npm-url]: https://npmjs.org/package/generator-st
