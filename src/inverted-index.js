var Index = function() {
  // Main indexed object
  this.obj = { };

  this.createIndex = function(filepath) {
    // reads json file and returns the content
    return $.getJSON(filepath);
  };
};

Index.prototype = {

  populateIndex: function(data) {
    // holds the indexed data temporarily 
    var obj1 = {
      0: [],
      1: []
    };

    // to be called when looping through the json file
    function logArrayElements(element, index) {
      // regex pattern to remove the unwanted chars i.e. .;:,
      var patt = /[.',:]/gi;
      var ttl = element.title.replace(patt, '').toLowerCase().split(' ');
      var txt = element.text.replace(patt, '').toLowerCase().split(' ');

      ttl.forEach(function(val) {
        obj1[index].push(val);
      });

      txt.forEach(function(val) {
        obj1[index].push(val);
      });

    }

    // loop through the json file
    data.forEach(logArrayElements);

    // initialize the main indexed object with obj1
    this.obj = obj1;
  },

  getIndex: function(data) {
    this.populateIndex(data);
    return this.obj;
  },

  searchIndex: function(terms) {
    // pass indexed object to local var data
    var data = this.obj;

    var results = []; 

    var ignoreList = ['is', 'the', 'of', 'in', 'a', 'an', 'to', 'into', 'and'];
    // check if arguments.length is greater than 1
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments);
      terms = args;
    }
    // check if args passed is a string
    if (typeof(terms) == 'string') {
      // create an array of the string
      terms = terms.split(' ');
    }

    // loop through each element received checking its existence in index
    terms.forEach(function(term) {
      var found = false;
      var ignored = false;

      // check of term is to be ignored
      if (ignoreList.indexOf(term) > -1) {
        ignored = true;
      }

      if (!ignored) {
        // search for the values in the indexed obj
        for (var key in data) {

          // loop through key
          if (data[key].indexOf(term.replace(/[.',:]/gi, "").toLowerCase()) > -1) {
            results.push(parseInt(key));
            found = true;
          }

        }
        if (!found) {
          results.push(-1);
        }
      }
    });
  
    return results;
  }
}
