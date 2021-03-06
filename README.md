# Gatsby, Notion, and TailwindCSS blog starter

Kick off your project with this blog boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React and [TailwindCSS](https://tailwindcss.com/), a utility-first CSS framework for rapidly building custom designs.

I've added [Notion.so](https://notion.so/) as a cms as well as some plugins for seo, web site performance, rss feeds and support for dark mode.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 Quick start using docker

Software Requirements

* [Docker](https://www.docker.com/products/docker-desktop)
* [Git](https://git-scm.com/downloads)
* Text editor ([VS code](https://code.visualstudio.com/download) recommended)
* Terminal or (VS Code's built in terminal)

1. Copy this to a blank text document and replace your name and email

```shell:
docker build \
    --build-arg GATSBY_THEME="https://github.com/kahunacoder/gatsby-notion-starter.git" \
    --build-arg GIT_USER_NAME="Your Name" \
    --build-arg GIT_EMAIL="you@youremail" \
https://github.com/kahunacoder/docker-gatsby.git -t gatsby-blog
```

2. Paste edited version into your terminal.
1. After the container is built paste this into your terminal
```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog develop```
1. Proceede to step 3 below.

## 🚀 Quick start if Gatsby is installed locally

1. **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the TailwindCSS blog starter.

    ```shell
    # create a new Gatsby site using the blog starter
    gatsby new site https://github.com/kahunacoder/gatsby-notion-starter
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd site/
    gatsby develop
    ```

1. **Open the source code and check the following!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## Make this site your own

### Edit the sites meta data into your gatsby-config.js file

Replace the `siteMetadata` fields with your own. Remove options you don't use.

```jsx
  siteMetadata: {
    title: `Site Title`,
    author: `Your name`,
    description: `A blog.`,
    siteUrl: `http://example.com/`,
    siteVerification: {
      google: ``,
      bing: ``
    },
    social: {
      twitter: ``,
      linkedin: ``,
      facebook: ``,
      stackOverflow: ``,
      github: ``,
      instagram: ``,
      pinterest: ``,
      youtube: ``,
      email: ``,
      phone: ``,
      fax: ``,
      address: ``
    },
    keywords: ``,
    organization: {
      name: ``,
      url: ``
    },
  },
```

### Duplicate the content table

Duplicate the table at <https://www.notion.so/kahunacoder/b3189a381ce8490796fea90fa68310c2?v=4a46e38c7e514dee8ffbaf3ad690313e>

### Edit this piece of code into your `gatsby-config.js` file

Replace the `table` url with the one you duplicated in the previuos step.

```jsx
plugins: [
    {
      resolve: `@kahunacoder/docker-notion-database`,
      options: {
        sourceConfig: [
          {
            name: 'posts',
            table: 'https://www.notion.so/kahunacoder/b3189a381ce8490796fea90fa68310c2?v=4a46e38c7e514dee8ffbaf3ad690313e',
            cacheType: 'html'
          }
        ]
      }
    }
]
```

### Save your changes and stop the development server

In your terminal hold the `control` key down and press the `c` key

### Restart the development server in docker

 Verify your changes by pasting this (edit as needed) into the termianl and visiting <http://localhost:8000>

```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog develop```

Commands

* ```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog sh```
* ```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog develop```
* ```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog develop-no-cache```
* ```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog stage```
* ```docker run -it --rm -v $(pwd)/site:/site -p 8000:8000 gatsby-blog build```

## Developing in the docker container?

Visit this url <https://github.com/kahunacoder/docker-gatsby>


## 🧐 What's inside this starter?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    └── tailwind.config.js

1. **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3. **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4. **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9. **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`postcss.config.js`**: The [PostCSS](https://postcss.org/) configuration file where TailwindCSS is configured as a plugin and other plugins like autoprefixer or postcss-purgecss can be added.

13. **`README.md`**: A text file containing useful reference information about your project.

11. **`tailwind.config.js`**: The [TailwindCSS](https://tailwindcss.com/) configuration file, see their documentation for more information on how to customize Tailwind.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

Edit this button to point to your own website when your ready.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kahunacoder/gatsby-notion-starter)
