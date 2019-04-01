var should = require("should");
var parser = require('../lib/parseINI.js');

describe("parseINI", function() {
    it("should parse a comment", function() {
        let expected = {};
        let  result = parser.parseIni(`
        ; Comentario`);
        expected.should.eql(result);
    })
    it("should parse a white", function() {
        let expected = {};
        let  result = parser.parseIni(`
         \t\n`);
        expected.should.eql(result);
    })
    it("should parse a INI input", function() {
        let expected = {name: "Torres Quevedo", address: {invention: "The chess player"}};
        let  result = parser.parseIni(`
        name=Torres Quevedo
        [address]
        invention=The chess player`);
        expected.should.eql(result);
    })
  
    it("should have an error if not valid", function() {
        //parser.parseIni('chazam');
        (function(){parser.parseIni('chazam')}).should.throw(/Syntax error near 0: 'chazam...' Unrecognized token!/);
    })
})