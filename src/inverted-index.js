"use strict";
var Index;
(function() {

  Index = function() {
    // Main indexed object
    this.obj = {
      0: [],
      1: []
    };
    
    this.createIndex = function(filepath) {
      // reads json file and returns the content
      return $.getJSON(filepath); // jshint ignore:line
    };

  };

  Index.prototype = {

    populateIndex: function(data) {
      var self = this;

      // to be called when looping through the json file
      function logArrayElements(element, index) {
        // regex pattern to remove the unwanted chars i.e. .;:,
        var pattern = /[.',:]/gi;
        var title = element.title.replace(pattern, '').toLowerCase().split(' ');
        var text = element.text.replace(pattern, '').toLowerCase().split(' ');

        title.forEach(function(val) {
          self.obj[index].push(val);
        });

        text.forEach(function(val) {
          self.obj[index].push(val);
        });

      }

      // loop through the json file
      data.forEach(logArrayElements);

      return this.obj;
    },

    getIndex: function(data) {
      return this.populateIndex(data);
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
      } else if (typeof(terms) === 'string') {
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
        } else {
          // search for the values in the indexed obj
          for (var key in data) {

            // loop through key
            if (data[key].indexOf(term.replace(/[.',:]/gi, '').toLowerCase()) > -1) {
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
  };
})();
