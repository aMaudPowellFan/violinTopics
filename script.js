// Run setup once the HTML is loaded and elements exist on the page.
document.addEventListener('DOMContentLoaded', () => {
  // References to the form, text input, and topic list from index.html.
  const form = document.getElementById('topic-form');
  const input = document.getElementById('topic-input');
  const list = document.getElementById('topic-list');

  // Fires when the user clicks "Add topic" or presses Enter in the input.
  form.addEventListener('submit', (event) => {
    // Keep the page from reloading (default form behavior).
    event.preventDefault();

    const topic = input.value.trim();
    // Ignore empty or whitespace-only submissions.
    if (!topic) {
      return;
    }

    // Build a new list item and insert it at the top of the list.
    const item = document.createElement('li');
    item.textContent = topic;
    list.prepend(item);

    // Clear the field and refocus for the next topic.
    input.value = '';
    input.focus();
  });
});
