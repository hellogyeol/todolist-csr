const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const clearBtn = document.querySelector('.clear-btn');

getList();

form.addEventListener('submit', async event => {
  event.preventDefault();
  await fetch('/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({content: input.value})
  })
  input.value = '';
  getList();
});

clearBtn.addEventListener('click', async () => {
  await fetch('/list', {
    method: 'DELETE'
  });
  getList();
});

async function getList() {
  const res = await fetch('/list');
  const list = await res.json();
  ul.innerHTML = '';
  list.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    span.innerText = todo.content;
    li.id = todo.id;
    li.append(span, deleteBtn);
    ul.append(li);

    deleteBtn.addEventListener('click', async event => {
      const liId = event.target.parentElement.id;
      await fetch('/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id: liId})
      });
      getList();
    });
  });
}