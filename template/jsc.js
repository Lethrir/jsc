var p = 'var a = 1 + 2;\r\n"test string";\r\nfunction test(t) {\r\n	return t;\r\n}\r\ntest(a);\r\na+=2;';

function tokensToAsm(tokens){
	for(var i = 0; i < tokens.length; i++){

	}
}

function jsc(code){
	function showTokens(ts) {
		for(var i = 0; i < ts.length; i++){
			console.log(ts[i]);
		}
	}

	function isWhiteSpace(c) {
		return c == ' ' || c == '\n' || c == '\r' || c == '	';
	}

	function isStringTerminator(c) {
		return c == "'" || c == '"';
	}

	function isSyntax(c) {
		return c == ';' || c == '{' || c == '(' || c == '}' || c == ')' || c =='.' || c =='[' || c == ']';
	}

	function isOperator(c) {
		// might need to do something special here for +=, -=, ==, ===, similar to strings
		return c == '+' || c == '-' || c == '=';
	}

	// flags
	var inString = false; // we need to know if we're in a string as we can ignore whitespace outside but it's significant inside
	var inOperator = false;
	var currentToken = '';
	var tokens = [];

	function addToken(){
		if((currentToken.length > 0) && !isWhiteSpace(currentToken)){
			tokens.push(currentToken);
			currentToken = '';
		}
	}

	for(var i = 0; i<code.length; i++){
		var c = code[i];
		if(inString){
			if(isStringTerminator(c)){
				currentToken = '"' + currentToken + '"';
				addToken();
				inString = false;
			} else {
				currentToken += c;
			}
		} else if(inOperator) {
			if(isOperator(c)){
				console.log('operator ' + c);
				currentToken += c;
			} else {
				console.log('leaving operator');
				addToken();
				inOperator = false;
				currentToken = c;
			}
		} else if(isOperator(c)) {
			console.log('operator ' + c);
			addToken();
			currentToken += c;
			inOperator = true;
		} else if(isWhiteSpace(c)){
			addToken();
		} else if(isSyntax(c)) {
			addToken();
			tokens.push(c);
		} else if(isStringTerminator(c)){
			inString = true;
		} else {
			currentToken += c;
		}
	}

	if(currentToken != ''){
		tokens.push(currentToken);
	}
	
	console.log('show ' + tokens.length + ' tokens');
	showTokens(tokens);
}

console.log(p);

jsc(p);