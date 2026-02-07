<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:content="http://purl.org/rss/1.0/modules/content/" exclude-result-prefixes="content">

  <xsl:output method="xml" encoding="UTF-8" indent="yes"/>


  <xsl:template match="/grindel_frost_geschichte">
    <rss version="2.0">
      <channel>
        <title>Grindel Frost – Unternehmensgeschichte</title>
        <link></link>
        <description>
          Die Geschichte von Grindel Frost Steigeisen 
        </description>
        <language>de</language>

        <xsl:apply-templates select="epoche"/>
      </channel>
    </rss>
  </xsl:template>


  <xsl:template match="epoche">
    <item>
      <title>
        <xsl:value-of select="normalize-space(titel)"/>
        <xsl:text> (</xsl:text>
        <xsl:value-of select="von_bis"/>
        <xsl:text>)</xsl:text>
      </title>

      <guid isPermaLink="false">
        grindel-frost-epoche-<xsl:value-of select="@id"/>
      </guid>

      <description>
        <xsl:value-of select="normalize-space(zusammenfassung)"/>
      </description>

      <content:encoded>

        <h2>
          <xsl:value-of select="titel"/>
        </h2>

        <p>Zeitraum: <xsl:value-of select="von_bis"/>
        </p>


      </content:encoded>
    </item>
  </xsl:template>

</xsl:stylesheet>
