<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="rss/channel/title"/><xsl:text> &#8212; RSS feed</xsl:text></title>
        <link rel="stylesheet" href="/css/fonts.css"/>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; color: #404040; background: #fff; line-height: 1.6;
            font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
          a { color: #008AFF; }
          .note { background: #f5f5f5; border-bottom: 1px solid #eaeaea; padding: 18px 0; }
          .inner { max-width: 720px; margin: 0 auto; padding: 0 20px; }
          .note p { margin: 0; font-size: 15px; color: #555; }
          .note strong { color: #404040; }
          h1 { font-family: 'Lora', 'Times New Roman', serif; font-size: 34px; margin: 32px 0 6px; }
          .desc { color: #808080; margin: 0 0 28px; }
          .item { padding: 18px 0; border-top: 1px solid #eaeaea; }
          .item-title { font-family: 'Lora', 'Times New Roman', serif; font-size: 21px;
            font-weight: 700; text-decoration: none; }
          .item-title:hover { text-decoration: underline; }
          .item-date { color: #808080; font-size: 14px; margin: 4px 0 8px; }
          .item-desc { margin: 0; }
        </style>
      </head>
      <body>
        <div class="note"><div class="inner">
          <p><strong>This is an RSS feed.</strong> Copy this page's URL from your browser's address
          bar into a feed reader (Feedly, NetNewsWire, Inoreader, &#8230;) to subscribe and get new
          posts automatically.</p>
        </div></div>
        <div class="inner">
          <h1><xsl:value-of select="rss/channel/title"/></h1>
          <p class="desc"><xsl:value-of select="rss/channel/description"/></p>
          <xsl:for-each select="rss/channel/item">
            <div class="item">
              <a class="item-title" href="{link}"><xsl:value-of select="title"/></a>
              <div class="item-date"><xsl:value-of select="pubDate"/></div>
              <p class="item-desc"><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
