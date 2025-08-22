var doc = app.activeDocument;
var symbolCount = doc.symbols.length;

if (symbolCount >= 1) {

	if (confirm("Are all your layers hidden?")) {

		// choose directory (fallback to Desktop if doc isn't saved)
		var defaultFolder = (doc.path && Folder(doc.path)) || Folder.desktop;
		var dest = defaultFolder.selectDlg();
	   
		if (dest) {
			// run generation
			generateScale(1);
			generateScale(2);
			generateScale(3);
		}
		
		function generateScale (scaleFactor) {
			// create subfolder path
			var subdest = new Folder(dest + "/@" + scaleFactor + "x");
				
			// create subfolder
			if (!subdest.exists) {
				subdest.create();
			}
				  
			// create temp layer and keep a reference
			var tempLayer = doc.layers.add();
			tempLayer.name = "__temp_export__";

			// loop through symbols
			for (var i = 0; i < doc.symbols.length; i++) {
				var symbolDef = doc.symbols[i];

				// skip symbols starting with underscore
				if (symbolDef.name && symbolDef.name.charAt(0) === "_") {
					continue;
				}
				
				// place a symbol instance on the temp layer
				var symbol = doc.symbolItems.add(symbolDef);
				try {
					// ensure on temp layer
					symbol.move(tempLayer, ElementPlacement.PLACEATBEGINNING);
					
					// scale
					symbol.resize(scaleFactor * 100, scaleFactor * 100);
					
					// build safe filename
					var baseName = String(symbolDef.name || ("symbol_" + i));
					var filename = sanitizeFilename(baseName) + ".png";
					
					// export symbol
					savePNG(subdest, filename);
				} finally {
					// delete temp symbol instance regardless of export outcome
					symbol.remove();
				}
			}
			
			// remove temp layer
			tempLayer.remove();
		}
	}

	function savePNG(dest, filename) {
		// save options
		var type = ExportType.PNG24;
		var options = new ExportOptionsPNG24();
		options.transparency = true;
		options.antiAliasing = true;
		options.artBoardClipping = false;
		options.horizontalScale = 100;
		options.verticalScale = 100;

		// file
		var file = new File(dest + "/" + filename);

		// export
		doc.exportFile(file, type, options);
	}

} else {
	alert("You don't have any symbols in this document");
}

function sanitizeFilename(name) {
	// replace illegal filename characters and trim
	var cleaned = name.replace(/[\\\/:*?"<>|]/g, "_").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
	// avoid empty names
	if (!cleaned) {
		cleaned = "export";
	}
	return cleaned;
}
