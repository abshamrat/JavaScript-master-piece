/*
	this is simple pure js framework for search results match showing
	created by Shamrat Akbar
	it's free for any kinds of use and modification
	Date: 26/08/17
*/


(function(){

	this.SimpleMatch = function(){

		this.words		 = null;
		this.pattern 	 = null;
		this.regFind	 = null;
		this.regType 	 = 'gi';
		this.content	 = null;
		this.matchElement= null;

		var defaults  = {
			className: 'txt-highlight',
			fontWeight: 'bold',
			container:'span'
		};
		// Create options by extending defaults with the passed in arugments
	    if (arguments[0] && typeof arguments[0] === "object") {
		    this.options = extendDefaults(defaults, arguments[0]);

	    }
	    initialize.call(this);
	}
	SimpleMatch.prototype.findMatch =  function (content) {
		var elements 	= this.matchElement;
		var container 	= this.options.container;
		var className 	= this.options.className;
		var regFind 	= this.regFind;

		// return this.regFind; 
		content = content.replace(regFind, function replacer(match,index){
			// elements.innerHTML = match;
			return '<'+container+' class="'+className+'">'+match+'</'+container+'>';
		});
		console.log(content);

		return content;

	}
	function initialize() {
		if (typeof this.options.container === 'string' ) {
			this.matchElement 			= document.createElement(this.options.container);
			this.matchElement.className = this.options.className;
			this.matchElement.style.fontWeight = this.options.fontWeight;
			this.matchElement.innerHTML = 'match';
		}
		if (typeof this.options.searchText === 'string') {
			this.words = this.options.searchText.split(" ").join("|");
			this.regFind = new RegExp(this.words, this.options.regType);
		}

	}

	function extendDefaults(source, properties) {
	    var property;
	    for (property in properties) {
	      if (properties.hasOwnProperty(property)) {
	        source[property] = properties[property];
	      }
	    }
	    return source;
  	}
}());