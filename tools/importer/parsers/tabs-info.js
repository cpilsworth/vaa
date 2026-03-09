/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-info variant.
 * Base block: tabs
 * Source: https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break
 * Structure: 2 columns per row - Col1: tab label, Col2: tab content (heading + text)
 * Source DOM: div[data-testid="tabs-component"] with li[data-testid="tab"] and div[data-testid="tabs__content-item"]
 */
export default function parse(element, { document }) {
  // Extract tab labels from tab list items
  const tabItems = element.querySelectorAll('[data-testid="tab"], li[role="tab"]');
  // Extract tab content panels
  const contentItems = element.querySelectorAll('[data-testid="tabs__content-item"], [role="tabpanel"]');

  const cells = [];

  tabItems.forEach((tab, idx) => {
    // Get tab label text from the p or span typography element
    const labelEl = tab.querySelector('p, [data-testid="typography-component"]');
    const label = labelEl ? labelEl.textContent.trim() : `Tab ${idx + 1}`;

    // Create label cell
    const labelCell = document.createElement('p');
    labelCell.textContent = label;

    // Build content cell from corresponding content panel
    const contentCell = [];
    const panel = contentItems[idx];

    if (panel && !panel.hasAttribute('hidden')) {
      // Extract heading from content panel
      const heading = panel.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentCell.push(heading);

      // Extract body text
      const bodyText = panel.querySelector('[class*="body_"], [class*="body-size"]');
      if (bodyText) contentCell.push(bodyText);
    }

    // If no content was extracted (hidden tab), create placeholder from label
    if (contentCell.length === 0) {
      const placeholder = document.createElement('p');
      placeholder.textContent = label;
      contentCell.push(placeholder);
    }

    cells.push([labelCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-info', cells });
  element.replaceWith(block);
}
