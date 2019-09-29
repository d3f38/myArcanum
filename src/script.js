function square(n) {
    return _.map(collection, fn);
}

_.map([4, 8], square);
// => [16, 64]

function square2(n) {
    return _.map(['hi', 'hello', 'aloha'], fn);
}

function square3(n) {
    return _.map(kakoiToArray, fn);
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