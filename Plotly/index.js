// function buildPlot() {
//     /* data route */
//     var url_labels = "/otu";
//     var url_values = "/samples/BB_944"
//     Plotly.d3.json(url_labels, function (response1, error) {
//     	Plotly.d3.json(url_values, function (response2, error) {
//     		var labels = response1
//     		var values = response2
//     		console.log(labels)
//     		console.log(values)
//     	}
//     	)
// 	}
// 	)

// 	// Build Pie Chart
//             console.log(values[0]['sample_values'].slice(0, 10))
//             var pieData = [{
//                 values: values[0]['sample_values'].slice(0, 10),
//                 labels: labels[0]['otu_ids'].slice(0, 10),
//                 hovertext: labels.slice(0, 10),
//                 hoverinfo: 'hovertext',
//                 type: 'pie'
//             }];
//             var pieLayout = {
//                 margin: { t: 0, l: 0 }
//             };
//             var PIE = document.getElementById('piechart');
//             Plotly.plot(PIE, pieData, pieLayout);
//         };


//    var pieData = [{
//     values: values,
//     labels: labels,
//     hovertext: labels.slice(0, 10),
//     hoverinfo: 'hovertext',
//     type: 'pie'
// }];
// 	var pie = document.getElementByID('piechart');
// 	Plotly.plot(pie, labels, values)
// };

var data = [{
  values: [19, 26, 55],
  labels: ['Residential', 'Non-Residential', 'Utility'],
  type: 'pie'
}];
var layout = {
  height: 400,
  width: 500
};
Plotly.newPlot('myDiv', data, layout);




