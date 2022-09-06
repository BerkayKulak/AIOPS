var fs = require('fs');
const { parse } = require('csv-parse');

function average(a, n) {
  var sum = 0;
  for (var i = 0; i < n; i++) sum += a[i];

  return parseFloat(sum / n);
}

var arrayAverage = [];
var arrayAverageInt = [];
var parser = parse({ columns: true }, function (err, records) {
  //console.log(records);
  records.map((e) => {
    arrayAverage.push(e.SPH);
  });
  for (var i = 0; i < records.length; i++) {
    arrayAverageInt.push(parseInt(arrayAverage[i]));
  }

  var n = arrayAverageInt.length;
  console.log(average(arrayAverageInt, n));

});

fs.createReadStream(__dirname + '/UsageOfServers.csv').pipe(parser);
