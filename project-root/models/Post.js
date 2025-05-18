
const { v4: uuidv4 } = require('uuid');

class Post {
  constructor({ title, content }) {
    if (!title || !content) {
      throw new Error('Post must have a title and content.');
    }

    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Post;
