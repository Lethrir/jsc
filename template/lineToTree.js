function lineToTree(line, symbolTable){
	var root;
	for(var i = 0; i<line.length; i++){
		var token = line[i];
		if(token.name === "var"){
			// We expect the next token to be a new variable
			i++;
			if(i===line.length){
				throw "var without identifier";
			}
			token = line[i];
			symbolTable.addSymbol(token);
		}

	}
}


function symbolTable(){
	this.symbols = [];
}

symbolTable.prototype.addSymbol = function(symbol) {
	this.symbols.push(symbol);
	return this.symbols.length;
};

sym.prototype.findSymbol = function(symbol){

};

var tbl = new symbolTable();
tbl.addSymbol('a');

lineToTree([
	{text: "var", type: "syntax"}, 
	{text: "x", type: "misc"}, 
	{text: "=", type: "syntax"}, 
	{text: "a", type: "misc"}, 
	{text: "+", type: "operator"}, 
	{text: "3", type: "misc"}
], tbl);