# Photos

To add a photo:
1. Drop a JPG/PNG/WebP into this folder (e.g. `05.jpg`)
2. Open `photos.json` and add a line:
   `{ "file": "05.jpg", "caption": "your caption" }`
3. Save. Refresh the site.

Tips
- Keep filenames lowercase, no spaces.
- Resize to ~1600px on the long edge for fast loads.
- Order in the JSON = order on the page.
- If `photos.json` is empty or missing, the site falls back to placeholders.
