const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const clearBtn = document.querySelector('.clear-btn');

getList();

form.addEventListener('submit', async event => {
  event.preventDefault();
  await fetch('/list', {
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
    span.innerText = todo.content;
    li.id = todo.id;
    li.append(span);
    ul.append(li);
  });
}