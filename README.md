# Devansh Bhardwaj — Portfolio

Personal portfolio of Devansh Bhardwaj: B.Tech CSE student at GIT Jaipur (affiliated to RTU Kota), founder of [Orbnet](https://orbnet.in), and frontend developer.

The site works like a conversation. Visitors pick a topic or type a question, and the page answers in my own words. Every answer is written by hand; a small keyword scorer picks the right one, so nothing is generated.

## What's in it

- **Conversation-style answers** about Orbnet, my Palarsoft internship, Vidhyasthali Library, the Algorithm Soft YouTube channel, skills, hackathons and contact details.
- **"Answers for" selector**: Recruiter, Engineer, Founder or Creator. Each adds a short note aimed at that reader.
- **Work panel** with project cards, the internship certificate (full-size view and download), skills and a contact card.
- **3D particle field** built with raw WebGL. Thousands of particles drift toward the camera, and a coloured ring follows the cursor. It dims during conversations and stays still when the visitor has reduced motion turned on.
- **Small 3D touches**: cards tilt toward the pointer and the profile photo has an orbiting ring.
- **Responsive** from 320px phones to wide desktops, including phones held sideways.
- **Accessible**: keyboard-navigable, with visible focus states and labelled controls.

## Built with

Plain HTML, CSS and JavaScript, with no framework and no build step. WebGL for the background. Fonts: Google Sans and Google Sans Code.

```
index.html      markup: sidebar, conversation, work panel
style.css       design tokens, layout, animation, responsive rules
script.js       answers, intent matching, markdown rendering, UI state
background.js   WebGL particle field
```

## Run locally

```bash
python3 -m http.server 3000
```

Then open http://localhost:3000. Opening `index.html` directly also works.

## Contact

- Email: [devanshbhardwaj375@gmail.com](mailto:devanshbhardwaj375@gmail.com)
- LinkedIn: [devansh-bhardwaj](https://www.linkedin.com/in/devansh-bhardwaj-b82632324/)
- Orbnet: [orbnet.in](https://orbnet.in)
- Vidhyasthali Library: [vidhyasthalilibrary.online](https://www.vidhyasthalilibrary.online/)
