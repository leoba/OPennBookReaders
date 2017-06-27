# OPennBookReaders
Code for generating Internet Archive BookReaders for manuscripts on OPenn

1. Download TEI/XML files from OPenn (http://openn.libraries.upenn.edu/)
2. Process both `TEImsdesc2html.xsl` and `TEImsdesc2js.xsl` against the TEI/XML file
3. This will create a folder containing a file called `index.html` and a `.js` file named after the TEI/XML file
4. Double click on `index.html` to view the BookReader

**Note:** For the BookReader to work, the `BookReader` folder and the TEI/XML file must be in the same parent folder as the folder containing the html and js files, and they all must be placed on a webserver (they will not work on your desktop).
