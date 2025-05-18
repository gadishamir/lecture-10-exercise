// server.js
const express = require('express');
const app = express();
const path = require('path');
const PostService = require('./services/PostService');

const PORT = 3000;

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes

// GET all posts
app.get('/api/posts', (req, res) => {
  const { search } = req.query;
  const posts = PostService.getAllPosts(search);
  res.json(posts);
});

// GET single post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = PostService.getPostById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// POST create new post
app.post('/api/posts', (req, res) => {
  try {
    const post = PostService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update post
app.put('/api/posts/:id', (req, res) => {
  try {
    const updated = PostService.updatePost(req.params.id, req.body);
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a post
app.delete('/api/posts/:id', (req, res) => {
  const deleted = PostService.deletePost(req.params.id);
  if (deleted) {
    res.json({ message: 'Post deleted' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
