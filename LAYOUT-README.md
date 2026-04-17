# Spirit Website Layout System

## Overview
This website uses a modular layout system with separate header and footer files for easy maintenance across multiple pages.

## Structure

```
spirit-website/
├── includes/
│   ├── header.html    # Site header with navigation
│   └── footer.html    # Site footer with newsletter & info
├── js/
│   ├── layout.js      # Handles loading header/footer
│   └── script.js      # Page functionality
├── css/
│   └── style.css      # All styles
├── index.html         # Home page
├── about.html         # About page
├── shop.html          # Shop page
└── contact.html       # Contact page
```

## How It Works

1. **Header & Footer**: Stored in `includes/` folder
2. **Layout.js**: Automatically loads header and footer into each page
3. **Active Menu**: Uses `data-page` attribute on body tag to highlight current page

## Creating New Pages

To create a new page:

1. Copy any existing page (e.g., `about.html`)
2. Update the `data-page` attribute in the `<body>` tag:
   ```html
   <body data-page="your-page-name">
   ```
3. Update the page title and content
4. The header and footer will load automatically

## Active Menu Detection

The active menu item color is **#2a7d8f** (teal). The system automatically detects which page you're on based on the `data-page` attribute and highlights the corresponding menu item.

Example:
- `index.html` has `data-page="home"` → HOME menu item is active
- `shop.html` has `data-page="shop"` → SHOP button is active

## Navigation Menu

Links in the header use `data-page` attributes that match the body's `data-page`:
- HOME → `data-page="home"`
- ABOUT US → `data-page="about"`
- BRAND → `data-page="brand"`
- SHOP → `data-page="shop"`
- CONTACT US → `data-page="contact"`

## Important Notes

- Always include `js/layout.js` before `js/script.js`
- Each page needs both header and footer placeholders
- The active menu color (#2a7d8f) is automatically applied by `layout.js`
