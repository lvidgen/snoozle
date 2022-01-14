(function() {
    var i = 0,
        radsel = "gold";
    ta.value = "";
    document.getElementById("gold").checked = true;

    for (i; i < 29; i++) {
        document.getElementById("board").appendChild(document.getElementsByClassName("btn")[0].cloneNode(false));
    }

    document.getElementById("rads").onclick = function(e) {
        if (e.target.tagName.toLowerCase() === "input") {
            radsel = e.target.id;
        }
    }

    document.getElementById("board").onclick = function(e) {
        if (e.target.tagName.toLowerCase() === "button") {
            e.target.style.backgroundColor = radsel
        }
    }

    document.getElementById("randwin").onclick = function() {
        var atts = Number(document.getElementById("attno").value),
            btns = document.querySelectorAll("#board button"),
            cols = ["green", "gold", "lightgray"],
            i = 1,
            a = 0,
            tofill = atts * 5 + 1,
            solved = true;

        for (a; a < btns.length; a++) {
            btns[a].style.backgroundColor = "lightgray";
        }

        for (i; i < tofill; i++) {
            var done = (tofill - i) < 6,
                thecol = done ? "green" : cols[Math.floor(Math.random() * cols.length)];
            btns[i - 1].style.backgroundColor = thecol;
            if (thecol != "green") {
                solved = false
            }
            if (i % 5 === 0) {
                if (solved && !done) {
                    var x = Math.floor((Math.random() * 5) + 1);
                    btns[i - x].style.backgroundColor = "lightgray"
                }
                solved = true;
            }
        }
    }

	document.getElementById("closer").onclick = function(){
		document.getElementById("modal").style.display = "none";
		document.getElementById("blanket").style.display = "none";
	}

    document.getElementById("sharebtn").onclick = getResults;

    function getResults() {
        ta.value = "";
        var dv = document.createElement("div"),
            str = "",
            solved = true,
            btns = document.querySelectorAll("#board button"),
            row = 1,
            a = 1,
            cols = {
                "green": "&#x1F7E9",
                "gold": "&#x1F7E8",
                "lightgray": "&#x2b1c"
            },
	    start = new Date(2021,5,19,0,0,0,0);
		today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		timeDiff = Math.abs(today.getTime() - start.getTime());
		
		var pznum = Math.round(timeDiff / (1000 * 3600 * 24));

        for (a; a < 31; a++) {
            var thecol = btns[a - 1].style.backgroundColor || "lightgray"
            str += cols[thecol];
            if (thecol != "green") {
                solved = false
            }
            if (a % 5 === 0) {
                if (solved) {
                    break;
                } else {
                    str += "\n"
                    solved = true;
                    row++;
                }
            }
        }

        dv.innerHTML = str;
        var res = 'Wordle ' + pznum + ' ' + row + '/6\n' + dv.innerHTML;
        ta.value = res;
        navigator.clipboard.writeText(res);
		document.getElementById("modal").style.display = "block";
		document.getElementById("blanket").style.display = "block";
    }
})();