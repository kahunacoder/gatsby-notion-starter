const path = require(`path`)

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
        related: {
          type: "[posts]",
          //The resolve field is called when your page query looks for related posts
          //Here we can query our data for posts we deem 'related'
          //Exactly how you do this is up to you
          //I'm querying purely by category
          //But you could pull every single post and do a text match if you really wanted
          //(note that might slow down your build time a bit)
          //You could even query an external API if you needed
          resolve: async (source, args, context, info) => {
            //source is the current (post) object
            //context provides some methods to interact with the data store

            //Map a simple array of category IDs from our source object
            //In my data each category in the array is an object with a _id field
            //We're just flattening that to an array of those _id values
            //E.g. categories = ["1234", "4567", "4534"]
            // const categories = source.category.map((c) => c.slug)

            //If this post has no categories, return an empty array
            // if (!categories.length) return []

            //Query the data store for posts in our target categories
            const posts = await context.nodeModel.runQuery({
              query: {
                filter: {
                  //We're filtering for categories that are sharedby our source node
                  category: { eq: source.category },
                  //Dont forget to exclude the current post node!
                  // slug: { ne: source.slug },
                },
              },
              //Change this to match the data type of your posts
              //This will vary depending on how you source content
              type: "posts",
            })
            //Gatsby gets unhappy if we return "null" here
            //So check the result and either return an array of posts,
            //or an empty array
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
            related {
              title
              url
              category
            }
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
      // post.node.related.length
      createPage({
        path: "/" + post.node.category + "/" + post.node.url + "/",
        component: blogTemplate,
        context: {
          slug: post.node.slug,
          url: "/" + post.node.category + "/" + post.node.url + "/",
          category: post.node.category,
          catTotal: post.node.related.length
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

