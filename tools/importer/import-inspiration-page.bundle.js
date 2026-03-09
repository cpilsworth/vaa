var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-inspiration-page.js
  var import_inspiration_page_exports = {};
  __export(import_inspiration_page_exports, {
    default: () => import_inspiration_page_default
  });

  // tools/importer/parsers/tabs-info.js
  function parse(element, { document }) {
    const tabItems = element.querySelectorAll('[data-testid="tab"], li[role="tab"]');
    const contentItems = element.querySelectorAll('[data-testid="tabs__content-item"], [role="tabpanel"]');
    const cells = [];
    tabItems.forEach((tab, idx) => {
      const labelEl = tab.querySelector('p, [data-testid="typography-component"]');
      const label = labelEl ? labelEl.textContent.trim() : `Tab ${idx + 1}`;
      const labelCell = document.createElement("p");
      labelCell.textContent = label;
      const contentCell = [];
      const panel = contentItems[idx];
      if (panel && !panel.hasAttribute("hidden")) {
        const heading = panel.querySelector("h1, h2, h3, h4, h5, h6");
        if (heading) contentCell.push(heading);
        const bodyText = panel.querySelector('[class*="body_"], [class*="body-size"]');
        if (bodyText) contentCell.push(bodyText);
      }
      if (contentCell.length === 0) {
        const placeholder = document.createElement("p");
        placeholder.textContent = label;
        contentCell.push(placeholder);
      }
      cells.push([labelCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse2(element, { document }) {
    const img = element.querySelector("picture img, img");
    const picture = img ? img.closest("picture") || img : null;
    const heading = element.querySelector('h2, h3, [data-testid="typography-component"][class*="heading"]');
    const textContainer = element.querySelector('[class*="_text_"], [class*="text_"]');
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (textContainer) contentCell.push(textContainer);
    const cells = [];
    if (picture && contentCell.length > 0) {
      cells.push([picture, contentCell]);
    } else if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-linked.js
  function parse3(element, { document }) {
    const articleCards = element.querySelectorAll('[data-testid="article-card"]');
    const cells = [];
    articleCards.forEach((card) => {
      const img = card.querySelector("picture img, img");
      const picture = img ? img.closest("picture") || img : null;
      const titleEl = card.querySelector('h3, h2, [data-testid="typography-component"]');
      const linkWrapper = card.querySelector('[role="link"], a');
      const linkUrl = linkWrapper ? linkWrapper.getAttribute("aria-label") || "" : "";
      const contentCell = [];
      if (titleEl) {
        const title = titleEl.textContent.trim();
        if (title) {
          const link = document.createElement("a");
          link.textContent = title;
          link.href = "#";
          contentCell.push(link);
        }
      }
      if (picture && contentCell.length > 0) {
        cells.push([picture, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-linked", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse4(element, { document }) {
    const img = element.querySelector("picture img, img");
    const picture = img ? img.closest("picture") || img : null;
    const heading = element.querySelector('h2, h3, [data-testid="typography-component"][class*="heading"]');
    const textContainer = element.querySelector('[class*="_text_"], [class*="text_"]');
    const ctaButton = element.querySelector('[class*="_button_n4aij"] button, [class*="_button_n4aij"] a, a[class*="button"]');
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (textContainer) contentCell.push(textContainer);
    if (ctaButton) {
      const href = ctaButton.getAttribute("href") || "#";
      const text = ctaButton.textContent.trim();
      if (text) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = text;
        const p = document.createElement("p");
        p.appendChild(link);
        contentCell.push(p);
      }
    }
    const cells = [];
    if (picture && contentCell.length > 0) {
      cells.push([picture, contentCell]);
    } else if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-attractions.js
  function parse5(element, { document }) {
    const slideCards = element.querySelectorAll('article[data-testid="content-card-component"], article[class*="content-card"]');
    const cells = [];
    slideCards.forEach((card) => {
      const img = card.querySelector("picture img, img");
      const picture = img ? img.closest("picture") || img : null;
      const heading = card.querySelector('h2, h3, [data-testid="typography-component"][class*="heading"]');
      const textContainer = card.querySelector('[class*="_text_"], [class*="text_"]');
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (textContainer) contentCell.push(textContainer);
      if (picture && contentCell.length > 0) {
        cells.push([picture, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-attractions", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/virginatlantic-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#search-experience-root",
        '[class*="search-panel_component"]',
        '[data-testid="blanket-component"]'
      ]);
      WebImporter.DOMUtils.remove(element, ["link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        'nav[data-testid="breadcrumbs-"]',
        '[class*="breadcrumbs_component"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        "script",
        "style",
        "meta",
        "noscript"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-cy");
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("aria-hidden");
      });
    }
  }

  // tools/importer/transformers/virginatlantic-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const doc = element.ownerDocument || document;
      const sections = [...template.sections].reverse();
      sections.forEach((section, reverseIdx) => {
        const isFirst = reverseIdx === sections.length - 1;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
            if (sectionEl) break;
          } catch (e) {
          }
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (!isFirst && sectionEl.previousElementSibling) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-inspiration-page.js
  var parsers = {
    "tabs-info": parse,
    "cards-feature": parse2,
    "cards-linked": parse3,
    "columns-feature": parse4,
    "carousel-attractions": parse5
  };
  var PAGE_TEMPLATE = {
    name: "inspiration-page",
    description: "Inspirational destination guide page featuring travel imagery, destination highlights, and booking CTAs",
    urls: ["https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break"],
    blocks: [
      {
        name: "tabs-info",
        instances: ['[data-testid="tabs-component"]']
      },
      {
        name: "cards-feature",
        instances: ['article[data-testid="content-card-component"][class*="landscape"]']
      },
      {
        name: "columns-feature",
        instances: ['article[data-testid="content-card-component"][class*="landscape"]']
      },
      {
        name: "carousel-attractions",
        instances: ['section[data-testid="carousel-component"]']
      },
      {
        name: "cards-linked",
        instances: ['section[data-testid="articleslist"]']
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero Section",
        selector: ['[data-testid="text-lockup-component"]:has(h1)', 'div:has(> h1[data-testid="typography-component"])'],
        style: null,
        blocks: [],
        defaultContent: ["h1", '[data-testid="typography-component"][class*="body-size--small"]', '[data-testid="image-component"]', 'div[class*="body-size--medium"]', 'button[data-testid="button-component"][class*="brand"]']
      },
      {
        id: "section-2-flight-info",
        name: "Flight Info Tabs",
        selector: '[data-testid="tabs-component"]',
        style: null,
        blocks: ["tabs-info"],
        defaultContent: []
      },
      {
        id: "section-3-why-nyc",
        name: "Why New York Works",
        selector: [`[data-testid="text-lockup-component"]:has(h2:contains('Why New York'))`, 'div:has(> h2[data-testid="typography-component"])'],
        style: null,
        blocks: [],
        defaultContent: ["h2", 'div[class*="body-size--medium"]', "ul"]
      },
      {
        id: "section-4-pick-your-vibe",
        name: "Pick Your Vibe",
        selector: [`[data-testid="text-lockup-component"]:has(h2:contains('Pick your vibe'))`, "div:has(> h2:contains('Pick your vibe'))"],
        style: null,
        blocks: ["cards-feature"],
        defaultContent: ["h2"]
      },
      {
        id: "section-5-where-to-stay",
        name: "Where to Stay",
        selector: [`[data-testid="text-lockup-component"]:has(h2:contains('Where to stay'))`, "div:has(> h2:contains('Where to stay'))"],
        style: null,
        blocks: ["columns-feature"],
        defaultContent: ["h2", 'div[class*="body-size--medium"]']
      },
      {
        id: "section-6-top-attractions",
        name: "Top 5 Attractions",
        selector: 'section[data-testid="carousel-component"]',
        style: null,
        blocks: ["carousel-attractions"],
        defaultContent: ["h2"]
      },
      {
        id: "section-7-broadway",
        name: "Broadway",
        selector: [`[data-testid="text-lockup-component"]:has(h2:contains('Broadway'))`, "div:has(> h2:contains('Broadway'))"],
        style: null,
        blocks: ["columns-feature"],
        defaultContent: ["h2", 'div[class*="body-size--medium"]']
      },
      {
        id: "section-8-getting-around",
        name: "Getting Around",
        selector: [`[data-testid="text-lockup-component"]:has(h2:contains('How to get around'))`, "div:has(> h2:contains('How to get around'))"],
        style: null,
        blocks: ["columns-feature"],
        defaultContent: ["h2"]
      },
      {
        id: "section-9-how-to-book",
        name: "How to Book",
        selector: [`[data-testid="text-lockup-component"]:has(h2:contains('How to book'))`, "div:has(> h2:contains('How to book'))"],
        style: null,
        blocks: [],
        defaultContent: ["h2", 'div[class*="body-size--medium"]', 'button[data-testid="button-component"][class*="brand"]']
      },
      {
        id: "section-10-more-inspiration",
        name: "More Inspiration",
        selector: 'section[data-testid="articleslist"]',
        style: null,
        blocks: ["cards-linked"],
        defaultContent: ["h3"]
      }
    ]
  };
  var transformersList = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformersList.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
              section: blockDef.section || null
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
  var import_inspiration_page_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_inspiration_page_exports);
})();
