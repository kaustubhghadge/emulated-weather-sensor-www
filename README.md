# emulated-weather-sensor-www
Front end for displaying data from <a href="https://github.com/kaustubhghadge/emulated-weather-sensor-api"> emulated-weather-sensor-api </a> in chart format using d3.js 

<h3>Installation</h3>
Start the app in any server utility you prefer. For quick start <code>http-server</code> is added. To install run - 
<ul>
<li><code>npm install</code></li>
<li>Start server using - <code>http-server</code>. Add port flag to change start on different port, e.g. <code>http-server -p 3001</code></li>
</ul>

<h3>Notes</h3>
The data is currently being auto-updated per 12 seconds. You can change it to match the API call timeframe i.e. 60 seconds in <code> index.js </code> until <code>env.js</code> file is added.


<h3>Peek</h3>
<img src="https://github.com/kaustubhghadge/emulated-weather-sensor-www/blob/master/Peek.gif"/>



<h3>To Do </h3>
<ul>
<li>Add <code>env.js</code> file</li>
<li>Add more styles</li>
</ul>
