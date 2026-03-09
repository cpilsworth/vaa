/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-linked variant.
 * Base block: cards
 * Source: https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break
 * Structure: 2 columns per row - Col1: image, Col2: linked title
 * Source DOM: section[data-testid="articleslist"] > div[data-testid="article-card"]
 * Each card: image in picture > img, title in h3, link from aria-label on parent [role="link"]
 */
export default function parse(element, { document }) {
  // Get all article cards within the articles list
  const articleCards = element.querySelectorAll('[data-testid="article-card"]');

  const cells = [];

  articleCards.forEach((card) => {
    // Extract image
    const img = card.querySelector('picture img, img');
    const picture = img ? img.closest('picture') || img : null;

    // Extract title
    const titleEl = card.querySelector('h3, h2, [data-testid="typography-component"]');

    // Extract link URL from the parent link element
    const linkWrapper = card.querySelector('[role="link"], a');
    const linkUrl = linkWrapper ? linkWrapper.getAttribute('aria-label') || '' : '';

    // Build content cell with linked title
    const contentCell = [];
    if (titleEl) {
      // If there's a URL pattern, wrap title in a link
      const title = titleEl.textContent.trim();
      if (title) {
        const link = document.createElement('a');
        link.textContent = title;
        link.href = '#';
        contentCell.push(link);
      }
    }

    if (picture && contentCell.length > 0) {
      cells.push([picture, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-linked', cells });
  element.replaceWith(block);
}
