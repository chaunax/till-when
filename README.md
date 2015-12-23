# Till-when

Till-when takes a time range string (like "9-2P") and converts it into formatted begin and end
components.


## Usage
Install via npm:
```
npm install till-when --save
```



```javascript
var tillwhen = require('until-when')

var parsed = tillwhen.parse('9AM-11:11AM');
console.log(parsed.begin); //'9:00 AM'
console.log(parsed.end); //'11:11 AM'

parsed = tillwhen.parse('8A to 7PM');
console.log(parsed.begin); //'8:00 AM'
console.log(parsed.end); //'7:00 PM'

//if missing, the AM/PM of the beginning time is inferred from the end
parsed = tillwhen.parse('9-2P');
console.log(parsed.begin); //'9:00 AM'
console.log(parsed.end); //'2:00 PM'
```


## Tests
Tests are written in mocha/chai.expect.
