// Enable smooth scrolling behaviour for internal navigation links.
// When a user clicks an anchor that references an ID on the page,
// this script intercepts the click, prevents the default jump
// and instead animates the scroll to the target section.

document.addEventListener('DOMContentLoaded', () => {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      // Only handle valid IDs; ignore empty hashes
      if (targetId && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          event.preventDefault();
          // Scroll to the element smoothly
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});