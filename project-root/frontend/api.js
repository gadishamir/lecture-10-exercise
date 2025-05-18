const API_BASE = '/api/posts';

async function getAllPosts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

async function getPost(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Post not found');
  return res.json();
}

async function createPost(post) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

async function updatePost(id, post) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

async function deletePost(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}