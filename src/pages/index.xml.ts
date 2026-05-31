// Back-compat alias: the old Hugo site published its feed at /index.xml.
// Serve it there too (alongside /rss.xml) so prior subscribers keep working.
import { buildFeedResponse } from "../feed";

export const GET = () => buildFeedResponse();
