module.exports = {
  siteMetadata: {
    title: `KahunaCoder`,
    author: `Gary Smith`,
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
  plugins: [
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark-mode',
        classNameLight: 'light-mode',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
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
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-background-image-es5',
      options: {
        // add your own characters to escape, replacing the default ':/'
        specialChars: '/:',
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/tags/links`]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
  ],
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false
  }
}
