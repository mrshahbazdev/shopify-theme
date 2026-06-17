# Bano - Advanced Shopify Theme

> Premium multi-purpose Shopify theme with ultra-fast performance, best-in-class UX/UI design, and advanced features.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Shopify](https://img.shields.io/badge/Shopify-9%2B-brightgreen.svg)

## ✨ Features

- 🚀 **Ultra-Fast Performance** - Core Web Vitals optimized (LCP < 2.5s, CLS < 0.1)
- 🎨 **Best-in-Class Design** - Modern, clean, and conversion-focused UI
- 🌓 **Dark Mode** - System preference detection + manual toggle
- 🌐 **RTL Support** - Full right-to-left language support
- 🌍 **Multi-Language Ready** - Translation files included
- 📱 **Mobile-First** - Fully responsive design
- 🔍 **Advanced Search** - Instant search with predictions
- 🎯 **Advanced Filtering** - URL-based filtering without page reload
- 📋 **Mega Menu** - Rich dropdown navigation
- ⚡ **Quick View** - Fast product preview modal
- ❤️ **Wishlist & Compare** - LocalStorage based
- 🛒 **Cart Drawer** - Slide-out cart panel
- 📦 **PWA Ready** - Progressive Web App support
- ♿ **Accessible** - WCAG 2.1 compliant

## 📁 Theme Structure

```
bano-theme/
├── config/              # Theme settings (settings_schema.json)
├── layout/              # theme.liquid, password.liquid
├── templates/           # All page templates
├── sections/            # Customizable sections (50+ sections)
├── snippets/            # Reusable code snippets
├── assets/              # CSS, JS, Images
└── locales/             # Translation files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Shopify CLI (`npm install -g @shopify/cli @shopify/theme`)
- Shopify Partner account or development store

### Installation

1. **Clone/Download the theme**
   ```bash
   git clone <repository-url>
   cd bano-theme
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Connect to Shopify store**
   ```bash
   shopify auth login
   shopify theme dev --store your-store.myshopify.com
   ```

4. **Development**
   ```bash
   # Run Tailwind CSS build in watch mode
   npm run dev:tailwind
   
   # Or run both Shopify dev and Tailwind concurrently
   npm run watch
   ```

### Build for Production

```bash
npm run build
```

## 📝 Customization

### Theme Settings

All theme settings are configurable through `config/settings_schema.json`:

- **Colors**: Primary, secondary, accent colors with dark mode variants
- **Typography**: Font families, sizes, weights
- **Layout**: Container width, spacing, grid settings
- **Buttons**: Styles, sizes, border radius
- **Sections**: 50+ customizable sections

### Sections Available

| Category | Sections |
|----------|----------|
| **Header** | Header, Mega Menu, Announcement Bar |
| **Hero** | Hero Banner, Video Section |
| **Products** | Featured Collection, Product Grid, Product Card |
| **Advanced** | Filter Drawer, Search Drawer, Quick View, Compare, Wishlist |
| **Cart** | Cart Drawer, Sticky Add-to-Cart |
| **Content** | Testimonials, FAQ, Countdown Timer, Image Gallery |
| **Social** | Blog Posts, Logo Carousel, Newsletter |
| **Footer** | Footer, Social Links |

## 🎨 Tech Stack

- **Framework**: Shopify Liquid + Vanilla JavaScript
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide Icons
- **Animations**: AOS (Animate on Scroll)
- **Build Tool**: Shopify CLI

## 📊 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari
- Android Chrome

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Shopify theme development server |
| `npm run dev:tailwind` | Watch Tailwind CSS changes |
| `npm run build:tailwind` | Build optimized Tailwind CSS |
| `npm run build` | Full production build |

### Adding Custom Sections

1. Create a new file in `sections/` folder
2. Add schema for customization options
3. Use `{% section 'your-section-name' %}` in templates

### Adding Snippets

1. Create a new file in `snippets/` folder
2. Include with `{% render 'snippet-name' %}`

## 📄 Templates

| Template | File |
|----------|------|
| Homepage | `templates/index.json` |
| Collection | `templates/collection.json` |
| Product | `templates/product.json` |
| Blog | `templates/blog.json` |
| Article | `templates/article.json` |
| Page | `templates/page.json` |
| Search | `templates/search.json` |
| 404 | `templates/404.json` |
| Contact | `templates/page.contact.json` |

## 🌐 Localization

Translation files are available in `locales/`:
- English (default)
- Hindi (hi)
- Ready for more languages

To add a new language:
1. Copy `locales/en.default.json` to `locales/[lang].json`
2. Translate all strings
3. Enable in Shopify admin Languages settings

## ⚡ Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ for the Shopify ecosystem