/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Virgin Atlantic section breaks and section metadata.
 * Adds <hr> section breaks and section-metadata blocks based on template sections.
 * Runs in afterTransform only, after block parsers have processed content.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const doc = element.ownerDocument || document;

    // Process sections in reverse order to preserve DOM positions
    const sections = [...template.sections].reverse();

    sections.forEach((section, reverseIdx) => {
      const isFirst = reverseIdx === sections.length - 1;

      // Try each selector (can be string or array)
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;

      for (const sel of selectors) {
        try {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        } catch (e) {
          // Selector may not be valid in this context, try next
        }
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add section break (<hr>) before non-first sections if there's content before it
      if (!isFirst && sectionEl.previousElementSibling) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
