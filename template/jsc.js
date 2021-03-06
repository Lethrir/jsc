var p = 'var a = 1 + 2;\r\n"test string";\r\nfunction test(t) {\r\n	return t;\r\n}\r\ntest(a);\r\na+=2;\r\nvar x = a===3;';
//var p = 'var x = a===3;';
function tokensToAsm(tokens){
	for(var i = 0; i < tokens.length; i++){

	}
}

function jsc(code){
	// flags
	var inString = false; // we need to know if we're in a string as we can ignore whitespace outside but it's significant inside
	var lastStringTerminator = '';
	var inOperator = false;
	var currentToken = '';
	var tokens = [];
	var currentType = '';

	function showTokens(ts) {
		for(var i = 0; i < ts.length; i++){
			console.log("Text " + ts[i].text + " & type " + ts[i].type);
		}
	}

	function isWhiteSpace(c) {
		return c == ' ' || 
			c == '\n' ||
			c == '\r' || 
			c == '	';
	}

	function isStringTerminator(c) {
		if(inString){
			return c == lastStringTerminator;
		} else {
			return c == "'" || c == '"';
		}
	}

	function isSyntax(c) {
		return c == ';' || c == '{' || c == '(' || c == '}' || c == ')' || c =='.' || c =='[' || c == ']';
	}

	function isOperator(c) {
		// might need to do something special here for +=, -=, ==, ===, similar to strings
		var ct;
		if(inOperator){
			ct = currentToken + c;
		} else {
			ct = c;
		}

		// This breaks operators after variables with no space - need to check if already in operator.
		var res =  
			'+'.indexOf(ct) == 0 || 
			'-'.indexOf(ct) == 0 || 
			'='.indexOf(ct) == 0 ||
			'+='.indexOf(ct) == 0 ||
			'==='.indexOf(ct) == 0 ||
			'>'.indexOf(ct) == 0 ||
			'>='.indexOf(ct) == 0 ||
			'<'.indexOf(ct) == 0 ||
			'<='.indexOf(ct) == 0;

		return res;
	}

	function addToken(){
		if((currentToken.length > 0) && !isWhiteSpace(currentToken)){
			tokens.push({
				text: currentToken,
				type: currentType
			});
		}
		currentToken = '';
	}

	for(var i = 0; i<code.length; i++){
		var c = code[i];
		if(inString){
			if(isStringTerminator(c)){
				addToken();
				inString = false;
			} else {
				currentToken += c;
			}
		} else if(isWhiteSpace(c)){
			addToken();
		} else if(isSyntax(c)) {
			addToken();
			tokens.push({
				text: c,
				type: 'syntax'
			});
		} else if(inOperator) {
			if(isOperator(c)){
				currentToken += c;
			} else {
				addToken();
				inOperator = false;
				currentToken = c;
				currentType = 'misc';
			}
		} else if(isOperator(c)) {
			addToken();
			currentToken += c;
			inOperator = true;
			currentType = 'operator';
		} else if(isStringTerminator(c)){
			inString = true;
			currentType = 'string';
			lastStringTerminator = c;
		} else {
			currentToken += c;
			currentType = 'misc';
		}
	}

	if(currentToken != ''){
		tokens.push({
			text: currentToken,
			type: currentType
		});
	}
	
	console.log('show ' + tokens.length + ' tokens');
	showTokens(tokens);
}

console.log(p);

jsc(p);