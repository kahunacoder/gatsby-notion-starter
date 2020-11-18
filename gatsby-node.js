const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const tagTemplate = path.resolve(`./src/templates/tags.js`)
  const blogTemplate = path.resolve(`./src/templates/blogPost.js`)

  const blogPost = await graphql(`
  query {
      allPosts(filter: {status: {eq: "published"}, content_type: {eq: "article"}}) {
        edges {
          node {
            slug
            title
            url
            category
          }
        }
      }
    }
    `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }
    const posts = result.data.allPosts.edges
    // console.log(posts)
    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      // console.log(post)
      // console.log(index)
      // result.data.allPosts.nodes.forEach(({ slug, url }) => {
      // { "/" + previous.category + "/" + previous.url }
      createPage({
        path: "/" + post.node.category + "/" + post.node.url,
        component: blogTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: post.node.slug,
          url: "/" + post.node.category + "/" + post.node.url,
          previous,
          next
        },
      });
    });

  });

  //   // Extract tag data from query.
  //   const tags = result.data.tagsGroup.group

  //   // Make tag pages.
  //   tags.forEach(tag => {
  //     createPage({
  //       path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
  //       component: tagTemplate,
  //       context: {
  //         tag: tag.fieldValue,
  //       },
  //     })
  //   })
  // }



  const tagsGroup = await graphql(`
query {
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
    const tags = result.data.tagsGroup.group
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })
  });

  // return Promise.all([blogPost, newsPost]);
  return Promise.all([blogPost, tagsGroup]);
};

