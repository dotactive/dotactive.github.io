fetch('./head.html')
  .then(response => response.text())
  .then(data => {
    const headElement = document.querySelector('head');
    headElement.insertAdjacentHTML('beforeend', data);
  })
  .catch(error => console.error('Error loading head.html:', error));

