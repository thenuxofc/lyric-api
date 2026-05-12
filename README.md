# 🎵 THENUX Lyric API

A fast ⚡ and free Sinhala song lyrics API built by **THENUX**.  
Search songs or fetch full lyrics instantly using simple GET requests.

---

## 🌐 Base URL

https://lyric-api.netlify.app/.netlify/functions/lyrics


---

## 🔍 Search Lyrics

Search songs by keyword.

### 📌 Endpoint

GET /lyrics?q=your_query


### ✅ Example


https://lyric-api.netlify.app/.netlify/functions/lyrics?q=Pandama


### 📦 Response

```json
{
  "creator": "THENUX",
  "query": "Pandama",
  "total": 2,
  "results": [
    {
      "title": "පන්දම | Pandama by Dhanith Sri [2018]",
      "url": "https://sinhalasonglyrics.com/pandama-by-dhanith-sri/",
      "category": "Dhanith Sri",
      "date": "June 18, 2020",
      "snippet": "..."
    }
  ]
}
```


📜 Get Full Lyrics

Fetch full lyrics using the song URL.

### 📌 Endpoint

GET /lyrics?url=song_url

### ✅ Example

https://lyric-api.netlify.app/.netlify/functions/lyrics?url=https://sinhalasonglyrics.com/pandama-by-dhanith-sri/


### 📦 Response

```json
{
  "creator": "THENUX",
  "title": "පන්දම | Pandama by Dhanith Sri [2018]",
  "category": "Dhanith Sri",
  "author": "By Sinhala Song Lyrics",
  "date": "June 18, 2020",
  "source": "https://sinhalasonglyrics.com/pandama-by-dhanith-sri/",
  "lyrics": "Full lyrics here..."
}
```

⚡ Features
🔍 Fast search results
🎶 Sinhala song support
📜 Full lyrics extraction
🌐 Simple GET API
💯 Free to use
⚡ Hosted on Netlify
🛠️ Usage Example (JavaScript)
const axios = require("axios");

async function searchLyrics(query) {
  const res = await axios.get(
    `https://lyric-api.netlify.app/.netlify/functions/lyrics?q=${query}`
  );
  console.log(res.data);
}

searchLyrics("Pandama");
👨‍💻 Creator

THENUX 🚀
Building powerful APIs & AI tools

⭐ Support

If you like this project:

⭐ Star this repo
🍴 Fork it
🔥 Share with others
