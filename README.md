# ai.engineer — Portfolio Site

Personal portfolio of Srinu Ravuri, AI Engineer. Built with plain HTML, CSS, and JavaScript — no build step, no framework, instant load.

## Pages

- Home, About, Projects, AI Lab, Automation, Blog (+ article pages), Journey, Resources, Resume, Contact
- Plus: Privacy, Terms, Sitemap, 404

## Features

- **Contact form → n8n webhook → email**: submissions POST to an n8n workflow (`assets/js/contact.js`). The workflow emails the owner with the visitor's details. **Note:** the n8n workflow must be **Active** for the production webhook URL to respond.
- **Resume → PDF download**: real PDF generated in-browser with jsPDF (`assets/js/resume.js`).
- **Blog**: real article pages (`blog-post.html?post=<slug>`), content in `assets/js/data.js`.
- **AI Lab**: browser-only demos (chatbot, prompt generator, summarizer) — clearly labeled as sample responses.
- **SEO**: unique title/description per page, `sitemap.xml`, `robots.txt`, schema.org Person markup.

## Edit content

All site content lives in one file: `assets/js/data.js` (projects, blog posts, timeline, resume). Site-wide links and contact info are there too.

## Contact form / n8n

The webhook URL is at the top of `assets/js/contact.js`:

```js
var N8N_WEBHOOK_URL = "https://srinuravuri.app.n8n.cloud/webhook/contact-form";
```

Payload sent per submission:

```json
{
  "name": "…",
  "email": "…",
  "projectType": "Side Project | Startup | Enterprise",
  "message": "…",
  "submittedAt": "ISO timestamp"
}
```

## Deploy

Push to GitHub and enable GitHub Pages (Settings → Pages → deploy from main branch root), or host anywhere static files are served.
