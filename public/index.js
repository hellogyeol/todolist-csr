const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('.ul');
const clearBtn = document.querySelector('.clear-btn');

getList();

// To-Do 생성
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

// 전체 목록 삭제
clearBtn.addEventListener('click', async () => {
  await fetch('/list', {
    method: 'DELETE'
  });
  getList();
});

// 전체 목록 렌더링
async function getList() {
  const res = await fetch('/list');
  const list = await res.json();

  ul.innerHTML = '';
  list.forEach(todo => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');
    const doneBox = document.createElement('input');

    doneBox.type = 'checkbox';
    deleteBtn.innerText = 'X';
    span.innerText = todo.content;
    li.id = todo.id;
    li.append(doneBox, span, deleteBtn);
    ul.append(li);

    if (todo.done === true) {
      doneBox.checked = true;
      span.style.color = 'red';
    }

    doneBox.addEventListener('click', () => {
      console.log('clicked')
    });

    // To-Do 삭제
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