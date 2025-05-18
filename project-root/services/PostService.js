// services/PostService.js

const db = require('../db');
const Post = require('../models/Post');

const PostService = {
  getAllPosts(search) {
    if (search) {
      return db.posts.filter(p =>
        p.title.includes(search) || p.content.includes(search)
      );
    }
    return db.posts;
  },

  getPostById(id) {
    return db.posts.find(p => p.id == id);
  },

  createPost(data) {
    const post = new Post(data);
    db.posts.push(post);
    return post;
  },

  updatePost(id, data) {
    const post = db.posts.find(p => p.id === id);
    if (!post) return null;

    post.title = data.title ?? post.title;
    post.content = data.content ?? post.content;
    return post;
  },

  deletePost(id) {
    const index = db.posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    db.posts.splice(index, 1);
    return true;
  }
};

module.exports = PostService;
