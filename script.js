// --- Data storage ---
// Topics have at least { id, title, description } (strings). Extra fields are allowed.
// Form submission requires a non-empty trimmed title; loaded topics are not rejected
// for empty titles. Newest topics appear first in the array.
let topics = [];

// Set during setup; used when rendering cards.
let topicList = null;

const STORAGE_KEY = 'violinTopics.topics.v1';
const STORAGE_VERSION = 1;

// --- Business logic ---

/** Create a topic object with a unique id. Trims title and description. */
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

/**
 * Structural check: value is an object with string id, title, and description.
 * Does not require a non-empty title; extra properties are allowed.
 */
function isValidTopic(value) {
  return (
    value &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string'
  );
}

/** Build the JSON document written to localStorage. */
function serializeTopics() {
  return JSON.stringify({
    version: STORAGE_VERSION,
    topics,
  });
}

/**
 * Parse stored JSON and return topics in saved order.
 * Validates the document envelope (version, topics array); drops entries that
 * fail the structural isValidTopic check.
 */
function parseStoredTopics(json) {
  const data = JSON.parse(json);

  if (
    !data ||
    data.version !== STORAGE_VERSION ||
    !Array.isArray(data.topics)
  ) {
    throw new Error('Invalid stored topic data');
  }

  return data.topics.filter(isValidTopic);
}

/** Read topics from localStorage, or null if missing or unparseable. */
function readStoredTopics() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (json === null) {
    return null;
  }

  try {
    return parseStoredTopics(json);
  } catch {
    return null;
  }
}

/** True when localStorage holds at least one structurally valid saved topic. */
function hasNonEmptyStoredTopics() {
  const stored = readStoredTopics();
  return stored !== null && stored.length > 0;
}

/** Save the current topic list to localStorage. */
function storeTopics() {
  localStorage.setItem(STORAGE_KEY, serializeTopics());
}

/**
 * Replace the in-memory topic list with data from localStorage.
 * Returns a result object for UI feedback.
 */
function loadTopics() {
  const json = localStorage.getItem(STORAGE_KEY);

  if (json === null) {
    return { ok: false, message: 'No saved topics found.' };
  }

  try {
    topics = parseStoredTopics(json);
    renderTopicList();
    const count = topics.length;
    const label = count === 1 ? 'topic' : 'topics';
    return { ok: true, message: `Loaded ${count} ${label}.` };
  } catch {
    return { ok: false, message: 'Could not load topics.' };
  }
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

/** Rebuild the topic list in array order (newest first). */
function renderTopicList() {
  topicList.replaceChildren();
  for (const topic of topics) {
    topicList.append(createTopicCardElement(topic));
  }
}

/** Insert a topic card at the top of the list. */
function prependTopicCard(topic) {
  topicList.prepend(createTopicCardElement(topic));
}

// --- Topic editor (UI-boundary validation) ---

/** True when the editor title is non-empty after trimming. */
function isEditorTitleValid(titleValue) {
  return titleValue.trim().length > 0;
}

/**
 * Sync submit button and inline title error from the current input value.
 * Whitespace-only input is treated as empty. showError forces the message
 * visible when submit is attempted with an invalid title.
 */
function updateTopicEditorTitleState({
  titleInput,
  submitButton,
  titleError,
  showError = false,
}) {
  const valid = isEditorTitleValid(titleInput.value);
  const whitespaceOnly = titleInput.value.length > 0 && !valid;

  submitButton.disabled = !valid;

  if (valid) {
    titleError.hidden = true;
    titleInput.removeAttribute('aria-invalid');
    return;
  }

  if (showError || whitespaceOnly) {
    titleError.hidden = false;
    titleInput.setAttribute('aria-invalid', 'true');
    return;
  }

  titleError.hidden = true;
  titleInput.removeAttribute('aria-invalid');
}

// --- Persistence feedback ---
// Single entry point for successful store/load messages.
// Replace this implementation when adding a custom notification UI.

/** Notify the user that a store or load operation succeeded. */
function notifyPersistenceSuccess(message) {
  alert(message);
}

/** Run the store-topics flow: confirm if needed, save, then notify. */
function handleStoreTopicsClick() {
  if (topics.length === 0 && hasNonEmptyStoredTopics()) {
    const confirmed = confirm(
      'The current topic list is empty, but saved topics exist in storage.\n\n' +
        'Storing now will overwrite the saved list with an empty list.\n\n' +
        'Continue?'
    );
    if (!confirmed) {
      return;
    }
  }

  storeTopics();
  const count = topics.length;
  const label = count === 1 ? 'topic' : 'topics';
  notifyPersistenceSuccess(`Stored ${count} ${label}.`);
}

/** Run the load-topics flow: confirm if needed, load, then notify on success. */
function handleLoadTopicsClick() {
  if (topics.length > 0) {
    const confirmed = confirm(
      'Loading will replace the current topic list.\n\n' +
        'Any unsaved changes will be lost.\n\n' +
        'Continue?'
    );
    if (!confirmed) {
      return;
    }
  }

  const result = loadTopics();
  if (result.ok) {
    notifyPersistenceSuccess(result.message);
  }
}

// --- Event handlers ---

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('topic-form');
  const titleInput = document.getElementById('topic-title');
  const descriptionInput = document.getElementById('topic-description');
  const submitButton = document.getElementById('topic-submit');
  const titleError = document.getElementById('topic-title-error');
  topicList = document.getElementById('topic-list');

  const editorTitleState = {
    titleInput,
    submitButton,
    titleError,
  };

  document.getElementById('store-topics').addEventListener('click', handleStoreTopicsClick);
  document.getElementById('load-topics').addEventListener('click', handleLoadTopicsClick);

  titleInput.addEventListener('input', () => {
    updateTopicEditorTitleState(editorTitleState);
  });

  updateTopicEditorTitleState(editorTitleState);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    // UI rule: non-empty trimmed title; description may be empty.
    if (!title) {
      updateTopicEditorTitleState({ ...editorTitleState, showError: true });
      titleInput.focus();
      return;
    }

    const topic = createTopic(title, descriptionInput.value);
    addTopic(topic);
    prependTopicCard(topic);

    titleInput.value = '';
    descriptionInput.value = '';
    updateTopicEditorTitleState(editorTitleState);
    titleInput.focus();
  });
});
