var a = [{
    "Alice" : "BRIAN is a cool txt",
    "Text" : "This is not a TEXT"
    }, 
    {
      "Alice" : "KENYAN is This txt",
    "Text" : "text is COOL"  
    }];
    
function indexed(a) {
    var obj = {0: [], 1: []};
    

    for(var i = 0; i < a.length; i++) {
        // get the alice and the text
        // alice
        var alice = a[i].Alice.split(' ');
        for(var j = 0; j < alice.length; j++) {
            obj[i].push(alice[j]);
        }
        
        var text = a[i].Text.split(' ');
        for(var k = 0; k < text.length; k++) {
            obj[i].push(text[k]);
        }
    }

    return obj;
}

var x = indexed(a);
console.log(x);
==============================================================================
var data = {
  0: ["brian", "is", "kim", "koech"],
  1: ["nanda", "anthony", "andela", "kenya"]
};

function search(terms) {
    
    var results = [];
    // check if arguments.length is greater than 1
    if(arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments);
        terms = args;
    }
    // check if its a string
    if(typeof(terms) == 'string') {
        // create an array of the string
        terms = terms.split(' ');
    }
    
        // loop through each element checking its existence in index
    terms.forEach(function(term) 
    {
        var found = false;
        //check its existence ?? 0 | 1
        for(var key in data) 
        {
            // data key = 0
            // loop through key
            if( data[key].indexOf(term) > -1) 
            {
                console.log("FOUND: " + term);
                results.push(parseInt(key));
                found = true;
            } 
            
        }
        if(!found) {
            console.log("NOT FOUND: " + term);
            results.push(-1);
        }
       
        
        
    });
    
    console.log(results);
  
    
}