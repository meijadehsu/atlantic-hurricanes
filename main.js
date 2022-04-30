// 1. Load CSV
d3.csv("storms_cleaned.csv").then(function(dataset) {
    // console.log(dataset);


    // Create scales, axes, and labels

    // a. x-scale
    pressureExtent = d3.extent(dataset, function(d){
        return +d['pressure'];
    });
    pressureScale = d3.scaleLinear()
        .domain(pressureExtent)
        .range([60,700]);
    function scalePressure(pressure) {
        return pressureScale(pressure);
    }

    // b. y-scale
    windExtent = d3.extent(dataset, function(d){
        return +d['wind_mph'];
    });
    windScale = d3.scaleLinear()
        .domain(windExtent)
        .range([340,20]);
    function scaleWind(wind) {
        return windScale(wind);
    }

    svg = d3.select("#pressure_vs_wind").select('svg');

    svg.append('g').attr('class', 'x_axis')
        .attr('transform', 'translate(0,345)')
        .call(d3.axisBottom(pressureScale).tickFormat(function(d){return d;}));

    svg.append('text')
        .attr('class', 'label')
        .attr('transform', 'translate(380,390)')
        .text('Air Pressure at Storm\'s Center (millibars)');

    svg.append('g').attr('class', 'y_axis')
        .attr('transform', 'translate(55,0)')
        .call(d3.axisLeft(windScale));

    svg.append('text')
        .attr('class', 'label')
        .attr('transform', 'translate(15,195) rotate(270)')
        .text('Storm\'s Sustained Wind Speed (mph)');

    svg.append('text')
        .attr('class', 'title')
        .attr('transform', 'translate(380,12)')
        .text('Air Pressure vs. Wind Speed');


    // 2. Create and center circles
    svg.selectAll("circle")
        .data(dataset).enter().append("circle")
        .attr("cx", function(d) {
            return scalePressure(d.pressure);
        })
        .attr("cy", function(d) {
            return scaleWind(d.wind_mph);
        })
        .attr("r", "2")
        .attr("fill", function(d) {
            if (d.category == -1) {
                return "darkgreen";
            } else if (d.category == 0) {
                return "limegreen";
            } else if (d.category == 1) {
                return "gold";
            } else if (d.category == 2) {
                return "darkorange";
            } else if (d.category == 3) {
                return "hotpink";
            } else if (d.category == 4) {
                return "red";
            } else if (d.category == 5) {
                return "darkblue";
            }
        });
});

// 1. Load CSV
d3.csv("storms_per_year.csv").then(function(dataset) {
    console.log(dataset);


    // Create scales, axes, and labels

    // a. x-scale
    yearExtent = d3.extent(dataset, function(d){
        return +d['year'];
    });
    yearScale = d3.scaleLinear()
        .domain(yearExtent)
        .range([60,700]);
    function scaleYear(year) {
        return yearScale(year);
    }

    // b. y-scale
    countExtent = d3.extent(dataset, function(d){
        return +d['count'];
    });
    countScale = d3.scaleLinear()
        .domain(countExtent)
        .range([340,20]);
    function scaleCount(count) {
        return countScale(count);
    }

    lineInterpolate = d3.line()
        .x(function(d) { return scaleYear(d.year); })
        .y(function(d) { return scaleCount(d.count); });

    svg = d3.select("#storms_per_year").select('svg');

    svg.append('g').attr('class', 'x_axis')
        .attr('transform', 'translate(0,345)')
        .call(d3.axisBottom(yearScale).tickFormat(function(d){return d;}));

    svg.append('text')
        .attr('class', 'label')
        .attr('transform', 'translate(375,390)')
        .text('Year');

    svg.append('g').attr('class', 'y_axis')
        .attr('transform', 'translate(55,0)')
        .call(d3.axisLeft(countScale));

    svg.append('text')
        .attr('class', 'label')
        .attr('transform', 'translate(15,190) rotate(270)')
        .text('Number of Storms');

    svg.append('text')
        .attr('class', 'title')
        .attr('transform', 'translate(380,30)')
        .text('Number of Storms per Year');


    // 9. Append the path, bind the data, and call the line generator
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("class", "line-plot") // Assign a class for styling
        .attr("d", lineInterpolate) // 11. Calls the line generator
        .style('stroke');

    // // 3. Create the line chart
    // svg.select('.line-plot')
    //     .data(function(d){
    //         return +d['count'];
    //     })
    //     .enter()
    //     .append('path')
    //     .attr('class', 'line-plot')
    //     .attr('d', lineInterpolate)
    //     .style('stroke');
});



/* VIZ 2 */

var stormsCWP = [
    { category: -1, average_wind_speed: 31.64049358, average_pressure: 1007.538992},
    { category: 0, average_wind_speed: 52.54913011, average_pressure: 999.2910043},
    { category: 1, average_wind_speed: 81.64944757, average_pressure: 981.188728},
    { category: 2, average_wind_speed: 102.9018565, average_pressure: 966.9359146},
    { category: 3, average_wind_speed: 120.2352975, average_pressure: 953.9124424},
    { category: 4, average_wind_speed: 140.5155579, average_pressure: 939.3941606},
    { category: 5, average_wind_speed: 167.5321581, average_pressure: 917.4069767}
];

var svg = d3.select('#plot2');
var svgWidth = parseInt(svg.style("width").substring(0,3))
var svgHeight = parseInt(svg.style("height").substring(0,3))

var x0 = 0
var x1 = svgWidth-20
var y0 = svgHeight-40
var y1 = svgHeight/2 - 40

var xScale = d3.scaleBand()
    .domain(['-1','0','1','2','3','4','5'])
    .rangeRound([40,svgWidth-20])
    .padding(0.5);

