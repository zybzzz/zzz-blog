import PropTypes from "prop-types";
import React from "react";

import Item from "./Item";

const Blog = props => {
  const { posts, theme, pageNum, pageSize} = props;

  let sliPosts;
  let start = (pageNum - 1) * pageSize;
  console.log(start);
  console.log(start + pageSize);
  console.log(posts.length)
  if (start + pageSize > posts.length){
    sliPosts = posts.slice(start);
  }else {
    sliPosts = posts.slice(start, start + pageSize );
  }

  return (
    <React.Fragment>
      <main className="main">
        <ul>
          {
            sliPosts.map(post => {
            const {
              node,
              node: {
                fields: { slug }
              }
            } = post;
            return <Item key={slug} post={node} theme={theme} />;
          })}
        </ul>
      </main>

      {/* --- STYLES --- */}
      <style jsx>{`
        .main {
          padding: 0 ${theme.space.inset.default};
        }

        ul {
          list-style: none;
          margin: 0 auto;
          padding: ${`calc(${theme.space.default} * 1.5) 0 calc(${theme.space.default} * 0.5)`};
        }

        @above tablet {
          .main {
            padding: 0 ${`0 calc(${theme.space.default} * 1.5)`};
          }
          ul {
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @above desktop {
          ul {
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  pageNum: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Blog;
