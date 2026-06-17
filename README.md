# 🚀 Bano - Advanced Shopify Theme

> Premium multi-purpose Shopify theme with ultra-fast performance, best-in-class UX/UI design, and 25+ advanced features.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/mrshahbazdev/shopify-theme)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Shopify](https://img.shields.io/badge/Shopify-9%2B-brightgreen.svg)](https://www.shopify.com)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🚀 **Ultra-Fast** | Core Web Vitals optimized (LCP < 2.5s, CLS < 0.1) |
| 🎨 **Modern Design** | Clean, conversion-focused UI |
| 🌓 **Dark Mode** | System preference + manual toggle |
| 🌐 **RTL Support** | Full right-to-left language support |
| 🌍 **Multi-Language** | English & Hindi included |
| 📱 **Mobile-First** | Fully responsive |
| 🔍 **Advanced Search** | Instant search with predictions |
| 🎯 **Smart Filters** | URL-based filtering |
| ⚡ **Quick View** | Fast product preview modal |
| ❤️ **Wishlist & Compare** | LocalStorage based |
| 🛒 **Cart Drawer** | Slide-out cart panel |
| ♿ **Accessible** | WCAG 2.1 compliant |

---

## 📦 Sections Included

| Category | Sections |
|----------|----------|
| 🏠 **Header** | Header, Mega Menu, Announcement Bar |
| 🎬 **Hero** | Hero Banner, Video Section |
| 📦 **Products** | Featured Collection, Product Grid, Product Card |
| 🔍 **Advanced** | Filter Drawer, Search, Quick View, Compare, Wishlist |
| 🛒 **Cart** | Cart Drawer, Sticky Add-to-Cart |
| 📝 **Content** | Testimonials, FAQ, Countdown Timer, Image Gallery |
| 📰 **Social** | Blog Posts, Logo Carousel, Newsletter |
| 🔗 **Footer** | Footer with Social Links |

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- Shopify CLI
- Shopify Partner account or dev store

### Installation

```bash
# Clone the repository
git clone https://github.com/mrshahbazdev/shopify-theme.git
cd shopify-theme

# Install dependencies
npm install

# Build Tailwind CSS
npm run build:tailwind

# Connect to Shopify store
shopify auth login
shopify theme dev --store your-store.myshopify.com
```

---

## 📁 Project Structure

```
shopify-theme/
├── .github/
│   └── workflows/      # GitHub Actions
├── assets/
│   ├── css/           # Tailwind CSS
│   └── js/            # Theme JavaScript
├── config/            # Theme settings
├── layout/           # theme.liquid, password.liquid
├── locales/          # Translations (EN, HI)
├── sections/         # 25+ Customizable sections
├── snippets/         # Reusable components
├── templates/        # Page templates
└── package.json
```

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| Shopify Liquid | Template engine |
| Tailwind CSS 3.x | Styling |
| Vanilla JavaScript | Interactivity |
| Swiper.js | Carousels & sliders |
| AOS | Scroll animations |

---

## ⚡ Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |

---

## 🌐 Localization

Ready for multi-language:

- 🇺🇸 English (default)
- 🇮🇳 Hindi

To add more languages:
1. Copy `locales/en.default.json`
2. Translate all strings
3. Enable in Shopify Admin

---

## 🤖 Automation

### Dependabot Auto-Merge

This repo includes GitHub Actions for automatic Dependabot PR merging:

- ✅ Auto-merges when tests pass
- ⏳ Waits for CI checks
- 🚫 Respects "do-not-merge" labels

Enable in: **Settings → General → Pull Requests → Allow auto-merge**

---

## 📜 License

MIT License - feel free to use for personal or commercial projects.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ for the Shopify ecosystem**

[![Stars](https://img.shields.io/github/stars/mrshahbazdev/shopify-theme?style=social)](https://github.com/mrshahbazdev/shopify-theme)
[![Forks](https://img.shields.io/github/forks/mrshahbazdev/shopify-theme?style=social)](https://github.com/mrshahbazdev/shopify-theme)

</div>