var yScale = d3.scaleLinear()
    .domain([0, 180]) // 0mph to 180 mph
    .range([y1, 40]); //[y1,40]



svg.selectAll('w_rect')
    .data(stormsCWP)
    .enter()
    .append('rect')
        .attr('y', function(d){
            return y1+45+yScale(d.average_wind_speed);
        })
        .attr('x', function(d){
            return 25+xScale(d.category);
        })
        .attr('height', function(d){
            return y1-yScale(d.average_wind_speed);
        })
        .attr('width', xScale.bandwidth())
        .style('fill', '#507ca4');



var xAxis = d3.axisBottom(xScale);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(25,565)')
    .call(xAxis);
svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(200,590)')
    .text('Hurricane Category');

var yAxis = d3.axisLeft(yScale);

svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(50, 300)')
    .call(yAxis);

svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(20,450)rotate(-90)')
    .text('Average Wind Speed (mph)');
var yScale2 = d3.scaleLinear()
    .domain([900, 1060]) // 900 to 1020 pressure
    .range([y0, y1+40]);

var yAxis2 = d3.axisLeft(yScale2);
svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(25,300)')
    .call(xAxis);
svg.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(50, -264)')
    .call(yAxis2);

svg.append('text')
    .attr('class', 'title')
    .attr('transform','translate(200,30)')
    .text('Wind Speed and Pressure by Storm Category');
svg.append('text')
    .attr('class', 'label')
    .attr('transform','translate(20,150)rotate(-90)')
    .text('Average Pressure (millibars)');
svg.selectAll('p_rect')
    .data(stormsCWP)
    .enter()
    .append('rect')
        .attr('y', function(d){
            return yScale2(d.average_pressure)-y1;
        })
        .attr('x', function(d){
            return 25+xScale(d.category);
        })
        .attr('height', function(d){
            return y0-yScale2(d.average_pressure);
        })
        .attr('width', xScale.bandwidth())
        .style('fill', '#507ca4');















/* VIZ 3 */


var numToMonth = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

var monthToNum = {
  "January": 1,
  "February": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "July": 7,
  "August": 8,
  "September": 9,
  "October": 10,
  "November": 11,
  "December": 12
};


function outputUpdate(num) {
  document.querySelector('#output').value = numToMonth[num];
  monthKey = monthToNum[document.querySelector('#output').value];
  updatePoints(monthKey);
}

var atlLatLng = new L.LatLng(33.7771, -64.3900);
var myMap = L.map('map').setView(atlLatLng, 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	     {
	       maxZoom: 10,
	       minZoom: 3,
	       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
             }).addTo(myMap);

var svgLayer = L.svg();
svgLayer.addTo(myMap);
var svg = d3.select('#map').select('svg');
var nodeLinkG = svg.select('g')
                   .attr('class', 'leaflet-zoom-hide');



Promise.all([
            d3.csv('storms_new_2.csv', function(row) {
                node = {LatLng: [+row['lat'], +row['long']], type: row['category'], name: row['name'], diam: row['ts_diameter'], month: row['month']};
                return node;
            })
          ]).then(function(data) {
                var nodes = data[0];
                nodesCopy = nodes;
                readyToDraw(1);
            });


function readyToDraw(monthKey) {
  myMap.on('zoomend', updateLayers);
  updatePoints(monthKey);
  updateLayers();
}

function updatePoints(monthKey){
  var filteredData = nodesCopy.filter(function(d){
      return d.month == monthKey;
  });

  var nodeTypes = d3.map(nodesCopy, function(d){return d.type;}).keys();
  var colorScale = d3.scaleOrdinal([-1, 0, 1, 2, 3, 4, 5], ["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]);

  var radExtent = d3.extent(nodesCopy, function(d){
    return +(d['diam']/2);
  });

  var radScale = d3.scaleSqrt()
                    .domain(radExtent)
                    .range([3, 25]);

  var group = nodeLinkG.selectAll('.grid-node')
           .data(filteredData);

  var groupEnter =  group.enter()
           .append('g')
           .attr('class', 'month')
           group.merge(groupEnter)
           ;

           groupEnter.append('circle')
           .attr('class', 'grid-node')
           .style('fill', function(d){
             return colorScale(d['type']);
           })
           .style('fill-opacity', 0.6)
           .attr('r', function(d){
             return radScale(+d['diam']/2);
           });
    group.exit().remove();
    updateLayers();
}

function updateLayers(){
  nodeLinkG.selectAll('.grid-node')
           .attr('cx', function(d){return myMap.latLngToLayerPoint(d.LatLng).x})
           .attr('cy', function(d){return myMap.latLngToLayerPoint(d.LatLng).y})
 };



var legend = L.control({position: 'topright'});

legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend');
              div.innerHTML += "<h4>Storm Category</h4>";
              div.innerHTML += '<i style="background: #fee5d9"></i><span>Tropical Depression</span><br>';
              div.innerHTML += '<i style="background: #fcbba1"></i><span>Tropical Storm</span><br>';
              div.innerHTML += '<i style="background: #fc9272"></i><span>Hurricane (1)</span><br>';
              div.innerHTML += '<i style="background: #fb6a4a"></i><span>Hurricane (2)</span><br>';
              div.innerHTML += '<i style="background: #ef3b2c"></i><span>Hurricane (3)</span><br>';
              div.innerHTML += '<i style="background: #cb181d"></i><span>Hurricane (4)</span><br>';
              div.innerHTML += '<i style="background: #99000d"></i><span>Hurricane (5)</span><br>';


return div;
};

legend.addTo(myMap);
