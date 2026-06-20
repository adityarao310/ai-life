import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(
  new URL("../assets/styles.css", import.meta.url),
  "utf8"
);
const cname = readFileSync(new URL("../CNAME", import.meta.url), "utf8").trim();
const normalizedHtml = html.replace(/\s+/g, " ");

const failures = [];

function expect(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function stripTags(value) {
  return value
    .replace(/<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cssBlock(selector) {
  const match = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([\\s\\S]*?)\\n\\}`));
  return match?.[1] ?? "";
}

expect(
  !normalizedHtml.includes("Your AI video partner"),
  "Eyebrow copy should be removed"
);
expect(!html.includes("intro-line"), "Eyebrow element should be removed");
expect(!css.includes("intro-line"), "Eyebrow CSS should be removed");
expect(cname === "hirogi.com", "CNAME should point at the current production domain");

expect(
  html.includes("<title>Hiro Labs - Scale your video production</title>"),
  "Page title should match the requested Hiro Labs title"
);

expect(
  normalizedHtml.includes(
    "For businesses that need to ship on-brand videos, faster."
  ),
  "Subheading copy is missing or changed"
);

expect(
  !normalizedHtml.includes(
    "Agentic video creation · Photo dump to Tiktok reel · AI Dubbing · Analyse competitor ads · AI Product photoshoots"
  ),
  "Capability line should be removed"
);
expect(!html.includes("hero-capabilities"), "Capability paragraph should be removed");
expect(!css.includes("hero-capabilities"), "Capability CSS should be removed");

expect(
  html.includes('"Scale your video production with custom-built AI agents."'),
  "Typewriter headline text is missing or changed"
);

expect(
  html.includes('const HIGHLIGHT_TEXT = "video production";'),
  "Headline highlight should remain on video production"
);

const heroActions = html.match(
  /<div id="hero-actions" class="hero-actions">([\s\S]*?)<\/div>/
)?.[1];
expect(Boolean(heroActions), "Hero actions block not found");

if (heroActions) {
  const actions = [...heroActions.matchAll(/<a\b[\s\S]*?<\/a>/g)].map(
    ([anchor]) => ({
      html: anchor,
      text: stripTags(anchor),
    })
  );

  expect(actions.length === 2, "Hero should have exactly two CTA links");
  expect(actions[0]?.text === "See our work", "Primary CTA should be See our work");
  expect(actions[0]?.html.includes("action-pill-primary"), "See our work should be primary");
  expect(
    actions[0]?.html.includes(
      "https://docs.google.com/presentation/d/e/2PACX-1vQEF5UT96eRZYg6ajkmgODOXTax4UsARUxdrByEbkUnnPuE-IxtbBcwUHCwl6VVsKKn3NCQ0emS_eNA/pub?start=true&loop=false&delayms=30000"
    ),
    "See our work should link to the slideshow"
  );
  expect(actions[1]?.text === "Discuss a project", "Secondary CTA should be Discuss a project");
  expect(actions[1]?.html.includes("action-pill-secondary"), "Discuss a project should be secondary");
  expect(
    actions[1]?.html.includes("https://calendar.app.google/Yfg2p6FTKsYuPbtf6"),
    "Discuss a project should link to the calendar"
  );
  expect(actions[1]?.html.includes("external-link-icon"), "Secondary CTA should keep external icon");
}

const logoBlock = html.match(/<ul class="client-logos">([\s\S]*?)<\/ul>/)?.[1];
expect(Boolean(logoBlock), "Client logo block should be present");

if (logoBlock) {
  expect(!logoBlock.includes("Darkroom"), "Darkroom should not appear in the logo rail");
  expect(!logoBlock.includes("Goldiam"), "Goldiam should not appear in the logo rail");
  expect(
    logoBlock.includes('class="client-logo is-medium is-goodera"'),
    "Goodera logo should use the high-contrast class"
  );
  expect(
    !logoBlock.includes("goldiam-logo.png"),
    "Goldiam logo asset should not be used in the logo rail"
  );

  const logos = [...logoBlock.matchAll(/<li\b[\s\S]*?<\/li>/g)].map(([item]) => {
    const alt = item.match(/\balt="([^"]+)"/)?.[1];
    const aria = item.match(/\baria-label="([^"]+)"/)?.[1];
    return alt ?? aria ?? "";
  });
  const originalLogos = logos.slice(0, 9);
  const cloneLogos = logos.slice(9);

  expect(
    JSON.stringify(originalLogos) ===
      JSON.stringify([
        "Stage",
        "Third Wave Coffee",
        "Solar Square",
        "Goodera",
        "RAY",
        "CASA BLUI",
        "origem",
        "centai",
        "spanish alchemist",
      ]),
    `Logo order mismatch: ${originalLogos.join(", ")}`
  );
  expect(
    cloneLogos.length === 9,
    `Mobile logo loop should include 9 duplicate logos, found ${cloneLogos.length}`
  );
  expect(
    [...logoBlock.matchAll(/is-loop-clone/g)].length === 9,
    "Mobile logo loop should mark each duplicate logo as a clone"
  );
  expect(
    [...logoBlock.matchAll(/aria-hidden="true"/g)].length === 9,
    "Mobile logo loop clones should be hidden from assistive tech"
  );
}

expect(html.includes("client-proof"), "Client logo section should be restored");
expect(html.includes("client-logos"), "Client logo list should be restored");
expect(css.includes("client-proof"), "Client logo section CSS should be restored");
expect(css.includes("client-logos"), "Client logo list CSS should be restored");
expect(css.includes(".client-logo.is-goodera img"), "Goodera contrast CSS should be present");
expect(css.includes(".client-logo.is-loop-clone"), "Mobile logo loop clone CSS should be present");
expect(html.includes("function bindClientLogoLoop()"), "Mobile logo loop JS should be present");
expect(html.includes("clientLogos.scrollLeft -= loopWidth"), "Mobile logo loop should reset at the seam");
expect(!normalizedHtml.toLowerCase().includes("goldiam"), "Goldiam should not be referenced");
expect(
  html.includes("function bindVideoScrub()"),
  "Hero video scrub JS should be present"
);
expect(
  html.includes("const runStartupLogoCue = () =>"),
  "Hero video should run a startup logo-facing cue"
);
expect(
  html.includes("let startupCueStarted = false;"),
  "Startup video cue should only run once"
);
expect(
  html.includes("const logoLookTime = clampTarget(video.duration * 0.82);"),
  "Startup video cue should target the logo-facing part of the clip"
);
expect(
  html.includes("const cancelStartupCue = () =>"),
  "Startup video cue should be cancellable"
);
expect(
  html.includes("cancelStartupCue();"),
  "User pointer or touch movement should cancel the startup cue"
);
expect(
  html.includes("const targetVideoTimeFromClientX = (clientX) =>"),
  "Mobile touch should map the touched screen position directly to a video time"
);
expect(
  html.includes("(clientX / window.innerWidth) * video.duration"),
  "Mobile touch position should be based on screen width, not finger movement delta"
);
expect(
  html.includes("const handleTouchStart = (event) =>"),
  "Mobile touch should move the monitor head on the first touch, before touchmove"
);
expect(
  html.includes('window.addEventListener("touchstart", handleTouchStart'),
  "Non-pointer mobile browsers should bind touchstart for first-touch tracking"
);
expect(
  html.includes("const handlePointerDown = (event) =>"),
  "Pointer-capable mobile browsers should bind first-touch tracking"
);
expect(
  html.includes('window.addEventListener("pointerdown", handlePointerDown'),
  "Pointer-capable mobile browsers should move the monitor head on touch pointerdown"
);
expect(
  html.includes("video.readyState >= HTMLMediaElement.HAVE_METADATA"),
  "Startup video cue should run even when metadata loaded before listeners attach"
);
expect(
  html.includes("prefers-reduced-motion: reduce"),
  "Startup video cue should respect reduced motion"
);

const subheading = cssBlock(".hero-subheading");
const heroActionsCss = cssBlock(".hero-actions");

expect(subheading.includes("max-width: 620px"), "Subheading should cap at 620px");
expect(
  subheading.includes("font-size: clamp(20px, 2vw, 22px)"),
  "Subheading should use 20-22px responsive sizing"
);
expect(subheading.includes("line-height: 1.4"), "Subheading line-height should be 1.4");
expect(heroActionsCss.includes("margin-top: 30px"), "CTA row should sit below the subheading");
expect(css.includes(".hero-section::before"), "Mobile readability layer should be present");
expect(css.includes("height: 44vh"), "Mobile readability layer should cover the lower copy area");
expect(css.includes("gap: 8px"), "Mobile logo rail should use tighter spacing");
expect(css.includes("black 92%"), "Mobile logo rail fade should leave four logos readable");
expect(css.includes("100dvh"), "Hero should use dynamic viewport height for mobile browsers");
expect(css.includes("overflow-y: auto"), "Mobile layout should allow vertical scroll fallback");
expect(
  css.includes("calc(92px + env(safe-area-inset-bottom))"),
  "Mobile hero should reserve enough bottom space for the CTA row"
);
expect(
  css.includes("@media (max-width: 767px) and (max-height: 720px)"),
  "Short mobile viewport adjustments should be present"
);

if (failures.length) {
  console.error("Hero contract failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Hero contract passed");
