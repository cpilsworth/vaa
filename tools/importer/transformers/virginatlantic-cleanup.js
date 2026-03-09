/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Virgin Atlantic site cleanup.
 * Removes non-authorable content from source pages.
 * Selectors from captured DOM of virginatlantic.com.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove search/booking panel that overlays content (from captured DOM: #search-experience-root, [class*="search-panel_component"])
    WebImporter.DOMUtils.remove(element, [
      '#search-experience-root',
      '[class*="search-panel_component"]',
      '[data-testid="blanket-component"]',
    ]);

    // Remove link stylesheet tags (from captured DOM: <link rel="stylesheet">)
    WebImporter.DOMUtils.remove(element, ['link']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove header, nav, breadcrumbs (from captured DOM: <header>, <nav>, [data-testid="breadcrumbs-"])
    WebImporter.DOMUtils.remove(element, [
      'header',
      'nav[data-testid="breadcrumbs-"]',
      '[class*="breadcrumbs_component"]',
    ]);

    // Remove any remaining non-authorable elements
    WebImporter.DOMUtils.remove(element, [
      'script',
      'style',
      'meta',
      'noscript',
    ]);

    // Clean tracking/interaction attributes from all elements
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-cy');
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('aria-hidden');
    });
  }
}
