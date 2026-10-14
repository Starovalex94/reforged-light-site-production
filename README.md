# Reforged Light Sobriety

The site has three pages: Home (`/`), About (`/about`), and Book & Contact (`/contact`).

Most visible copy, links, and image paths live in [`src/data/site-content.json`](src/data/site-content.json). The pages read that file directly, so a text change there does not require editing the React components. A few contact details and the hero video file live outside that JSON file. Those are called out below.

## Preview a change

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open the local address Vite prints (usually http://localhost:5173). Saving the JSON file reloads the page.

## How to edit

1. Open `src/data/site-content.json`.
2. Change the text inside the quotes.
3. Leave the keys (the words before each colon), commas, and brackets in place.
4. Save the file and check the preview.

The browser tab title comes from `site.title`. The same words are also set in `index.html` (`<title>`). Change both if you rename the site, or the first paint still shows the old title.

## Home page

### Header — `header`

| Field | What it changes |
| --- | --- |
| `logo` | The name in the header. An icon sits to its left. |
| `nav` | Menu labels and destinations. Each item is `{ "label": "About", "href": "/about" }`. |

Current menu destinations are `/`, `/about`, and `/contact`.

### Hero — `hero`

| Field | What it changes |
| --- | --- |
| `subtitle` | Small line above the headline. |
| `headlineLines` | Headline. Each string is its own line. |
| `primaryCta` | The About program button. It has a `label` and an `href`. It currently scrolls to `#consultations`, the winding path. |
| `secondaryCta` | The Book and Consultations button. It has a `label` and an `href`. It currently scrolls to `#training`, the section with Book your spot. |

The background video is the file `public/hero-video.mp4`. Replace that file to change the clip. The loop window (seconds 9 through 36) is set in `src/components/Hero.jsx`, not in the JSON file.

`youtubeVideoId`, `youtubeStartSeconds`, `youtubeEndSeconds`, and `videoPoster` are still in the JSON file, but the hero does not read them.

### About (home scroll section) — `about`

This is the scrolling section on the home page, not the About page.

| Field | What it changes |
| --- | --- |
| `headlineLines` | Large headline that fades as you scroll. Each string is its own line. |
| `body` | Paragraph that replaces the headline. Write normal sentences. The page splits the paragraph on `.`, `!`, and `?` and animates one sentence at a time. |

### Benefits — `benefits`

Image on the left, text on the right.

| Field | What it changes |
| --- | --- |
| `imageSrc` | Photo. Current file is `/stacked_rocks.jpg`. |
| `imageAlt` | Description of the photo for screen readers. |
| `title` | Headline. |
| `body` | Paragraph under the headline. |
| `listLabel` | Small label above the checklist. |
| `listItems` | Checklist rows. One string per row. |

### Consultations path — `progress`

Scroll-driven path over a background photo. It is not in the menu.

| Field | What it changes |
| --- | --- |
| `backgroundImage` | Full-bleed photo. Current file is `/flower_growing.jpg`. |
| `steps` | The stops on the path. Each step has a `title` and a `body`. |

Keep exactly four steps. The path is drawn for four stops. Adding or removing a step needs a change in `src/components/ProgressSection.jsx`.

### Teacher training — `training`

Sticky headline on the left, stacked cards on the right.

| Field | What it changes |
| --- | --- |
| `headlineLines` | Left-side headline. Each string is its own line. |
| `body` | Paragraph under that headline. |
| `cta` | Button label and link (`label` and `href`). It currently goes to `/contact`. |
| `whatsIncludedLabel` | Small label above the cards. |
| `cards` | One object per card, with `title` and `body`. |

### Programs — `programs`

Same fields as `benefits` (`imageSrc`, `imageAlt`, `title`, `body`, `listLabel`, `listItems`). The current image is `/walking_downstairs.jpg`.

This block is hidden on the home page. Editing `programs` will not show up until the hidden wrapper in `src/pages/HomePage.jsx` is removed.

### Footer — `footer`

| Field | What it changes |
| --- | --- |
| `brandName` | Name in the footer. |
| `tagline` | Line under the name. |
| `nav` | Footer links. Same shape as the header menu. |
| `social` | Social links. Each has a `label` and an `href`. They open in a new tab. |
| `copyrightName` | Name in the copyright line. The year updates automatically. |

## About page — `aboutPage`

Shown at `/about`.

| Field | What it changes |
| --- | --- |
| `subtitle` | Small label above the headline. |
| `headline` | Page headline. This is one string, not separate lines. |
| `imageSrc` | Portrait. Current file is `/alex_profile_photo.jpg`. |
| `imageAlt` | Description of the portrait. |
| `paragraphs` | Body copy. One string per paragraph. |
| `quote` | Italic quote under the paragraphs. Leave it as an empty string to hide the quote. |

## Book & Contact page — `contact`

Shown at `/contact`.

| Field | What it changes |
| --- | --- |
| `subtitle` | Small label above the title. |
| `title` | Page title. |
| `formLabels.name` | Name field label. |
| `formLabels.email` | Email field label. |
| `formLabels.phone` | Phone field label. |
| `formLabels.message` | Message field label. |

The intro paragraph, the call/text number, the email address, and the WhatsApp number are written in `src/components/ContactSection.jsx`:

- Email: `Reforginglightsobriety@gmail.com`
- WhatsApp and phone: `(929) 704-8467`

Change those in that file. The JSON file does not control them.

## Links

Menu and footer links use page paths: `/`, `/about`, and `/contact`.

A link that starts with `#` scrolls to a section on the home page. These ids exist today:

- `#home`
- `#about`
- `#benefits`
- `#consultations`
- `#training`

## Images and video

Photo fields take a path such as `/stacked_rocks.jpg`. Put the file in the `public` folder and match the name, including the leading slash. A full `https://` URL also works.

Files in `public` today:

- `hero-video.mp4` — hero background
- `stacked_rocks.jpg` — benefits photo
- `flower_growing.jpg` — consultations background
- `walking_downstairs.jpg` — programs photo (section is hidden)
- `alex_profile_photo.jpg` — About page portrait

## Rules that keep the page working

- Keep the file valid JSON. Quotes stay around text, commas stay between items, and the last item in a list has no trailing comma.
- Do not rename or delete keys. The components look up these exact names.
- Strings inside one list must be unique. Headlines, checklist rows, and card titles are also used as keys, so two identical lines in the same list will clash.
- Checklist and card text can be as long as you need. The layout wraps it.

Layout, colors, fonts, and scroll animations live in `src/components`, `src/pages`, and `src/index.css`. Those files are separate from the copy in `site-content.json`.
