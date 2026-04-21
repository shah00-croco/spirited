# Brand Layout System Guide

## Overview
The brand pages use a **single HTML file** (`brand.html`) with a **flexible, JSON-driven layout system**. You can customize each brand's layout without creating new HTML files.

## How to Add a New Brand

### 1. Add Brand Data to `data/brands.json`

```json
{
    "id": "new-brand",
    "name": "NEW BRAND DISTILLERY",
    "heroTitle": "NEW BRAND\nDISTILLERY",
    "heroBackground": "assets/images/backgrounds/cover-XX.png",
    "icon": "assets/images/brand-logo/newbrand.png",
    "mainImage": "assets/images/brands/newbrand-main.jpg",
    "storyText": "Your brand story here...",
    "category": "WHISKY",
    
    "layout": [
        {
            "type": "story",
            "imagePosition": "left"
        },
        {
            "type": "products"
        }
    ]
}
```

### 2. Update Navigation in `includes/header.html`

Add a new dropdown row:

```html
<div class="brand-dropdown-row">
    <div class="brand-category">WHISKY</div>
    <a href="brand.html?id=new-brand" class="brand-name">NEW BRAND</a>
</div>
```

### 3. Access the Brand Page

Visit: `brand.html?id=new-brand`

## Available Layout Sections

### 1. Story Section
Displays brand icon, name, main image, and story text.

```json
{
    "type": "story",
    "imagePosition": "left"  // or "right"
}
```

**Required data:**
- `mainImage`
- `icon`
- `name`
- `storyText`

**Options:**
- `imagePosition`: `"left"` (default) or `"right"`

---

### 2. Details Section
Displays multiple detail images in a grid layout.

```json
{
    "type": "details"
}
```

**Required data:**
- `detailImages`: Array of image paths
- `detailText`: (optional) Text description

**Example:**
```json
"detailImages": [
    "assets/images/brands/brand-detail-1.jpg",
    "assets/images/brands/brand-detail-2.jpg",
    "assets/images/brands/brand-detail-3.jpg"
],
"detailText": "Optional description text"
```

---

### 3. Landscape Section
Full-width landscape image with optional text overlay.

```json
{
    "type": "landscape"
}
```

**Required data:**
- `landscapeImage`: Path to landscape image
- `landscapeText`: (optional) Text overlay

---

### 4. Products Section
Displays related products from the brand category.

```json
{
    "type": "products",
    "title": "RELATED PRODUCT"  // optional custom title
}
```

**Options:**
- `title`: Custom section title (default: "RELATED PRODUCT")

---

## Layout Examples

### Full Layout Example (Nagahama)
```json
"layout": [
    {
        "type": "story",
        "imagePosition": "left"
    },
    {
        "type": "details"
    },
    {
        "type": "landscape"
    },
    {
        "type": "products"
    }
]
```

### Simple Layout Example (Kaikyo)
```json
"layout": [
    {
        "type": "story",
        "imagePosition": "right"
    },
    {
        "type": "products"
    }
]
```

### Custom Order Example
```json
"layout": [
    {
        "type": "products",
        "title": "OUR COLLECTION"
    },
    {
        "type": "story",
        "imagePosition": "left"
    },
    {
        "type": "landscape"
    }
]
```

## Tips

1. **Section Order**: Sections render in the order specified in the `layout` array
2. **Optional Sections**: Omit sections you don't need (e.g., if no detail images, don't include `details`)
3. **Fallback**: If no `layout` is specified, defaults to: story → details → landscape → products
4. **Image Position**: Use `"imagePosition": "right"` to create visual variety between brands
5. **Empty Arrays**: If `detailImages` is empty `[]`, the details section won't render

## File Structure

```
spirit-website/
├── brand.html                 # Single brand template
├── data/
│   └── brands.json           # All brand data & layouts
├── includes/
│   └── header.html           # Navigation (update for new brands)
└── js/
    └── brand.js              # Layout rendering logic
```

## Adding Custom Section Types (Advanced)

To add a new section type:

1. Create a new render function in `js/brand.js`:
```javascript
function renderCustomSection(brand, config = {}) {
    return `
        <section class="brand-custom-section">
            <!-- Your custom HTML -->
        </section>
    `;
}
```

2. Add it to the switch statement in `renderSection()`:
```javascript
case 'custom':
    return renderCustomSection(brand, section);
```

3. Use it in your brand's layout:
```json
{
    "type": "custom",
    "yourOption": "value"
}
```

4. Add corresponding CSS in `css/style.css`
