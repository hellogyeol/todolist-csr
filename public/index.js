const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');

getList();

form.addEventListener('submit', async event => {
  event.preventDefault();
  await fetch('/list', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({content: input.value})
  })
  input.value = '';
  getList();
})

async function getList() {
  const res = await fetch('/list');
  const list = await res.json();
  ul.innerHTML = '';
  list.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerText = todo.content;
    li.append(span);
    ul.append(li);
  });
}