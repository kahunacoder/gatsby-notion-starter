const path = require(`path`)
const kebabCase = require("lodash/kebabCase")

//Hook into the createSchemaCustomization API
//This hook runs after all our nodes have been created
exports.createSchemaCustomization = ({ actions, schema }) => {
  //The createTypes action allows us to create custom types
  //and modify existing ones
  const { createTypes } = actions

  // Create our schema customizations
  const typeDefs = [
    // Replace "sanity_post" with your _typename of your post type
    "type posts implements Node { related: [posts] }",
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
                  status: { eq: "published" },
                  content_type: { eq: "article" }
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
        filter: {status: {eq: "published"}, content_type: {eq: "article"}}
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
      sectionsGroup: allPosts(limit: 2000) {
        group(field: section) {
          fieldValue
        }
      }
      tagsGroup: allPosts(limit: 2000) {
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
      // post.node.related.length
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

