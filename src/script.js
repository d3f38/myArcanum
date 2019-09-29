function square(n) {
    return (Array.isArray(collection)) ? 
        collection.map(fn) : 
        _.map(collection, fn);
}

[4, 8].map(square);
// => [16, 64]

function square2(n) {
    return ['hi', 'hello', 'aloha'].map(fn);
}

function square3(n) {
    return (Array.isArray(kakoiToArray)) ? 
        kakoiToArray.map(fn) : 
        _.map(kakoiToArray, fn);
}
var kakoiToArray = ['q', 'w'];

function square4(n) {
    return kakoiToArray.map(fn);
}


function square5(n) {
    return (Array.isArray(fn)) ?
        fn.map(POP) :
        _.map(fn, POP);
}


_.map({
    'a': 4,
    'b': 8
}, square);

var users = [{
        'user': 'barney'
    },
    {
        'user': 'fred'
    }
];


users.map('user');