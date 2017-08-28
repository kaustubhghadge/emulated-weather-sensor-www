/*
	Front End code for getting data and updating d3 charts
*/


var margin = {top: 20, right: 100, bottom: 150, left: 100},
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;


var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%L%Z");



var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 60]);
var yHumidity = d3.scaleLinear().range([height, 30]); 


 var temperatureLine = d3.line()
        .x(function(d) { return x(parseTime(d.updated_at)); })
        .y(function(d) { return y(d.temperature); });

 var humidityLine = d3.line()
        .x(function(d) { return x(parseTime(d.updated_at)); })
        .y(function(d) { return yHumidity(d.humidity); });



 var svgTemperature = d3.select("#tempChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

 var svgHumidity = d3.select("#humidChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.json("http://127.0.0.1:8080/weather",function(error,data){


	x.domain(d3.extent(data, function(d) { return parseTime(d.updated_at); }));
	y.domain(d3.extent(data, function(d) { return d.temperature; }));
	yHumidity.domain(d3.extent(data, function(d) { return d.humidity; }));

	//temperature

	//draw x-axis
	svgTemperature.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M")));

    //draw y-axis
    svgTemperature.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Temperature (℉)');

    //plot lines
    svgTemperature.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', temperatureLine);




	//humidity

	//draw x-axis
	svgHumidity.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M")));


     //draw y-axis
      svgHumidity.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(yHumidity))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Humidity (%)');



     //plot lines
     svgHumidity.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', humidityLine);

});


var inter = setInterval(function() {
                updateBothGraphs();
        }, 12000); 



function updateBothGraphs(){

	d3.json("http://127.0.0.1:8080/weather",function(error,data){


	//write two methods - one for temperature and one for humidity

	 x.domain(d3.extent(data, function(d) { return parseTime(d.updated_at); }));
	 y.domain(d3.extent(data, function(d) { return d.temperature; }));
	 yHumidity.domain(d3.extent(data, function(d) { return d.humidity; }));



	// temperature
    var svgTemperature = d3.select("#tempChart").transition();

    //plot lines
    svgTemperature.select('.line')
    		.duration(750)           
            .attr('d', temperatureLine(data));
     svgTemperature.select('.axis--x')
     				.duration(750)
     				.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M")));

     svgTemperature.select('.axis--y')
     				.duration(750)
     				.call(d3.axisLeft(y));




	//humidity
	var svgHumidity = d3.select("#humidChart").transition();

    //plot lines
    svgHumidity.select('.line')
    		.duration(750)           
            .attr('d', humidityLine(data));
     svgHumidity.select('.axis--x')
     				.duration(750)
     				.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%H:%M")));

     svgHumidity.select('.axis--y')
     				.duration(750)
     				.call(d3.axisLeft(yHumidity));
	});
}