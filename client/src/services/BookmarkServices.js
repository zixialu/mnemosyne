function getBookmarks() {
  // TODO: Replace this with an actual request
  const data = [
    {
      id: '1a',
      name: 'Google',
      uri: 'https://google.ca',
      notes: 'Give it a goog',
      tags: ['test', 'search'],
      createdAt: new Date(),
    },
    {
      id: '1b',
      name: 'Reddit',
      uri: 'http://reddit.com',
      notes: 'The front page of the internet',
      tags: ['test'],
      createdAt: new Date(),
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 1000);
  });
}

export default { getBookmarks };