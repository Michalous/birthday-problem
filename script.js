document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('birthday_recalculate').onclick = function() {
      drawGraph()
    }

    function birthdayProb(num) {
        var match = 0
        for (var i = 0; i < 1000; i++) {
            var birthdays = []
            for (var j = 1; j <= num; j++) {
                x = Math.floor(Math.random() * 365 + 1)
                if (birthdays.indexOf(x) != -1) {
                  match++
                  break
                }
                birthdays.push(x)
            }
        }
        return match/1000
    }
	
	function checkFifty(x_axis, y_axis) {
		for (var i = 0; i < y_axis.length; i++) {
			if (y_axis[i] >= 0.5) {
				return x_axis[i]
			}
		}
		return undefined
	}

  function drawGraph() {
    var x_axis = []
    var y_axis = []

    for (var i = 1; i <=100; i++) {
        x_axis.push(i)
        y_axis.push(birthdayProb(i))
    }
    document.getElementById('birthday_result').innerHTML = checkFifty(x_axis, y_axis)
    var trace = {
        x: [...x_axis],
        y: [...y_axis],
        mode: 'lines',
        type: 'scatter'
      };

      var layout = {
        margin: {t:0,r:0,b:0,l:20},
        xaxis: {
          automargin: true,
          tickangle: 0,
          title: {
            text: "Size of group",
            standoff: 20
          }},
        yaxis: {
          automargin: true,
          tickangle: 0,
          title: {
            text: "Probability",
            standoff: 40
          }}}
    
    var data = [trace]
    Plotly.newPlot('birthday_container', data, layout)
  }
  drawGraph()
})