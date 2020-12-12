module.exports = {
  siteMetadata: {
    title: `My Blog`,
    description: `A blog.`,
    siteUrl: `http://example.com/`,
    author: {
      name: `First Last`,
      location: `AnyWhere`
    },
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPosts } }) => {
              return allPosts.edges.map(edge => {
                return Object.assign({}, {
                  title: site.siteMetadata.title + " :: " + edge.node.title,
                  description: edge.node.desc,
                  date: edge.node.publish_date.startDate,
                  url: site.siteMetadata.siteUrl + "/" + edge.node.section + "/" + edge.node.url,
                  guid: site.siteMetadata.siteUrl + "/" + edge.node.section + "/" + edge.node.url,
                  // custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allPosts(
                  filter: {status: {eq: "published"}}
                  sort: { fields: [publish_date___startDate], order: DESC }
                ) {
                  edges {
                    node {
                      title
                      url
                      section
                      desc
                      publish_date{
                        startDate(formatString: "ddd, DD MMM YYYY HH:mm:ss ZZ", fromNow: false)
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            // match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false
  }
}
