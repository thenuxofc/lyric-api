import * as cheerio from "cheerio";

const BASE = "https://sinhalasonglyrics.com";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json; charset=utf-8"
};

function json(data, statusCode = 200) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(data, null, 2)
  };
}

function clean(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 THENUX Lyrics API Bot",
      "Accept": "text/html"
    }
  });

  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.text();
}

async function searchSong(query) {
  const url = `${BASE}/?s=${encodeURIComponent(query)}`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const results = [];

  $(".bs-posts-sec-post").each((_, el) => {
    const titleEl = $(el).find("h4.entry-title a").first();
    const category = clean($(el).find(".bs-blog-category a").first().text());
    const snippet = clean($(el).find(".bs-content p").first().text());
    const date = clean($(el).find("time").first().text());

    results.push({
      title: clean(titleEl.text()),
      url: titleEl.attr("href"),
      category,
      date,
      snippet
    });
  });

  return {
    creator: "THENUX",
    query,
    total: results.length,
    results
  };
}

async function getLyrics(songUrl) {
  if (!songUrl.startsWith(BASE)) {
    throw new Error("Only sinhalasonglyrics.com URLs are allowed");
  }

  const html = await fetchHtml(songUrl);
  const $ = cheerio.load(html);

  const title = clean($("h1.title").first().text());
  const category = clean($(".bs-blog-category a").first().text());
  const author = clean($(".bs-author").first().text());
  const date = clean($("time").first().text());

  const lyricParts = [];

  $("article.small.single > p").each((_, p) => {
    const text = $(p)
      .html()
      ?.replace(/<br\s*\/?>/gi, "\n") || "";

    const lyricText = cheerio.load(`<div>${text}</div>`)("div").text().trim();

    if (
      lyricText &&
      !lyricText.toLowerCase().includes("download") &&
      !lyricText.toLowerCase().includes("telegram")
    ) {
      lyricParts.push(lyricText);
    }
  });

  return {
    creator: "THENUX",
    title,
    category,
    author,
    date,
    source: songUrl,
    lyrics: lyricParts.join("\n\n")
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  try {
    const q = event.queryStringParameters?.q;
    const url = event.queryStringParameters?.url;

    if (!q && !url) {
      return json({
        creator: "THENUX",
        message: "Lyrics API is running",
        usage: {
          search: "/.netlify/functions/lyrics?q=Pandama",
          lyrics: "/.netlify/functions/lyrics?url=https://sinhalasonglyrics.com/pandama-by-dhanith-sri/"
        }
      });
    }

    if (url) {
      const data = await getLyrics(url);
      return json(data);
    }

    const data = await searchSong(q);
    return json(data);
  } catch (err) {
    return json({
      creator: "THENUX",
      success: false,
      error: err.message
    }, 500);
  }
}
