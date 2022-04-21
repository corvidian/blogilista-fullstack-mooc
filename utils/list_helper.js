const dummy = (blogs) => {
  return blogs.reduce(() => 1, 1);
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined;
  }
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
