<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    xmlns:tei="http://www.tei-c.org/ns/1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <!-- extract the siglum from the XML file name -->
    <!-- Needs to account for both TEI (OPenn collection) and tei (Walters collection) -->
    <xsl:variable name="XMLfilename" select="tokenize(base-uri(),'/')[last()]"/>
    <xsl:variable name="testXMLfilename">
        <xsl:choose>
            <xsl:when test="contains($XMLfilename,'TEI')"><xsl:value-of select="replace($XMLfilename,'_TEI.xml','')"/></xsl:when>
            <xsl:when test="contains($XMLfilename,'tei')"><xsl:value-of select="replace($XMLfilename,'_tei.xml','')"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$XMLfilename"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="siglum" select="$testXMLfilename"/>
    
    <!-- extract the title-->
    <!-- the 15 pulls "Description of " out of the title for things on OPenn - otherwise just take the title -->
    <xsl:variable name="title">
        <xsl:choose>
            <xsl:when test="contains($XMLfilename,'TEI')"><xsl:value-of select="substring(//tei:titleStmt/tei:title[1],15)"></xsl:value-of></xsl:when>
            <xsl:otherwise><xsl:value-of select="//tei:titleStmt/tei:title[1]"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    
    <!-- this is the default output directory -->
    <xsl:param name="outputDir"><xsl:value-of select="$siglum"/></xsl:param>
    
    <xsl:template name="html" match="/">
        <xsl:result-document href="{$outputDir}/index.html">
            <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
                    <title><xsl:value-of select="$title"/></title>
                    <link rel="stylesheet" type="text/css" href="../BookReader/BookReader.css"/>
                        <link rel="stylesheet" type="text/css" href="../BookReader/BookReader.css"/><script type="text/javascript" src="../BookReader/jquery-1.4.2.min.js"></script><script type="text/javascript" src="../BookReader/jquery-ui-1.8.5.custom.min.js"></script><script type="text/javascript" src="../BookReader/dragscrollable.js"></script><script type="text/javascript" src="../BookReader/jquery.colorbox-min.js"></script><script type="text/javascript" src="../BookReader/jquery.ui.ipad.js"></script><script type="text/javascript" src="../BookReader/jquery.bt.min.js"></script><script type="text/javascript" src="../BookReader/BookReader.js"></script></head>
                <body style="background-color: ##939598;">
                    <div id="BookReader"><xsl:value-of select="$title"/><br/><noscript>
                        <p>
                            The BookReader requires JavaScript to be enabled. Please check that your browser supports
                            JavaScript and that it is enabled in the browser settings.  You can also try one of
                            the <a href="http://www.archive.org/details/goodytwoshoes00newyiala"> other formats of the book</a>.
                            
                        </p>
                    </noscript>
                    </div><script type="text/javascript" src="{$siglum}BookReader.js"></script></body>
            </html>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>