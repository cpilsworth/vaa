/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature variant.
 * Base block: columns
 * Source: https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break
 * Structure: 2 columns per row - Col1: image, Col2: heading + rich text + optional CTA
 * Source DOM: article[data-testid="content-card-component"] with landscape or portrait class
 * Image in picture/img, heading in h2, text in [class*="_text_"], CTA in button/a
 */
export default function parse(element, { document }) {
  // Extract image
  const img = element.querySelector('picture img, img');
  const picture = img ? img.closest('picture') || img : null;

  // Extract heading
  const heading = element.querySelector('h2, h3, [data-testid="typography-component"][class*="heading"]');

  // Extract body text
  const textContainer = element.querySelector('[class*="_text_"], [class*="text_"]');

  // Extract CTA button/link
  const ctaButton = element.querySelector('[class*="_button_n4aij"] button, [class*="_button_n4aij"] a, a[class*="button"]');

  // Build content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (textContainer) contentCell.push(textContainer);

  // Convert button to link if CTA exists
  if (ctaButton) {
    const href = ctaButton.getAttribute('href') || '#';
    const text = ctaButton.textContent.trim();
    if (text) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      const p = document.createElement('p');
      p.appendChild(link);
      contentCell.push(p);
    }
  }

  // Build cells: image column + content column
  const cells = [];
  if (picture && contentCell.length > 0) {
    cells.push([picture, contentCell]);
  } else if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
