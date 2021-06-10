const path = require(`path`)
const kebabCase = require("lodash/kebabCase")
const isArray = require("lodash/isArray")
const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { parseImageUrl } = require("@conradlin/notabase/src/utils")
const sharp = require('sharp')
sharp.simd(false)
sharp.cache(false)

//Hook into the createSchemaCustomization API
//This hook runs after all our nodes have been created
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  //The createTypes action allows us to create custom types
  //and modify existing ones here we add the new coverImage node
  // that contains information about the local version of cover_image.
  createTypes(`
    type posts implements Node {
      coverImg: File @link(from: "coverImg___NODE")
    }
  `)

  // Create our schema customizations to add a table of contents to the section
  // each post is in on so on the post page we can use this for pevious/next links
  const typeDefs = [
    "type posts implements Node { toc: [posts] }",
    schema.buildObjectType({
      name: "posts",
      fields: {
        toc: {
          type: "[posts]",
          resolve: async (source, args, context, info) => {
            const posts = await context.nodeModel.runQuery({
              query: {
                filter: {
                  section: { eq: source.section },
                  status: { eq: "published" }
                },
                sort: {
                  fields: ["publish_date.startDate"],
                  order: ["DESC"],
                },
              },
              type: "posts",
            })
            return posts && posts.length ? posts : []
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const sectionTemplate = path.resolve(`./src/templates/sections.js`)
  const tagsTemplate = path.resolve(`./src/templates/tags.js`)
  const blogTemplate = path.resolve(`./src/templates/blogPost.js`)

  const blogPost = await graphql(`
  query {
      allPosts(
        filter: {status: {eq: "published"}}
        sort: { fields: [publish_date___startDate], order: DESC }
      ) {
        edges {
          node {
            slug
            title
            url
            section
            toc {
              title
              url
              section
              publish_date{
                startDate(formatString: "MMMM Do YYYY", fromNow: false)
              }
            }
          }
        }
      }
      sectionsGroup: allPosts(
        limit: 2000
        filter: {status: {eq: "published"}}
        ) {
        group(field: section) {
          fieldValue
        }
      }
      tagsGroup: allPosts(
        limit: 2000
        filter: {status: {eq: "published"}}
        ) {
        group(field: tags) {
          fieldValue
        }
      }
    }
    `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }
    const posts = result.data.allPosts.edges
    posts.forEach((post) => {
      createPage({
        path: "/" + post.node.section + "/" + post.node.url + "/",
        component: blogTemplate,
        context: {
          slug: post.node.slug,
          url: "/" + post.node.section + "/" + post.node.url + "/",
          section: post.node.section,
        },
      });
    });
    const sections = result.data.sectionsGroup.group
    sections.forEach((section) => {
      createPage({
        path: section.fieldValue + "/",
        component: sectionTemplate,
        context: {
          section: section.fieldValue
        },
      })
    });
    const tags = result.data.tagsGroup.group
    tags.forEach((tag) => {
      createPage({
        path: "/tags/" + kebabCase(tag.fieldValue) + "/",
        component: tagsTemplate,
        context: {
          tags: tag.fieldValue
        },
      })
    });
  });
  return Promise.all([blogPost,]);
};

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all Post nodes that have a cover_image url, call createRemoteFileNode
  if (
    node.internal.type === "posts" &&
    node.cover_image !== null &&
    isArray(node.cover_image)
  ) {
    let coverimageURL = parseImageUrl(node.cover_image[0], 1048, node.slug)
    let fileNode = await createRemoteFileNode({
      url: coverimageURL, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.coverImg___NODE = fileNode.id
    }
  }
}
