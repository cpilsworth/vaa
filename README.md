# Virgin Atlantic — AEM Edge Delivery Services

Destination inspiration pages for Virgin Atlantic, migrated to Adobe Experience Manager Edge Delivery Services.

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Blocks

| Block | Description |
|-------|-------------|
| `tabs-info` | Tabbed flight information display with accessible tab navigation |
| `cards-feature` | Rich feature cards with image and descriptive content |
| `cards-linked` | Linked article cards for related inspiration content |
| `columns-feature` | Featured content in a two-column image and text layout |
| `carousel-attractions` | Slideshow carousel for top attractions with navigation controls |

## Migrated Content

| Page | Source |
|------|--------|
| `/en-ae/inspiration/usa/new-york-city-break` | [virginatlantic.com](https://www.virginatlantic.com/en-AE/inspiration/usa/new-york-city-break) |

## Documentation

For more on AEM Edge Delivery Services, see https://www.aem.live/docs/ and specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
