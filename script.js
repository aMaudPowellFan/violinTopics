document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('topic-form');
  const input = document.getElementById('topic-input');
  const list = document.getElementById('topic-list');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const topic = input.value.trim();
    if (!topic) {
      return;
    }

    const item = document.createElement('li');
    item.textContent = topic;
    list.prepend(item);

    input.value = '';
    input.focus();
  });
});
