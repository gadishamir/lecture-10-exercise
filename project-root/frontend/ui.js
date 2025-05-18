function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(div => div.style.display = 'none');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).style.display = '';
  document.querySelector(`.tab[data-tab="${tab}"]`).classList.add('active');
  clearMessages();
  if (tab === 'view') loadPosts();
}

function showMessage(msg) {
  const el = document.getElementById('message');
  el.textContent = msg;
  el.style.display = '';
}
function showError(msg) {
  const el = document.getElementById('error');
  el.textContent = msg;
  el.style.display = '';
}
function clearMessages() {
  document.getElementById('message').style.display = 'none';
  document.getElementById('error').style.display = 'none';
}

async function loadPosts() {
  const ul = document.getElementById('posts');
  ul.innerHTML = '';
  try {
    const posts = await getAllPosts();
    if (posts.length === 0) {
      ul.innerHTML = '<li>No posts found.</li>';
      return;
    }
    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${post.title}</strong><br>${post.content}<br><small>ID: ${post.id}</small>`;
      ul.appendChild(li);
    });
  } catch (e) {
    showError(e.message);
  }
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => showTab(tab.dataset.tab));
});

document.getElementById('create-form').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('create-title').value;
  const content = document.getElementById('create-content').value;
  try {
    await createPost({ title, content });
    showMessage('Post created!');
    e.target.reset();
    loadPosts();
  } catch (err) {
    showError(err.message);
  }
});

document.getElementById('edit-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('edit-id').value;
  const title = document.getElementById('edit-title').value;
  const content = document.getElementById('edit-content').value;
  try {
    await updatePost(id, { title, content });
    showMessage('Post updated!');
    loadPosts();
  } catch (err) {
    showError(err.message);
  }
});

document.getElementById('delete-form').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('delete-id').value;
  try {
    await deletePost(id);
    showMessage('Post deleted!');
    loadPosts();
  } catch (err) {
    showError(err.message);
  }
});

// Initial load
showTab('view');