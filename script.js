// --- Data storage ---
// Topics are objects: { id, title, description }
// Newest topics appear first in the array.
let topics = [];

// Set during setup; used when rendering cards.
let topicList = null;

// --- Business logic ---

/** Create a topic object with a unique id. */
function createTopic(title, description) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
  };
}

/** Add a topic to the collection (at the top). */
function addTopic(topic) {
  topics.unshift(topic);
}

// --- Presentation ---

/**
 * Build a display card for one topic.
 * Title and description areas are focusable for standard browser scrolling.
 */
function createTopicCardElement(topic) {
  const card = document.createElement('li');
  card.className = 'topic-card';
  card.dataset.topicId = topic.id;

  const titleArea = document.createElement('div');
  titleArea.className = 'topic-card__title';
  titleArea.tabIndex = 0;
  titleArea.textContent = topic.title;

  const descriptionArea = document.createElement('div');
  descriptionArea.className = 'topic-card__description';
  descriptionArea.tabIndex = 0;
  descriptionArea.textContent = topic.description;

  card.append(titleArea, descriptionArea);
  return card;
}

/** Insert a topic card at the top of the list. */
function prependTopicCard(topic) {
  topicList.prepend(createTopicCardElement(topic));
}

// --- Event handlers ---

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('topic-form');
  const titleInput = document.getElementById('topic-title');
  const descriptionInput = document.getElementById('topic-description');
  topicList = document.getElementById('topic-list');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    // Require a title; description may be empty.
    if (!title) {
      return;
    }

    const topic = createTopic(title, descriptionInput.value);
    addTopic(topic);
    prependTopicCard(topic);

    titleInput.value = '';
    descriptionInput.value = '';
    titleInput.focus();
  });
});
