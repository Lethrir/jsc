function lineToTree(line, symbolTable){
	var root;
	var lastSymbol = '';
	var lastOperator = '';
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
		if(is1LOperator(token)){ // 1 operand, to the left - eg ++ as in i++
			// get the last symbol and use it as input to this operator
		} else if(is1ROperator(token)){ // 1 operand, to the right - eg ++ as in ++i
			lastOperator = token;
		} else if(is2Operator(token)){ // 2 operands, eg + as in a + b
			// get last symbol
			lastOperator = token;
		} else if(isSymbol(token))
			// todo: check if we have an operator waiting for us
			// otherwise, this is the last symbol
			lastSymbol = token;
		} else {
			// who knows why we'd get here!
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

symbolTable.prototype.findSymbol = function(symbol){

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