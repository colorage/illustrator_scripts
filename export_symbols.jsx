var doc = app.activeDocument;
var symbolCount = doc.symbols.length;

if (symbolCount >= 1) {

    if (confirm("Are all your layers hidden?")) {

        // choose directory
        var dest = Folder(doc.path).selectDlg();
   
        if (dest) {
            //run genration
            generateScale (1);
            generateScale (2);
            generateScale (3);
        }
    
        function generateScale (scaleFactor) {
            //create subfolder path
            var subdest = new Folder (dest + "/@" + scaleFactor + "x");
                
            //create subfolder
            if ( ! subdest.exists ) {
                subdest.create()
            }
                  
            // create temp layer
            doc.layers.add();

            // loop through symbols
            for (var i = 0; i < doc.symbols.length; i++) {
                
                // filter non _name symbols
                if(doc.symbols[i].name[0] != "_");{
                    
                // place a symbol instance - temp
                var symbol = doc.symbolItems.add(doc.symbols[i]);

                //scale 1x
                symbol.resize(scaleFactor * 100, scaleFactor * 100);

                // assign name
                var filename = (doc.symbols[i].name)

                // export symbols
                savePNG(subdest, filename);

                // delete temp symbol instance
                symbol.remove();
                }
            }
        
            // remove temp layer
            doc.layers[0].remove();
        }
    
     }

    function savePNG(dest, filename) {
        // save options
        var type = ExportType.PNG24;
        var options = new ExportOptionsPNG24();
        options.transparency = true;

        // file
        var file = new File(dest + "/" + filename);

        // export
        doc.exportFile(file, type, options);
    }

} else {
    alert("You don't have any symbols in this document");
}
