# 🚀 PEG Security Website - Deployment Guide

## 📦 Website Files Overview

Your professional PEG Security website is now complete and ready for deployment!

### ✅ Completed Files:

#### **Main Pages**
- `index.html` - Home page with hero video modal, services overview, about section
- `services.html` - Comprehensive services page with pricing packages

#### **Stylesheets**
- `styles.css` - Main stylesheet for home page (43KB)
- `services-styles.css` - Services page specific styles (11KB)

#### **JavaScript**
- `script.js` - Main interactivity and animations (13KB)
- `services-script.js` - Services page interactions (9KB)

#### **Images** (17 professional images)
- Logo and branding
- Security personnel photos
- Certification showcase images
- Background patterns

#### **Utilities**
- `build.sh` - Build and deployment script
- `responsive_test.html` - Test responsive design
- `README.md` - GitHub Pages setup instructions
- `UNUSED_IMAGES_INVENTORY.md` - Available images for expansion

---

## 🌐 Local Testing

### Quick Start
```bash
# Navigate to website folder
cd /Users/mac/Downloads/PEG_Security_Profile_Design_Project/website

# Start local server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

### Using Build Script
```bash
# Make script executable (only needed once)
chmod +x build.sh

# Run the build script
./build.sh

# Choose option 1 to start server
```

---

## 📱 Test on Different Devices

1. **Desktop**: http://localhost:8080
2. **Mobile Testing**: 
   - Get your computer's IP: `ipconfig getifaddr en0`
   - On mobile: `http://YOUR_IP:8080`
3. **Responsive Test Page**: http://localhost:8080/responsive_test.html

---

## 🚀 Deploy to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it: `peg-security-website`
3. Set to Public
4. Don't initialize with README

### Step 2: Push to GitHub
```bash
# Initialize git in website folder
cd /Users/mac/Downloads/PEG_Security_Profile_Design_Project/website
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - PEG Security professional website"

# Add your repository as origin
git remote add origin https://github.com/YOUR_USERNAME/peg-security-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: Deploy from a branch
4. Branch: main, folder: / (root)
5. Click Save

### Step 4: Access Your Live Site
Your site will be live at:
```
https://YOUR_USERNAME.github.io/peg-security-website/
```

---

## 🎯 Custom Domain (Optional)

### To use a custom domain like `pegsecurity.co.za`:

1. **In GitHub repository**:
   - Create file `CNAME` with content: `pegsecurity.co.za`

2. **In domain registrar**:
   - Add A records pointing to GitHub:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Enable HTTPS**:
   - In GitHub Pages settings, check "Enforce HTTPS"

---

## 📊 Website Features

### ✨ Completed Features:
- ✅ Responsive design for all devices
- ✅ Hero carousel with 3 security images
- ✅ Video popup modal (YouTube integration)
- ✅ Service categories with pricing
- ✅ 3-tier package system
- ✅ Certification showcase
- ✅ Contact form
- ✅ 24/7 emergency button
- ✅ Smooth animations
- ✅ Mobile hamburger menu
- ✅ Dark cyberpunk theme with gold accents

### 🎨 Design Elements:
- Color Scheme: #D0B96D (Gold), #292B2B (Dark), #FFFFFF (White)
- Font: Poppins (Google Fonts)
- Icons: Font Awesome Pro
- Effects: Glassmorphism, hover animations, parallax

---

## 📈 Performance Optimization

### Already Implemented:
- Optimized images
- Lazy loading
- Smooth animations with GPU acceleration
- Minimal external dependencies

### Future Optimization:
```bash
# Install minifiers
npm install -g csso-cli terser

# Minify CSS
csso styles.css -o styles.min.css

# Minify JS
terser script.js -o script.min.js -c -m
```

---

## 🔧 Maintenance

### To Update Content:
1. Edit HTML files directly
2. Test locally with `python3 -m http.server 8080`
3. Commit and push changes:
```bash
git add .
git commit -m "Update: description of changes"
git push
```

### To Add New Images:
1. Place images in `images/` folder
2. Optimize for web (max 1920px width)
3. Update HTML to reference new images

---

## 📞 Support

### File Locations:
- **Main folder**: `/Users/mac/Downloads/PEG_Security_Profile_Design_Project/website/`
- **Images**: `./images/`
- **Unused images**: See `UNUSED_IMAGES_INVENTORY.md`

### Quick Commands:
```bash
# Start server
cd website && python3 -m http.server 8080

# Check all files
ls -la

# View in browser
open http://localhost:8080
```

---

## 🎉 Congratulations!

Your PEG Security website is complete and ready for the world! The professional design, comprehensive service showcase, and modern functionality will help establish PEG Security as South Africa's premier security force.

**Next Steps:**
1. Test locally ✅
2. Deploy to GitHub Pages
3. Share with stakeholders
4. Monitor and update as needed

---

*Built with excellence by Claude | Powered by modern web technologies*