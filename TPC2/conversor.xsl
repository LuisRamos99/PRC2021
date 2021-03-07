<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xs:doc scope="stylesheet">    
        <xs:desc>     
            <xs:p><xs:b>Created on:</xs:b> Mar 7, 2021</xs:p> 
            <xs:p><xs:b>Author:</xs:b> Luis Ramos</xs:p>
            <xs:p>Conversão do arquivo de musica digital de XML para TTL</xs:p>
        </xs:desc>   
    </xs:doc>
   
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>

    <xsl:template match="obra">    
        
        ### http://www.di.uminho.pt/prc2021/arquivo-musical#obra_<xsl:value-of select="@id"/>
        :obra_<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        <xsl:if test="inf-relacionada">
            <xsl:if test="inf-relacionada/video">:contemVideo "<xsl:value-of select="inf-relacionada/video/@href"/>" ;
            </xsl:if>
        </xsl:if> 
        :titulo "<xsl:value-of select="titulo"/>" ;
        <xsl:if test="subtitulo">:subtitulo "<xsl:value-of select="subtitulo"/>" ; </xsl:if>     
        <xsl:if test="arranjo">:arranjo "<xsl:value-of select="arranjo"/>" ; </xsl:if>
        <xsl:if test="editado">:editado "<xsl:value-of select="editado"/>" ; </xsl:if>
        :tipo "<xsl:value-of select="tipo"/>" .
        # -------------------------------------------       
    
        <xsl:if test="compositor">
            ### http://www.di.uminho.pt/prc2021/arquivo-musical#compositor_<xsl:value-of select="replace(replace(replace(normalize-unicode(compositor, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/>
            :compositor_<xsl:value-of select="replace(replace(replace(normalize-unicode(compositor, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/> rdf:type owl:NamedIndividual ,
            :Compositor ;
            :compos :obra_<xsl:value-of select="@id"/> ;
            :nome "<xsl:value-of select="replace(replace(replace(normalize-unicode(compositor, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/>" .
            # --------------------------------------------------
        </xsl:if>
    
        <xsl:for-each select="instrumentos/instrumento">
            ### http://www.di.uminho.pt/prc2021/arquivo-musical#instrumento_<xsl:value-of select="replace(replace(replace(normalize-unicode(designacao, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/>
            :instrumento_<xsl:value-of select="replace(replace(replace(normalize-unicode(designacao, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/> rdf:type owl:NamedIndividual,
            :Instrumento ;
            :utilizadoEm :obra_<xsl:value-of select="../../@id"/> ;
            :designacao "<xsl:value-of select="replace(replace(replace(normalize-unicode(designacao, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/>" .
            # --------------------------------------------------
            
            <xsl:for-each select="partitura">
                ### http://www.di.uminho.pt/prc2021/arquivo-musical#partitura_<xsl:value-of select="@path"/>
                :partitura_<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
                :Partitura ;
                :pertenceA :instrumento_<xsl:value-of select="replace(replace(replace(normalize-unicode(designacao, 'NFKD'), '\P{IsBasicLatin}', ''),' ','_'),',','')"/> ;
                :path "<xsl:value-of select="@path"/>" ;
                <xsl:if test="@afinacao">:afinacao "<xsl:value-of select="@afinacao"/>" ; </xsl:if>          
                <xsl:if test="@clave">:clave "<xsl:value-of select="@clave"/>" ; </xsl:if>
                <xsl:if test="@voz">:voz "<xsl:value-of select="@voz"/>" ; </xsl:if> 
                :type "<xsl:value-of select="@type"/>" .
                # --------------------------------------------------
            </xsl:for-each>
            
        </xsl:for-each>

    </xsl:template>
      
</xsl:stylesheet>