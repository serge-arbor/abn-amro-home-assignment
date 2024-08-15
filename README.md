# abn-amro-home-assignment

## Introduction
The following versions were used for this project:
- **nvm**: `0.39.4`
- **Node.js**: `v20.16.0`
- **pnpm**: `8.6.12`


## Project Setup

```sh
pnpm install
```

### Copy `.env.example` to `.env`

```sh
cp .env.example .env
```
### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Decisions and Assumptions

- **Separation of Concerns**: The architecture is designed with a clear separation of data fetching, filtering, and state management into distinct composables (useShowList, useFilteredShows, useGenres, useShowListFilters). This modular approach ensures each part of the application is focused on a single responsibility, which promotes maintainability, testability, and scalability while preventing unintended side effects across the application.
- **Unit tests**: As this is a home assignment, only some key functionalities are tested. The coverage includes 4 composables and 1 component, with full testing expected in a real-world scenario.

- **Optimized State Management**: To maintain simplicity and ensure component encapsulation, a centralized store was deliberately avoided. Instead, HomeView efficiently manages reactivity with minimal code. The URL serves as a "global store," preserving state across refreshes. If shared state becomes necessary, we can leverage VueUse's [createSharedComposable](https://vueuse.org/shared/createSharedComposable/) to maintain a clean and modular architecture.

- **Content Security**:  Show summaries are rendered with security in mind, using [dompurify](https://github.com/cure53/DOMPurify) to sanitize any HTML content. Additionally, external URLs are meticulously sanitized with [sanitize-url](https://github.com/braintree/sanitize-url) to protect against potential security vulnerabilities.

- **Code Quality**: The ESLint configuration promotes good practices, including import sorting, enforcing Vue.js component conventions, ensuring TypeScript type safety, and maintaining clean TailwindCSS usage. This setup ensures a consistent and maintainable codebase.

- **Image Handling**: The [UseImage](https://vueuse.org/core/useImage/#component-usage) component is employed to manage image loading states and render fallbacks. However, a more robust approach could involve prerendering lower-quality images before loading high-resolution versions in the ShowDetails component.

- **User Experience**: [Skeleton](https://www.naiveui.com/en-US/os-theme/components/skeleton) loaders are implemented across all views to provide responsive feedback to users during loading times.

- **Data Fetching**: [ky.js](https://github.com/sindresorhus/ky) is used for data fetching, taking advantage of the modern Fetch API.

- **Responsiveness**: The mobile version has been minimally optimized to ensure basic responsiveness.

- **Styling**: [TailwindCSS](https://tailwindcss.com/) is utilized to expedite the styling process.

- **Pagination**: Pagination was not implemented due to limitations with the API, specifically the lack of pagination support with genre filters. However, it is feasible to implement pagination using API pagination while keeping the genre filter local.

- **Genre Filter Logic**: The genre filter is currently implemented using the "OR" logic but can be easily switched to "AND" if needed.



## Potential Concerns
- Full test coverage is not provided due to time constraints. In a real-world scenario, full coverage would be expected.

- The current Vue version uses ESLint 8.57.0, which has deprecated dependencies. It's advisable to update ESLint to the latest version as soon as possible.

- While sanitization is applied, using v-html can be risky. A more robust approach might involve leveraging Vue's virtual DOM capabilities to parse and construct a sanitized virtual DOM from the string content.

## Next steps:
- **Expand Tests**: Increase test coverage to ensure all key functionalities are thoroughly tested.

- **Error Handling**: Enhance error handling for better reliability and feedback.

- **Mobile Optimization**: Improve the UI and interactions for mobile devices.

- **Build Performance**: Streamline the build process to enhance performance.

- **Dependency Updates**: Keep dependencies up-to-date for new features and security.

- **Virtualization**: Render only visible items in large lists or tables to reduce DOM load.

- **Search Debounce**: Reduce excessive updates with debounce for search inputs.

- **Accessibility**: Ensure full accessibility compliance.

- **Code Refactoring**: Improve code readability and maintainability.

- **User Analytics**: Implement analytics to track user interactions and gather insights.