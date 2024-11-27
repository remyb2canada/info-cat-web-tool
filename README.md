# GC Information Classification Tool (Prototype)

:warning: This repo is a prototype. It started as a personal project to help out IM colleagues at Correctional Service Canada (CSC) where we saw value in working in the open.

This repo is a prototype to provide guidance for GC employees in classifying the security of their information. 

It contains:
* *A information classification tool*: a series of questions one can answer to determine if their information is Unclassified, Protected, or Classified.
* *An injuty assessment tool*: a series of questions one can answer to determine at what level of Protected (A, B, or C) or Classified (Confidential, Secret, or Top Secret) is their information.
* *Guidance*: guidance documentation about how the GC is categorizing its information.

## :floppy_disk: Install and Run Locally

You need [Git installed](https://git-scm.com/downloads) on your machine first.

You can deploy this repo on your local machine using the following steps:

Clone this repo locally.

```bash
$ clone https://github.com/remyb2canada/info-cat-web-tool.git <your-folder-name>
$ cd <your-folder-name>
```

You can either deploy the site locally on your machine by having Node.JS installed, or a container (e.g. Docker).

** With Node.JS installed on your machine **

Ensure you're in the ```<your-folder-name>``` and that you have Node.JS version 18 or above

```bash
$ npm -v
v22.11.0
```

If you don't have the right Node.JS version, following the [installation instructions here](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs).

Install the dependencies (listed in ./package.json)

```bash
$ npm install
```

Start a development server locally that will give you a live, updating, preview of the site as you work:

```bash
$ npm run dev
```

The site should be running at ```http://localhost:4321/```

** With a container (e.g. Docker) **

TBD, haven't yet experimented with this.

[Astro Docs](https://docs.astro.build/en/recipes/docker/)

## 👀 Want to learn more?

See the [CONTRIBUTING.md](CONTRIBUTING.md) section. 
