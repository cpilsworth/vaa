/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import tabsInfoParser from './parsers/tabs-info.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsLinkedParser from './parsers/cards-linked.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import carouselAttractionsParser from './parsers/carousel-attractions.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/virginatlantic-cleanup.js';
import sectionsTransformer from './transformers/virginatlantic-sections.js';

// PARSER REGISTRY
const parsers = {
  'tabs-info': tabsInfoParser,
  'cards-feature': cardsFeatureParser,
  'cards-linked': cardsLinkedParser,
  'columns-feature': columnsFeatureParser,
  'carousel-attractions': carouselAttractionsParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'inspiration-page',
  description: 'Inspirational destination guide page featuring travel imagery, destination highlights, and booking CTAs',
  urls: ['https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break'],
  blocks: [
    {
      name: 'tabs-info',
      instances: ['[data-testid="tabs-component"]'],
    },
    {
      name: 'cards-feature',
      instances: ['article[data-testid="content-card-component"][class*="landscape"]'],
    },
    {
      name: 'columns-feature',
      instances: ['article[data-testid="content-card-component"][class*="landscape"]'],
    },
    {
      name: 'carousel-attractions',
      instances: ['section[data-testid="carousel-component"]'],
    },
    {
      name: 'cards-linked',
      instances: ['section[data-testid="articleslist"]'],
    },
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero Section',
      selector: ['[data-testid="text-lockup-component"]:has(h1)', 'div:has(> h1[data-testid="typography-component"])'],
      style: null,
      blocks: [],
      defaultContent: ['h1', '[data-testid="typography-component"][class*="body-size--small"]', '[data-testid="image-component"]', 'div[class*="body-size--medium"]', 'button[data-testid="button-component"][class*="brand"]'],
    },
    {
      id: 'section-2-flight-info',
      name: 'Flight Info Tabs',
      selector: '[data-testid="tabs-component"]',
      style: null,
      blocks: ['tabs-info'],
      defaultContent: [],
    },
    {
      id: 'section-3-why-nyc',
      name: 'Why New York Works',
      selector: ['[data-testid="text-lockup-component"]:has(h2:contains(\'Why New York\'))', 'div:has(> h2[data-testid="typography-component"])'],
      style: null,
      blocks: [],
      defaultContent: ['h2', 'div[class*="body-size--medium"]', 'ul'],
    },
    {
      id: 'section-4-pick-your-vibe',
      name: 'Pick Your Vibe',
      selector: ['[data-testid="text-lockup-component"]:has(h2:contains(\'Pick your vibe\'))', 'div:has(> h2:contains(\'Pick your vibe\'))'],
      style: null,
      blocks: ['cards-feature'],
      defaultContent: ['h2'],
    },
    {
      id: 'section-5-where-to-stay',
      name: 'Where to Stay',
      selector: ['[data-testid="text-lockup-component"]:has(h2:contains(\'Where to stay\'))', 'div:has(> h2:contains(\'Where to stay\'))'],
      style: null,
      blocks: ['columns-feature'],
      defaultContent: ['h2', 'div[class*="body-size--medium"]'],
    },
    {
      id: 'section-6-top-attractions',
      name: 'Top 5 Attractions',
      selector: 'section[data-testid="carousel-component"]',
      style: null,
      blocks: ['carousel-attractions'],
      defaultContent: ['h2'],
    },
    {
      id: 'section-7-broadway',
      name: 'Broadway',
      selector: ['[data-testid="text-lockup-component"]:has(h2:contains(\'Broadway\'))', 'div:has(> h2:contains(\'Broadway\'))'],
      style: null,
      blocks: ['columns-feature'],
      defaultContent: ['h2', 'div[class*="body-size--medium"]'],
    },
    {
      id: 'section-8-getting-around',
      name: 'Getting Around',
      selector: ['[data-testid="text-lockup-component"]:has(h2:contains(\'How to get around\'))', 'div:has(> h2:contains(\'How to get around\'))'],
      style: null,
      blocks: ['columns-feature'],
      defaultContent: ['h2'],
    },
    {
      id: 'section-9-how-to-book',
      name: 'How to Book',
      selector: ['[data-testid="text-lockup-component"]:has(h2:contains(\'How to book\'))', 'div:has(> h2:contains(\'How to book\'))'],
      style: null,
      blocks: [],
      defaultContent: ['h2', 'div[class*="body-size--medium"]', 'button[data-testid="button-component"][class*="brand"]'],
    },
    {
      id: 'section-10-more-inspiration',
      name: 'More Inspiration',
      selector: 'section[data-testid="articleslist"]',
      style: null,
      blocks: ['cards-linked'],
      defaultContent: ['h3'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformersList = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformersList.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.warn(`Block "${blockDef.name}" selector error: ${selector}`, e);
      }
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
