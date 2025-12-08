# Product Store - React Redux

A fully functional store page built with React, Redux Toolkit, and Tailwind CSS featuring a comprehensive search and filter system.

## Features

### Search & Filter System
- **Search**: Real-time search across product names, descriptions, and brands
- **Category Filter**: Filter products by categories (Electronics, Sportswear, Home & Kitchen, Accessories)
- **Brand Filter**: Filter by multiple brands
- **Price Range**: Adjustable min/max price sliders
- **Stock Filter**: Toggle to show only in-stock items
- **Sorting**: Sort by name, price (ascending/descending), or rating

### Product Display
- Grid layout with responsive design
- Product cards showing:
  - High-quality product images
  - Product name, brand, and category
  - Price and rating
  - Stock status
  - Product description

### State Management
- Redux Toolkit for centralized state management
- Efficient filtering and sorting logic
- All filters work together seamlessly

## Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProductCard.tsx
│   ├── SearchBar.tsx
│   └── FilterPanel.tsx
├── pages/              # Page components
│   └── StorePage.tsx
├── store/              # Redux store and slices
│   ├── store.ts
│   └── productsSlice.ts
├── types/              # TypeScript type definitions
│   └── product.ts
├── data/               # Sample data
│   └── products.ts
├── App.tsx            # Root component
└── main.tsx          # Application entry point
```

## Features in Detail

### Redux Store
The store manages:
- All products
- Filtered products
- Search query
- Active filters
- Sort preferences

### Filter Logic
All filters are applied in sequence:
1. Search query matching
2. Category filtering
3. Brand filtering
4. Price range filtering
5. Stock availability filtering
6. Sorting

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly controls
