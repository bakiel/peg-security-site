#!/bin/bash

# PEG Security Website Build Script
# =================================

echo "🚀 PEG Security Website Builder"
echo "================================"
echo ""

# Function to display menu
show_menu() {
    echo "Choose an option:"
    echo "1) Start local server (port 8080)"
    echo "2) Check website files"
    echo "3) Open in browser"
    echo "4) Build for production"
    echo "5) Exit"
}

# Function to start server
start_server() {
    echo "📦 Starting local server on http://localhost:8080"
    python3 -m http.server 8080
}

# Function to check files
check_files() {
    echo "📋 Checking website files..."
    echo ""
    
    required_files=(
        "index.html"
        "services.html"
        "styles.css"
        "services-styles.css"
        "script.js"
        "services-script.js"
    )
    
    missing_files=0
    
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            echo "✅ $file - Found"
        else
            echo "❌ $file - Missing"
            missing_files=$((missing_files + 1))
        fi
    done
    
    echo ""
    echo "📁 Image files:"
    ls -la images/*.jpg images/*.png 2>/dev/null | wc -l | xargs echo "   Total images:"
    
    if [ $missing_files -eq 0 ]; then
        echo ""
        echo "✨ All required files present!"
    else
        echo ""
        echo "⚠️  $missing_files file(s) missing"
    fi
}

# Function to open in browser
open_browser() {
    echo "🌐 Opening website in browser..."
    open http://localhost:8080
}

# Function to build for production
build_production() {
    echo "🔨 Building for production..."
    echo ""
    
    # Create build directory
    mkdir -p build
    
    # Copy all files
    cp -r *.html *.css *.js images/ build/
    
    # Minify CSS (if minifier available)
    if command -v csso &> /dev/null; then
        echo "   Minifying CSS..."
        csso styles.css -o build/styles.min.css
        csso services-styles.css -o build/services-styles.min.css
    else
        echo "   CSS minifier not found, copying as-is"
    fi
    
    # Minify JS (if minifier available)
    if command -v terser &> /dev/null; then
        echo "   Minifying JavaScript..."
        terser script.js -o build/script.min.js
        terser services-script.js -o build/services-script.min.js
    else
        echo "   JS minifier not found, copying as-is"
    fi
    
    echo ""
    echo "✅ Production build complete in ./build/"
    echo ""
    echo "📦 Ready for deployment to GitHub Pages:"
    echo "   1. Create a GitHub repository"
    echo "   2. Push the website files"
    echo "   3. Enable GitHub Pages in Settings > Pages"
    echo "   4. Select 'Deploy from branch' and choose main/root"
}

# Main loop
while true; do
    show_menu
    read -p "Enter choice [1-5]: " choice
    
    case $choice in
        1)
            start_server
            ;;
        2)
            check_files
            echo ""
            ;;
        3)
            open_browser
            echo ""
            ;;
        4)
            build_production
            ;;
        5)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            echo ""
            ;;
    esac
done