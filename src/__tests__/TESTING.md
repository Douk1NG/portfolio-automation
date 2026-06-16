# Testing Strategy

This document outlines the testing conventions and best practices for the `automate-curriculum` project. We follow the principle of **Tests as Executable Documentation**.

## Tech Stack

- **Test Runner:** Vitest
- **UI Testing:** React Testing Library (`@testing-library/react`)
- **State Mocking:** `vi.mock` and `useStore.setState()`

## Core Principles

### 1. The Arrange-Act-Assert (AAA) Pattern

Every test must be visibly divided into three sections using comments to maintain consistency and readability:

```typescript
it('does something expected', () => {
  // Arrange
  // Setup mocks, store state, and render components.
  // Act
  // Trigger the specific behavior (e.g., fireEvent.click).
  // Assert
  // Verify the outcome (e.g., expect(...).toBeDefined()).
});
```

### 2. Behavior-Driven Development (BDD) Naming

Tests should read like a sentence describing the scenario and expected behavior. Use nested `describe` blocks.

**Format:** `describe('Component')` -> `describe('when [Scenario]')` -> `it('should [Expected Behavior]')`

```typescript
describe('ProfileForm Component', () => {
  describe('when the user is logged out', () => {
    it('should redirect to the login page', () => { ... });
  });
});
```

### 3. Comments for the "Why", Not the "What"

Avoid explaining what the code is doing. The test code itself should be self-explanatory. Only use inline comments to explain non-obvious business rules or tricky edge cases.

### 4. Mocking Strategy

- **Zustand Stores (Store Isolation):** We prefer to use the real store in tests and modify its state using `store.setState()` before rendering, rather than fully mocking the hook. **Ensure you always reset the store properties to their pristine defaults inside `beforeEach` to prevent state leakage between tests.**
- **Lucide Icons (Global Mock):** Due to Vitest hoisting issues with named exports, `lucide-react` icons are mocked globally in `vitest.setup.ts`. This keeps test files concise and avoids duplicating icon mocks. Avoid using custom local mocks unless absolutely necessary.
- **Strict Exports & Mocking Limits:** Do not use `Proxy` mocks as they fail strict export checks in certain bundler environments. Explicitly register any new icons that require mocking inside the global `vitest.setup.ts` icon list.

### 5. UI Component Testing

- Focus on testing user interactions (e.g., clicking edit, typing in an input, saving) rather than internal state changes.
- Use `screen.getByRole`, `screen.getByText`, or `screen.getByTitle` for accessing elements exactly as the user would.
- Do not assert on exact React component class names, assert on the rendered text or accessibility roles.
- For testing hooks or components that rely on the store, ensure the specific store (e.g., `useProfileStore` or `useHistoryStore`) is populated using `setState` in `beforeEach`.
