
function isString(val) {
    return typeof val === 'string' || ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');
}

var type = function(obj) {
    return Object.prototype.toString.apply(obj).replace(/\[object (.+)\]/i, '$1').toLowerCase();
};

type('my string') === 'string' //true
type(new String('my string')) === 'string' //true
type(`my string`) === 'string' //true
type(12345) === 'string' //false
type({}) === 'string' // false

type(null) //null
type(undefined) //undefined
type([]) //array
type({}) //object
type(function() {}) //function
type(123) //number
type(new Number(123)) //number
type(/some_regex/) //regexp
type(Symbol("foo")) //symbol

// ---------------------------------------

console.log(isDate('5/1/19'))
console.log(isDate('05/01/2019'))
console.log(isDate(11))
console.log(isDate('o5/12/19'))
console.log(isDate(''))
console.log(isDate(null))

function isDate(date){
    return date !== null && date.length > 5 && date.length < 11 && !isNaN(new Date(date))
}

var is_date = function(input) {
    if ( Object.prototype.toString.call(input) === "[object Date]" ) 
        return true;
    return false;   
};

if(/scot/.test(data[key])){

    var str = "Scotland";
    var patt = new RegExp("scot", 'ig');
    var res = patt.test(str);    
    console.log('res', res)

    var match = false
    let val = filterParams.value
    // val = new RegExp(val, 'i')
    for(var key in data){
        // if(isString(val)) {
            if(data[key] == val) {
                match = true;
            }
        // }
    }