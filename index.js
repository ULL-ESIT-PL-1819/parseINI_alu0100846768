const parseINI = require('./lib/parseINI.js');
    console.log(parseINI.parseIni(`
    name=Torres Quevedo
    [address]
    invention=The chess player`));
