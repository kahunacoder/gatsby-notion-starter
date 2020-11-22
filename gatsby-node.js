const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const categoryTemplate = path.resolve(`./src/templates/categories.js`)
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
      categoriesGroup: allPosts(limit: 2000) {
        group(field: category) {
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
        path: "/" + post.node.category + "/" + post.node.url + "/",
        component: blogTemplate,
        context: {
          slug: post.node.slug,
          url: "/" + post.node.category + "/" + post.node.url + "/",
          category: post.node.category
        },
      });
    });
    const categories = result.data.categoriesGroup.group
    categories.forEach((category) => {
      createPage({
        path: category.fieldValue + "/",
        component: categoryTemplate,
        context: {
          category: category.fieldValue
        },
      })
    })
  });
  return Promise.all([blogPost,]);
};

