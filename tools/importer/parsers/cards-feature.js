/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-feature variant.
 * Base block: cards
 * Source: https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break
 * Structure: 2 columns per row - Col1: image, Col2: heading + description (rich text with lists)
 * Source DOM: article[data-testid="content-card-component"] with landscape class
 * Each card: image in [class*="image_"] picture img, heading in h2, text in [class*="text_"] div
 */
export default function parse(element, { document }) {
  // Extract image from card
  const img = element.querySelector('picture img, img');
  const picture = img ? img.closest('picture') || img : null;

  // Extract heading
  const heading = element.querySelector('h2, h3, [data-testid="typography-component"][class*="heading"]');

  // Extract body text content
  const textContainer = element.querySelector('[class*="_text_"], [class*="text_"]');

  // Build cells: Col1 = image, Col2 = heading + text content
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (textContainer) contentCell.push(textContainer);

  const cells = [];
  if (picture && contentCell.length > 0) {
    cells.push([picture, contentCell]);
  } else if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
