var atlLatLng = new L.LatLng(33.7771, -84.3900);
var myMap = L.map('map').setView(atlLatLng, 5);
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
            d3.csv('storms.csv', function(row) {
                return {LatLng: [+row['lat'], +row['long']], type: row['category']};
            })
            ]).then(function(data) {
                var nodes = data[0];
                readyToDraw(nodes);
            });


function readyToDraw(nodes) {
  var nodeTypes = d3.map(nodes, function(d){return d.type;}).keys();
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(nodeTypes);

  nodeLinkG.selectAll('.grid-node')
           .data(nodes)
           .enter().append('circle')
           .attr('class', 'grid-node')
           .style('fill', function(d){
             return colorScale(d['type']);
           })
           .style('fill-opacity', 0.6)
           .attr('r', 2);

  myMap.on('zoomend', updateLayers);
  updateLayers();
}

function updateLayers(){
  nodeLinkG.selectAll('.grid-node')
           .attr('cx', function(d){return myMap.latLngToLayerPoint(d.LatLng).x})
           .attr('cy', function(d){return myMap.latLngToLayerPoint(d.LatLng).y})
 };
