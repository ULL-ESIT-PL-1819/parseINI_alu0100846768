var XRegexp = require('xregexp');

var Whites = XRegexp('\\s+');
var Comment = XRegexp('(;.*)');
var Section = XRegexp('\\[.+\\]');
var Content = XRegexp('(\\w+)=(.+)\\b');

let lastIndex;
let match;

function parseIni(code) {
    lastIndex = 0;
    let result = new Object();
    let section = null;
    while (lastIndex < code.length) {
        if(match = XRegexp.exec(code, Whites, lastIndex, 'sticky') || 
            (match = XRegexp.exec(code, Comment, lastIndex, 'sticky'))){
            getTok();
        }else if(match = XRegexp.exec(code, Section, lastIndex, 'sticky')){
            getTok();
            section = match[0].replace(/\[|\]/g, '');
        }else if(match = XRegexp.exec(code, Content, lastIndex, 'sticky')){
            getTok();
            if(section){
                result[section] = {
                    [match[1]] : match[2]
                };
            }else{
                result = {
                    [match[1]] : match[2]
                }
            }
        }else{
            throw new Error("Syntax error near " + lastIndex + ": '"+ code.slice(lastIndex, lastIndex + 15) + "...' Unrecognized token!");
        }
    }
    return result;
}

function getTok(){
    lastIndex += match[0].length;
}

module.exports.parseIni = parseIni;