const parse = require('json-to-ast');

const settings = {
    loc: true,
    source: 'data.json'
};

const lint = (obj) => { 
    
    let objectErrors = [];
    // const parseObject = JSON.parse(JSON.stringify(parse(obj, settings)).replace(/(,"source":"data.json")|("type":"Property",)|("type":"Object",)|("raw":"\\"block\\"",)|("type":"Identifier",)|("type":"Literal",)|(,"raw":"\\"mods\\"")|("raw":"\\"size\\"",)|("raw":"\\"form\\"",)|("raw":"\\"(l|s)\\"",)|("type":"Array",)|("raw":"\\"content\\"",)|(,"offset":\d+)|(,"raw":"\\"text\\"")|(,"raw":"\\"label\\"")|(,"raw":"\\"(elem|input)\\"")/g,''));
    const parseObject = parse(obj, settings);
    console.log(parseObject)
    
    function processObject(obj) {
        let children = obj.children ? obj.children : '';
        let location = obj.loc ? obj.loc : '';
        let key = obj.key && obj.key.value ? obj.key.value : '';
        let value = obj.value && obj.value.value ? obj.value.value : '';
        let block = obj.block ? obj.block : '';
        checkH1(children); 
        if (children) {

            if (isForm(children)) {
                firstCondition(children);   
                    
            }
            children.forEach((element,index) => {
                if (element.value && element.value.children) {
                    processObject(element.value)
                } else if (element.children) {
                    processObject(element);
                } else if (element.key && element.key.value) {
    
                }
            });    
        } else {
            // console.log('else ', key, value)
        }

          
    };
    
    function firstCondition (array) {
        let standartSize = '';
        let location = '';
        findFalseSize(array);
        function findFalseSize (array) {
            array.forEach((element,index) => {
                let value =  element.value ? element.value : '';
                let elementChildren = element.children ? element.children : '';
                let valueChildren = value.children ? value.children : '';
                let children = elementChildren || valueChildren;
        
                if(element.key && element.key.value == 'size' && element.value && element.value.value && !standartSize) {
                    standartSize = element.value.value;
                    // console.log('standartSize => ', standartSize);
                } else if (standartSize && element.value && element.value.value && element.value.value.match(/input|text|button|label/)) { 
                    if (findMods(array)){
                        let currentSize = findSize(findMods(array));
                        if (currentSize != standartSize) {
                            // console.log('errorSize =>', currentSize);
                            objectErrors.push(returnError('FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL',location))
    
                        }
                    }
                } else if (children) {
                    location = element.loc;
                    findFalseSize(children);
                } 
            });
        }
    }
    
    function returnError (code, location) {
        const codesErrors = {
            "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL": "Подписи и поля в форме должны быть одного размера",
            "FORM.CONTENT_VERTICAL_SPACE_IS_INVALID": "Вертикальный внутренний отступ контентного элемента формы content должен задаваться с помощью микса на него элемента формы item со значением модификатора space-v на 2 шага больше эталонного размера (например, для размера l таким значением будет xxl).",
            "FORM.CONTENT_HORIZONTAL_SPACE_IS_INVALID": "Горизонтальный внутренний отступ контентного элемента должен задаваться с помощью модификатора space-h элемента формы item на 1 шаг больше эталонного размера.",
            "FORM.CONTENT_ITEM_INDENT_IS_INVALID": "Строки формы (в которые складываются лейбл и инпут) помечаются элементом формы content-item и должны отбиваться между собой с помощью модификатора нижнего отступа со значением модификатора indent-b элемента формы item на 1 шаг больше эталонного размера.",
            "FORM.HEADER_TEXT_SIZE_IS_INVALID": "Все текстовые блоки header должны быть со значением модификатора size на 2 шага больше эталонного размера.",
            "FORM.HEADER_VERTICAL_SPACE_IS_INVALID": "Вертикальный внутренний отступ заголовка формы должен быть задан с помощью микса на него элемента формы item со значением модификатора space-v, равным эталонному размеру.",
            "FORM.HEADER_HORIZONTAL_SPACE_IS_INVALID": "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера.",
            "FORM.FOOTER_VERTICAL_SPACE_IS_INVALID": "Вертикальный внутренний отступ заголовка формы должен быть задан с помощью микса на него элемента формы item со значением модификатора space-v, равным эталонному размеру.",
            "FORM.FOOTER_HORIZONTAL_SPACE_IS_INVALID": "Горизонтальный внутренний отступ должен быть на 1 шаг больше эталонного размера.",
            "FORM.FOOTER_TEXT_SIZE_IS_INVALID": "Размер текстовых блоков в подвале должен соответствовать эталонному.",
            "TEXT.SEVERAL_H1": "Заголовок h1 должен быть один на странице.",
            "TEXT.INVALID_H2_POSITION": "Заголовок h2 не может следовать перед заголовком h1.",
            "TEXT.INVALID_H3_POSITION": "Заголовок h3 не может следовать перед заголовком h2."
        }
        return {
            "code": code,
            "error": codesErrors[code],
            "location": {
                "start": {
                    "line": location.start.line,
                    "column": location.start.column
                },
                "end": {
                    "line": location.end.line,
                    "column": location.end.column
                }
            }
        }
    }
    
    function checkKeyValue (element, keyValue) {
        return element.key && element.key.value && element.key.value === keyValue;
    }
    
    function checkValueValue (element, ValueValue) {
        return element.value && element.value.value && element.value.value === ValueValue;
    }
    
    function isForm (array) {
        return  array.some(element => checkKeyValue(element, 'block') 
                && checkValueValue(element, 'form')) 
                && array.every(e => e.key.value !== 'elem');
    }
    
    function findMods (array) {
        // console.log('modsArray', array)
        let elementWithMods;
        array.forEach(element => {
            if (element.key.value.match(/mods|elemMods/)) {
                elementWithMods = element;
            } else {
                // console.log('mods or elemMods not found')
            }
        });
        if (elementWithMods) return elementWithMods;
        
    }
    
    function findSize(obj) {
        let children = obj.value.children ? obj.value.children : '';
        let size = '';
        if (children) {
            children.forEach((element,i) => {
                if (element.value.children) {
                    findSize(element.value.children);
                } else if (element.key.value === 'size' && element.value.value) {
                    size = element.value.value;
                } else console.log('size not found')
            });
        } else if (obj.key && obj.value && obj.key.value === 'size' && obj.value.value) {
            size = element.value.value;
        } else console.log('size not found');
    
        return size;
    }

    function findTitleH1(obj) {
        let childrenChildren = obj.children ? obj.children  : '';
        let valueChildren = obj.value && obj.value.children ? obj.value.children  : '';
        let children = childrenChildren || valueChildren;
        let h1 = '';
        if (children) {
            children.forEach((element,i) => {
                if (element.value.children) {
                    findTitleH1(element.value.children);
                } else if (obj.key && obj.value && obj.key.value === 'type' && obj.value.value === 'h1') {
                    h1 = element.value.value;
                    console.log(h1)
                }
            });
        } else if (obj.key && obj.key.value === 'type' && obj.value && obj.value.value && obj.value.value === 'h1') {
            h1 = obj.value.value;
        } else 
    
        return h1;
    }

    function checkH1 (array) {
        let standartSize = '';
        let location = '';
        findFalseSize(array);
        function findFalseSize (array) {
            array.forEach((element,index) => {
                let value =  element.value ? element.value : '';
                let elementChildren = element.children ? element.children : '';
                let valueChildren = value.children ? value.children : '';
                let children = elementChildren || valueChildren;
        
                if(obj.key && obj.key.value === 'type' && obj.value && obj.value.value && obj.value.value === 'h1') {
                    
                    if (findMods(array)){
                        let currentTitle = findTitleH1(findMods(array));
                        if (currentTitle == "h1") {
                            // console.log('errorSize =>', currentSize);
                            objectErrors.push(returnError('TEXT.SEVERAL_H1',location))
    
                        }
                    }
                } else if (children) {
                    location = element.loc;
                    findFalseSize(children);
                } 
            });
        }
    }

    processObject(parseObject);

    return objectErrors; 
} 

function isBrowser() { 
    try { 
        return window; 
    } 
    catch { 
        return false; 
    } 
} 

function isNode() { 
    try { 
        return global 
    } 
    catch { 
        return false; 
    } 
} 
 
function createGlobalVariable() { 
    if (!!isBrowser()) { 
        window.lint = lint; 
    } 
    else if (!!isNode()) { 
        global.lint = lint; 
    } 
}

createGlobalVariable();