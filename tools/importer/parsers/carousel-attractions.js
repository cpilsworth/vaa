/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-attractions variant.
 * Base block: carousel
 * Source: https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break
 * Structure: 2 columns per row - Col1: image, Col2: heading + description + timing tip
 * Source DOM: section[data-testid="carousel-component"] containing article[data-testid="content-card-component"] portrait cards
 * Each slide: image in picture/img, heading in h2, text in [class*="_text_"] with paragraphs
 */
export default function parse(element, { document }) {
  // Get all carousel slide cards (portrait content cards)
  const slideCards = element.querySelectorAll('article[data-testid="content-card-component"], article[class*="content-card"]');

  const cells = [];

  slideCards.forEach((card) => {
    // Extract image
    const img = card.querySelector('picture img, img');
    const picture = img ? img.closest('picture') || img : null;

    // Extract heading
    const heading = card.querySelector('h2, h3, [data-testid="typography-component"][class*="heading"]');

    // Extract body text (description + timing tip)
    const textContainer = card.querySelector('[class*="_text_"], [class*="text_"]');

    // Build content cell
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (textContainer) contentCell.push(textContainer);

    if (picture && contentCell.length > 0) {
      cells.push([picture, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-attractions', cells });
  element.replaceWith(block);
}
