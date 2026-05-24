export default async function handler(req, res) {
  try {
    // This updated URL forces ESPN to look for the CJ Cup event instead of breaking
    const r = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard?event=401580155',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!r.ok) throw new Error('ESPN HTTP ' + r.status);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
