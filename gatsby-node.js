const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = await graphql(`
  query {
      allPosts(filter: {status: {eq: "published"}, content_type: {eq: "article"}}) {
        edges {
          node {
            slug
            title
            url
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
      createPage({
        path: `posts/${post.node.url}`,
        component: path.resolve(`./src/templates/blogPost.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: post.node.slug,
          url: `posts/${post.node.url}`,
          previous,
          next
        },
      });
    });
  });
  // const newsPost = await graphql(`
  // query {
  //     allPosts(filter: {status: {eq: "published"}, content_type: {eq: "newsletter"}}) {
  //         nodes {
  //           slug
  //           url
  //         }
  //       }
  //     }
  //   `).then(result => {
  //   if (result.errors) {
  //     Promise.reject(result.errors);
  //   }
  //   const news = result.data.allPosts.nodes
  //   console.log(news)
  //   news.forEach(({ post, index }) => {
  //     const previous = index === news.length - 1 ? null : news[index + 1].node
  //     const next = index === 0 ? null : news[index - 1].node

  //     createPage({
  //       path: `subscribe/news/${post.node.url}`,
  //       component: path.resolve(`./src/templates/blogPost.js`),
  //       context: {
  //         // Data passed to context is available
  //         // in page queries as GraphQL variables.
  //         slug: post.node.slug,
  //         previous,
  //         next
  //       },
  //     });
  //   });
  // });

  // return Promise.all([blogPost, newsPost]);
  return Promise.all([blogPost]);
};

