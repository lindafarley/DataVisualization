function buildPlot() {
    /* data route */
    var url_labels = "/names";
    var url_values = "/samples/<sample>"
    Plotly.d3.json(url_labels, function (error, response1) {
    	Plotly.d3.json(url_values, function (error, response2) {
    		var labels = response1
    		var values = response2
    	}
	}

   var pieData = [{
    values: values,
    labels: labels,
    hovertext: labels.slice(0, 10),
    hoverinfo: 'hovertext',
    type: 'pie'
}];
	var pie = document.getelementbyID('piechart');
	Plotly.newplot(pie, labels, values)
};
