
            // 
            // This file shows the minimum you need to provide to BookReader to display a book
            //
            // Copyright(c)2008-2009 Internet Archive. Software license AGPL version 3.
            // Modified by Doug Emery and Dot Porter
            
            // DE: START FILE GRAB;  Sun Jun 24 13:19:54 EDT 2012
            // doug emery: This first bit of code; gets the file we want. 
            var file;
            // grap the local TEI file and upon success, populate the `file`; variable
            // The TEI url is the only piece of this file that is specific to the manuscript. Everything else is generic
            $.ajax({
            type: 'GET',
            url: "../ljs101_TEI.xml",
            async: false,
            dataType: 'xml',
            success: function(data){
            populateFile(data);
            }
            });
            function populateFile(data) {
            file = data;
            }
            
            
            // build the URL to the manuscript data page on the OPenn website
            
            
            var url = 'http://openn.library.upenn.edu/Data/0001/ljs101/data/' 
            // build the URL to the manuscript navigation page on the OPenn website
            var navurl = 'http://openn.library.upenn.edu/Data/0001/html/ljs101.html' 
                
            
            // get the number of leaves
            // don't display Fore-edge, Tail, Spine, or Head images
            var surfaces = $(file).find("surface:[n!='Fore-edge'][n!='Tail'][n!='Spine'][n!='Head'][n!='Front cover'][n!='Inside front cover'][n!='Inside back cover'][n!='Back cover']").
            not("[n*='flap closed']");;
            var leafCount = $(surfaces).size();
            
            //var leafCount = $(file).find('surface').size();
            var msTitle = " University of Pennsylvania LJS 101: Periermenias Aristotelis ... etc.";
            // DE: END FILE GRAB;  Sun Jun 24 13:19:54 EDT 2012
            
            // Create the BookReader object
            br = new BookReader();
            
            // make an array of languages. These are the languages that read r-l. The abbreviations are ISO 639.2 langs: http://www.loc.gov/standards/iso639-2/php/code_list.php
            var rtlLangs = [ 'ara', 'Arabic', 'heb', 'Hebrew', 'jpr', 'Judeo-Persian', 'jrb', 'Judeo-Arabic', 'per', 'Persian', 'tuk', 'Turkmen', 'syc', 'Classical Syriac', 'syr', 'Syriac', 'sam', 'Samaritan Aramaic', 'arc', 'Official Aramaic', 'ota' , 'Turkish, Ottoman (1500-1928)']
            // get the lang from the TEI
            var lang = $(file).find('textLang');
            // set pageProgression if lang is in rtlLangs
            if (jQuery.inArray(lang, rtlLangs) > -1) {
            br.pageProgression = 'rl';
            }
            
            // Load the images from the OPenn site, using file names in the msDesc file
            br.getPageURI = function(index, reduce, rotate) {
            // reduce and rotate are ignored in this simple implementation, but we
            // could e.g. look at reduce and load images from a different directory
            // or pass the information to an image server
            // DE: 
            // from the 
            var path = $(file).find('surface').eq(index).find('graphic[url*="web"]').attr('url');
            var graphicurl = url + path;
            return graphicurl;
            }
            
            // Return which side, left or right, that a given page should be displayed on
            
            br.getPageSide = function(index) {
            if ('rl' == this.pageProgression) {
            if (0 == (index & 0x1)) {
            return 'L';
            } else {
            return 'R';
            }
            } else {
            if (0 == (index & 0x1)) {
            return 'R';
            } else {
            return 'L';
            }
            }
            }
            
            
            // Return the width of a given page, pulling that from the msDesc file. If not found, default is 1200px
            br.getPageWidth = function(index) {
            var widthpx =
            $(file).find('surface').eq(index).find('graphic[url*="web"]').attr('width');
            if (widthpx) {
            var width = widthpx.replace("px","");
            return width;
            } else {
            return 1200;
            }
            
            }
            
            // Return the height of a given page, pulling that from the msDesc file. If not found, default is 1800px
            br.getPageHeight = function(index) {
            var heightpx =
            $(file).find('surface').eq(index).find('graphic[url*="web"]').attr('height');
            if (heightpx) {
            var height = heightpx.replace("px","");
            return height;
            } else {
            return 1800;
            }
            
            }
            
            
            // This function returns the left and right indices for the user-visible
            // spread that contains the given index.  The return values may be
            // null if there is no facing page or the index is invalid.
            br.getSpreadIndices = function(pindex) {   
            var spreadIndices = [null, null]; 
            if ('rl' == this.pageProgression) {
            // Right to Left
            if (this.getPageSide(pindex) == 'R') {
            spreadIndices[1] = pindex;
            spreadIndices[0] = pindex + 1;
            } else {
            // Given index was LHS
            spreadIndices[0] = pindex;
            spreadIndices[1] = pindex - 1;
            }
            } else {
            // Left to right
            if (this.getPageSide(pindex) == 'L') {
            spreadIndices[0] = pindex;
            spreadIndices[1] = pindex + 1;
            } else {
            // Given index was RHS
            spreadIndices[1] = pindex;
            spreadIndices[0] = pindex - 1;
            }
            }
            
            return spreadIndices;
            }
            
            // For a given "accessible page index" return the page number in the book.
            //
            // For example, index 5 might correspond to "Page 1" if there is front matter such
            // as a title page and table of contents.
            br.getPageNum = function(index) {
            return index+1;
            }
            
            // Total number of leafs
            // br.numLeafs = 15;
            // DE: Sun Jun 24 13:43:29 EDT 2012
            // assign leaf number dynamically
            br.numLeafs = leafCount;
            
            // Book title and the URL used for the book title link
            br.bookTitle = msTitle;
            br.bookUrl  = navurl;
            
            // Override the path used to find UI images
            br.imagesBaseURL = '../BookReader/images/';
            
            br.getEmbedCode = function(frameWidth, frameHeight, viewParams) {
            return "Embed code not supported in bookreader demo.";
            }
            
            // Let's go!
            br.init();
            
            // read-aloud and search need backend compenents and are not supported in the demo
            $('#BRtoolbar').find('.read').hide();
            $('#textSrch').hide();
            $('#btnSrch').hide();
            

        