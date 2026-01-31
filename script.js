fetch('http://localhost:3000/posts')
  .then(res => res.json())
  .then(posts => {
    const ul = document.getElementById('post-list')
    ul.innerHTML = ''

    posts.forEach(post => {
      const li = document.createElement('li')
      li.textContent = `${post.title} (${post.views} views)`

      // Nếu xoá mềm → gạch ngang
      if (post.isDeleted === true) {
        li.classList.add('deleted')
      }

      ul.appendChild(li)
    })
  })
