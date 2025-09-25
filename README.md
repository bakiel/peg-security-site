# PEG Security Website

A modern, cyberpunk-inspired security company website with hero video, smooth animations, and professional design.

## 🌟 Features

- **Hero Video Section**: YouTube video loop as background
- **Smooth Animations**: CSS animations with glow effects and transitions
- **Responsive Design**: Mobile-first approach, works on all devices
- **Interactive Elements**: Counter animations, parallax scrolling, hover effects
- **Modern UI**: Dark theme with gold accents (#D0B96D brand colour)
- **Performance Optimized**: Lazy loading, smooth scroll, optimized assets

## 🚀 Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it: `peg-security-site`
4. Make it public
5. Don't initialize with README

### Step 2: Upload Files
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/peg-security-site.git
cd peg-security-site

# Copy website files here
# Add all files
git add .
git commit -m "Initial commit - PEG Security website"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: Deploy from branch
4. Branch: main
5. Folder: / (root)
6. Save

Your site will be live at: `https://YOUR_USERNAME.github.io/peg-security-site/`

## 📁 Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # All styles with animations
├── script.js           # JavaScript interactions
├── images/             # Image assets folder
│   ├── PEG-Security-Logo.jpg
│   ├── PEG-Security-Logo-no-BG.png
│   └── [other images]
└── README.md          # This file
```

## 🎨 Colour Palette

- **Spartan Gold**: `#D0B96D` - Primary brand colour
- **Onyx Black**: `#292B2B` - Dark backgrounds
- **Pure White**: `#FFFFFF` - Text on dark
- **Grey Medium**: `#666666` - Secondary text
- **Grey Light**: `#999999` - Captions

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🔧 Customization

### Change Hero Video
Replace the YouTube ID in the iframe src:
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1...">
```

### Update Contact Info
Edit the contact section in `index.html`:
```html
<p>Emergency: 079 413 9180<br>Office: 013 001 2849</p>
```

### Modify Colours
Update CSS variables in `styles.css`:
```css
:root {
    --gold: #D0B96D;
    --black: #292B2B;
    /* etc */
}
```

## 📊 SEO Optimization

Add these meta tags to `index.html`:
```html
<meta name="description" content="PEG Security - South Africa's Premier Security Force. 24/7 Armed Response, PSIRA Registered">
<meta name="keywords" content="security, armed response, South Africa, Mpumalanga, PEG Security">
<meta property="og:title" content="PEG Security - Elite Protection Services">
<meta property="og:description" content="Professional security services with 24/7 armed response">
<meta property="og:image" content="images/PEG-Security-Logo.jpg">
```

## 🚦 Performance Tips

1. **Optimize Images**: Compress all images before uploading
2. **Use CDN**: Images can be hosted on services like Cloudinary
3. **Enable Caching**: Add cache headers in GitHub Pages
4. **Minify Files**: Use minified versions of CSS/JS for production

## 📧 Form Handling

The contact form currently logs to console. To make it functional:

### Option 1: Formspree
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
```html
<form name="contact" netlify>
```

### Option 3: EmailJS
Add EmailJS integration in `script.js`

## 🛡️ Security Features

- PSIRA registration badge
- 24/7 emergency contact
- Trust indicators
- Professional certifications display

## 📈 Analytics

Add Google Analytics:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Credits

- **Design**: Modern cyberpunk-inspired theme
- **Fonts**: Poppins, Montserrat (Google Fonts)
- **Icons**: Font Awesome 6 Pro
- **Framework**: Vanilla HTML/CSS/JS for maximum performance

## 📄 License

© 2024 PEG Security. All Rights Reserved.

---

**Live Demo**: [View Site](#)
**Company**: PEG Holdings (Pty) Ltd
**Registration**: 2019/447310/07