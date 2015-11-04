describe("Test suit for inverted index checkpoint", function() {

  var index = new Index();

  beforeEach(function(done) {
    index.createIndex('./books.json').done(function(data) {
      index.results = data;
      done();
    });

    // spy on a function
    spyOn(index, "populateIndex").and.callThrough();

  });

  describe("Read book data", function() {
    it("passes if Array has data", function() {
      expect(index.results.length).not.toBe(0);
    });

    it("passes if Array length is 2", function() {
      expect(index.results.length).toEqual(2);
    });

    it('passes if the results is not null', function() {
      expect(index.results).not.toBe(null);
    });

    it('passes if typeof result is object', function() {
      expect(typeof(index.results)).toBe('object');
    });

    it("passes if results is an Array", function() {
      expect(Array.isArray(index.results)).toBe(true);
    });

    it("passes if result[0] is defined", function() {
      expect(index.results[0]).toBeDefined();
    });

    it("passes if result[0] is an object", function() {
      expect(typeof(index.results[0])).toBe('object');
    });
  });

  describe("Populate index", function() {

    describe("checks whether the index is created", function() {

      it("return true if data is object", function() {
        // function is yet to be called
        expect(index.populateIndex).not.toHaveBeenCalled();
        expect(typeof index.getIndex(index.results)).toBe('object');
        expect(index.getIndex(index.results)[0]).toBeDefined();
        // function has been called
        expect(index.populateIndex).toHaveBeenCalled();
      });

      it("passes if index isn't an array and length 2", function() {
        // function is yet to be called
        expect(index.populateIndex).not.toHaveBeenCalled();
        expect(Array.isArray(index.getIndex(index.results))).toBe(false);
        expect(Object.keys(index.getIndex(index.results))).toEqual(['0', '1']);
        // function has been called
        expect(index.populateIndex).toHaveBeenCalled();
      });

      it("ensure that the index is correct", function() {
        // function is yet to be called
        expect(index.populateIndex).not.toHaveBeenCalled();
        expect(index.getIndex(index.results)[0][0]).toEqual('alice');
        expect(index.getIndex(index.results)[1][0]).toEqual('the');
        // function has been called
        expect(index.populateIndex).toHaveBeenCalled();
      });
    });
  });

  describe("Search terms in index", function() {

    describe("index returns the correct results", function() {
      it("returns an array", function() {
        expect(Array.isArray(index.searchIndex("Alice"))).toBe(true);
      });

      it("returns 0 | 1 if term is found, otherwise -1", function() {
        expect(index.searchIndex("Andela")).toEqual([-1]);
        expect(index.searchIndex("imagination")).toEqual([0]);
        expect(index.searchIndex("wizard")).toEqual([1]);
      });

      it("check the accuracy of the search function", function() {
        expect(index.searchIndex("Alice")).toEqual([0]);
        expect(index.searchIndex("unusual alliance of man")).toEqual([1, 1, 1]);
        expect(index.searchIndex("enters a world full")).toEqual([0, 0, 0]);
        expect(index.searchIndex("unusual a world andela")).toEqual([1, 0, -1]);
      });

    });

    describe("Can handle different kinds of arguments", function() {
      it("checks if it accepts array arguments", function() {
        expect(index.searchIndex(["Brian", "Alice", "alliance", "dwarf"])).toEqual([-1, 0, 1, 1]);
        expect(index.searchIndex([])).toEqual([]);
        expect(index.searchIndex(["Wonderland", "in"])).toEqual([0]);
      });

      it("checks if it accepts string as arguments", function() {
        expect(index.searchIndex("in of and into").length).toBe(0);
        expect(index.searchIndex("in of and into")).toEqual([]);
        expect(index.searchIndex("Brian Alice")).toContain(0);
      });

      it("checks if it accepts arguments as string lists", function() {
        expect(index.searchIndex("Fellowship", "full", "of")).toEqual([1, 0]);
        expect(index.searchIndex("into", "a", "an", "of")).toEqual([]);
        expect(index.searchIndex("of mine", "Alice", "go", "home")).toEqual([-1, 0, -1, -1]);
      });
    });
  });

});
