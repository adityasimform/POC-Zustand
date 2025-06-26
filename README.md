# Zustand POC – Documentation

## Overview

This project is a Product Dashboard built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Zustand** for state management.  
It demonstrates modular state management using Zustand slices, persistent state, UI theming, and a clean, scalable architecture.

---

## Table of Contents

- [Project Structure](#project-structure)
- [State Management with Zustand](#state-management-with-zustand)
  - [Store Setup](#store-setup)
  - [Slices](#slices)
- [UI Components](#ui-components)
- [Theming](#theming)
- [Persistence & Middleware](#persistence--middleware)
- [Notifications](#notifications)
- [Best Practices](#best-practices)
- [How to Run](#how-to-run)

---

## Project Structure

```
src/
  atoms/           # Small, reusable UI elements (Button, Input)
  components/      # Feature components (ProductCard, Filters, Modal, etc.)
  organisms/       # Larger UI sections (Topbar)
  pages/           # Route-level components (Products, LoginPage, Home)
  stores/          # Zustand store and slices
  HOC/             # Higher-order components (ThemeWatcher)
  assets/          # Static assets
  App.tsx          # App entry point
  Layout.tsx       # Main layout with theming
  main.tsx         # React root, Toaster, ThemeWatcher
```

---

## State Management with Zustand

### Store Setup

The global store is defined in [`src/stores/store.ts`](src/stores/store.ts):

- Combines multiple **slices** (auth, UI, products, cart, filters) into a single store.
- Uses Zustand middleware for **devtools**, **persistence**, and **immer** (for immutable updates).

```ts
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get, store) => ({
        ...createAuthSlice(set, get, store),
        ...createUISlice(set, get, store),
        ...immer(createProductSlice)(set, get, store),
        ...immer(createCartSlice)(set, get, store),
        ...immer(createFilterSlice)(set, get, store),
      }),
      { name: "zustand-store" }
    )
  )
);
```

### Slices

Each slice manages a feature’s state and actions:

- **Auth Slice** ([`src/stores/slices/authSlice.ts`](src/stores/slices/authSlice.ts)):  
  Handles login, logout, and authentication state.
- **UI Slice** ([`src/stores/slices/uiSlice.ts`](src/stores/slices/uiSlice.ts)):  
  Manages UI state like dark mode.
- **Product Slice** ([`src/stores/slices/productsSlice.ts`](src/stores/slices/productsSlice.ts)):  
  Fetches, adds, edits, deletes, and paginates products.
- **Cart Slice** ([`src/stores/slices/cartSlice.ts`](src/stores/slices/cartSlice.ts)):  
  Manages cart items, quantities, and cart actions.
- **Filter Slice** ([`src/stores/slices/filterSlice.ts`](src/stores/slices/filterSlice.ts)):  
  Handles product filtering (price, brand, discount).

---

## UI Components

- **ProductCard** ([`src/components/ProductCard.tsx`](src/components/ProductCard.tsx)):  
  Displays product info, edit/delete/add-to-cart buttons.
- **AddProductModal** ([`src/components/AddProductModal.tsx`](src/components/AddProductModal.tsx)):  
  Modal for adding/editing products.
- **Filters** ([`src/components/Filters.tsx`](src/components/Filters.tsx)):  
  Sidebar for filtering products by price, brand, discount.
- **FeaturedProducts** ([`src/components/FeaturedProducts.tsx`](src/components/FeaturedProducts.tsx)):  
  Shows cart items and allows quantity adjustments.
- **Topbar** ([`src/organisms/Topbar.tsx`](src/organisms/Topbar.tsx)):  
  Navigation and theme toggle.

---

## Theming

- **Dark mode** is managed globally via Zustand (`darkMode` in UI slice).
- The [`ThemeWatcher`](src/HOC/ThemeWatcher.tsx) HOC syncs the Zustand dark mode state with the HTML root class.
- All components use Tailwind’s `dark:` classes for seamless theming.

---

## Persistence & Middleware

- **Persistence:**  
  Zustand’s `persist` middleware saves the store to localStorage (`zustand-store` key).
- **Devtools:**  
  Zustand’s `devtools` middleware enables Redux DevTools integration.
- **Immer:**  
  Used for immutable state updates in slices.

---

## Notifications

- Uses [sonner](https://sonner.emilkowal.ski/) for toast notifications.
- `<Toaster />` is added in [`src/main.tsx`](src/main.tsx) for global notifications.
- Toasts are triggered for product add/edit/delete, fetch errors, and cart actions.

---

## Best Practices

- **Modular Slices:** Each feature’s state and logic is isolated.
- **Type Safety:** All state and actions are typed with TypeScript.
- **UI Feedback:** Toasts provide instant feedback for user actions.
- **Dark Mode:** Consistent theming across the app.
- **Selectors:** Use selectors in `useStore` to avoid unnecessary re-renders.

---

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the dev server:**
   ```sh
   npm run dev
   ```
3. **Open [http://localhost:5173](http://localhost:5173) in your browser.**

---

## Credits

- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Vite](https://vitejs.dev/)

---

For any questions, check the code in the [`src/stores`](src/stores/store.ts) folder or reach out to the maintainer.
