# Bias Survey Results

A static website that compares, question by question, the class's answers to two versions of the same 17-question survey against real-world data:

- **Form 1: Accurate** — "answer in a way that you think is the most accurate representation of the real world"
- **Form 2: Fair** — "answer in a way that you think is the fairest"
- **Real-world data** — from *Bias Survey: Real-World Data Reference* (Nov 16, 2026)

No build step and no server code, so it runs on GitHub Pages as is.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page |
| `styles.css` | Styling (light and dark mode) |
| `app.js` | Reads the CSVs, counts answers, draws the charts |
| `reference.js` | Real-world answers, estimates and sources for each question. Edit this to change the reference data. |
| `data/form1.csv` | Google Forms export for Form 1 (Accurate) |
| `data/form2.csv` | Google Forms export for Form 2 (Fair) |

## Put it on GitHub Pages

1. Create a new repository on GitHub (it can be public, or private if your plan allows Pages on private repos).
2. Upload everything in this folder, keeping the `data` folder. On github.com: **Add file → Upload files**, then drag the files in.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, and click **Save**.
5. After a minute or two, the site is live at `https://<your-username>.github.io/<repository-name>/`.

## Update the data after class

From each Google Form: **Responses** tab → **Link to Sheets** (or open the linked sheet) → **File → Download → Comma-separated values (.csv)**.

Then either:

- **Make it permanent:** replace `data/form1.csv` and `data/form2.csv` in the repository with the new files (same names). GitHub Pages updates within a couple of minutes.
- **Show it right away:** on the live page, click **Upload a different CSV** on the Form 1 or Form 2 card (or drag the file onto the card). This only changes the page in your browser; it isn't saved to GitHub.

The page matches columns by question text, so the column order and the extra Timestamp column don't matter. Answers that don't match a choice are left out, and the page says how many.

## Presenting

Click **Present one question at a time** for a large, one-question view. Use the arrow keys, Page Up/Down or the buttons at the bottom to move between questions, and Esc to go back. Links like `#q5` open straight to a question.

## Preview locally

Opening `index.html` directly from disk can block the CSVs from loading. Run a local server from this folder instead:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
