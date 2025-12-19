# Images Folder Structure

## How to Use Local Images

### Folder Structure
```
src/assets/images/
├── gallery/          # Gallery carousel images
├── venues/           # Ceremony and Reception venue photos
└── hero-bg.jpg       # Hero section background (optional)
```

### Adding Images
1. Place your images in the appropriate folder:
   - Gallery photos → `src/assets/images/gallery/`
   - Venue photos → `src/assets/images/venues/`

2. Reference them in `website-content.ts`:
   ```typescript
   // For gallery
   gallery: [
     '/assets/images/gallery/photo1.jpg',
     '/assets/images/gallery/photo2.jpg',
   ]

   // For venues
   venues: [
     {
       image: '/assets/images/venues/ceremony.jpg',
       // ...
     }
   ]
   ```

### Supported Formats
- `.jpg` / `.jpeg`
- `.png`
- `.webp` (recommended for web - smaller file size)
- `.gif`

### Tips
- Keep image file sizes under 1MB for faster loading
- Use descriptive filenames (e.g., `ceremony-church.jpg`)
- Optimize images before uploading using tools like TinyPNG

### Example Update for website-content.ts
```typescript
gallery: [
  '/assets/images/gallery/baby-photo-1.jpg',
  '/assets/images/gallery/baby-photo-2.jpg',
  '/assets/images/gallery/baby-photo-3.jpg',
]
```
