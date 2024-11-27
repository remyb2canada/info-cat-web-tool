# Contributing

This is a work in progress so changes are being done periodically everything should be considered work in progress.

## Tech Stack

* [Astro Static Site Generator](https://astro.build/)
* [VueJS](https://vuejs.org/)
* [GC Design System](https://design-system.alpha.canada.ca/), as a a 'NodeJS with no Javascript framework'

## :beginner: Beginner?

Everyone starts somewhere. I've had to read a few tutorials and get up to speed on my (very old) web development experience. 

### Astro

Astro is a [Static Site Generator](https://en.wikipedia.org/wiki/Static_site_generator), one that is growing popular in the [community](https://jamstack.org/generators/).
It is based on [Node.JS](https://nodejs.org/en/about) and leverages a mixture of layouts and components to build a static website (components allow a developer to make something once, and re-use it multiple times throughout its site).
To get up to speed with Astro:

* [Do this tutorial](https://docs.astro.build/en/tutorial/0-introduction/)
* [Watch this youtube tutorial](https://www.youtube.com/watch?v=acgIGT0J99U&t=32s) to know what else you can do.

### VueJS

VueJS is a javascript front-end framework that allows you to make web pages more interactive (react to events and change the layout on the fly).
To get up to speed with Astro:

* [Do this tutorial](https://vuejs.org/tutorial/#step-1). On the top left where it says "API Preference", make sure you select "Composition" and "SFC".
* [Read Astro's documentation about integration with VueJS](https://docs.astro.build/en/guides/integrations-guide/vue/)
* [Watch this youtube video introduction](https://www.youtube.com/watch?v=e9NV6mBKe30) to understand the integration of VueJS with Astro.

### GC Design System

GC Design System is a project by the Canadian Digital Service (CDS) to provide re-usable web components to GC departments when designing their online services.
To get up to speed with the GC Design System:

* [Visit their web page here](https://design-system.alpha.canada.ca/)

Note that for this project, the [installation of GC Design System](https://design-system.alpha.canada.ca/en/installation/) used the 'NodeJS with no Javascript framework' option.
Though VueJS is integrated, the main idea of this project was a static site (Astro, based on Node.JS) so I didn't used the VueJS GC Design System installation.
If that was a mistake, contact me as I'm also learning.

### Mistral.ai and W3Schools

[Mistral.ai](https://mistral.ai/) LeChat was used extensively to get up to speed and get things working.

[W3SChools](https://www.w3schools.com/) was also a good resource to read javascript, HTML, and CSS documentations when I was having problems.

## 🚀 Project Structure

Inside this Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
|   └── components/
|   |   └── AstroComponent.astro
|   |   └── vuejs/
|   |       └── VueJSComponent.vue
|   └── data/
|   |   └── someData.json
|   └── i18n/
|   |   └── utils.js
|   └── layouts/
|   |   └── AstroLayout.astro
│   └── pages/
|       └── en/
|       |   └── index.astro
|       └── fr/
│           └── index.astro
└── package.json
```

* *src/components folder*: Where both [Astro components](https://docs.astro.build/en/basics/astro-components/) (\*.astro) and [VueJS components](https://vuejs.org/guide/essentials/component-basics) (\*.vue) are stored
* *src/data folder*: Where raw data like the list of questions used to generate the questionnaire are stored.
* *src/i18n folder*: Where common javascript functions used for [Astro's Internationalization Routing is used](https://docs.astro.build/en/guides/internationalization/).
* *src/layouts folder*: Where [Astro layouts](https://docs.astro.build/en/basics/layouts/) are stored
* *src/pages folder*: Where [Astro pages](https://docs.astro.build/en/basics/astro-pages/) are stored. The pages are grouped under 2 sub-folders representing english content and french content (e.g. "en" for english pages).

## Build Process

Though this project is based on Astro, it is integrated with VueJS to provide interactivity for certain pages.
It also uses GC Design System web components.

Before deploying the static site, it needs to be build.
Astro's build process uses the following command:

```npm run build```

The result is a ```dist/``` folder that will contain the HTML pages compiled from the .astro files.
That ```dist/``` folder is where the static site will be.

Because of its integration with GC Design System (web components part of the node_modules), the build process requires additional commands. 
This because node.js applications typically require copying the ```package.json``` file into the ```dist/``` folder and run ```npm install``` to install the dependencies ([resolution found here](https://github.com/withastro/astro/issues/7247#issuecomment-1576200139)).

```cp package.json ./dist/ && cd dist && npm install```

The above as added as the npm script "build-gcds" (see the package.json file).

## Deployment

I am still experimenting on the deployment of the resulting static site.
I am currently using my free subscription from MS Azure and [Azure Static Web App](https://docs.astro.build/en/guides/deploy/microsoft-azure/).

