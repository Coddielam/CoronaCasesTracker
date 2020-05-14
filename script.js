window.onload = function() {
    let province = getProvince();
    provinceName(province);
    coronaCases(province);
}

function getProvince() {
    province = document.querySelector("select").value;
    return province;
}

// set h1 title
function provinceName (province) {
    province = getProvince();
    document.querySelector("h1").innerHTML = '<img src="emoji/face-with-medical-mask.png" alt="Wear Mask Emoji">' + province;
}

document.querySelector("select").addEventListener("change", function(){
    document.querySelector("tbody").remove();
    provinceName(province);
    coronaCases(province);
});


// fetch data from corona virus tracker api
function coronaCases(province) {
    province = getProvince();
    fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs&province=" + province)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        document.querySelector("p#last-update").innerText += " " + data.locations[0].last_updated;

        var thead = document.createElement("thead");
        // thead.innerHTML = "<tr> <th>County</th><th>Confirmed Cases</th><th>Deaths</th><th>Recovered</th> </tr>"
        // document.querySelector("table").appendChild(thead);

        let provinceData = data;

        console.log(data);

        let countyData = document.createElement('tbody');

        for (let i = 0; i<provinceData.locations.length; i++) {

            let county = provinceData.locations[i].county;
            let countyConfirmed = provinceData.locations[i].latest.confirmed;
            let countyDeaths = provinceData.locations[i].latest.deaths;
            let countyRecovered = provinceData.locations[i].latest.recovered;

            let countyStats = document.createElement('tr');
            countyStats.innerHTML += "<td>" + county + "</td>";
            countyStats.innerHTML += "<td>" + countyConfirmed + "</td>";
            countyStats.innerHTML += "<td>" + countyDeaths + "</td>";
            countyStats.innerHTML += "<td>" + countyRecovered + "</td>";
            
            countyData.appendChild(countyStats);
            
            document.querySelector("table").appendChild(countyData);
        }
    })
    .catch(function() {
        console.log("error")
    })
    setTimeout(coronaCases, 43200000) //update every 12 hours
}

function sortBy (colNum) {
    var switching = true;

    while (switching) {
        switching = false;

        for (var i = 0; i<document.querySelector("tbody").rows.length-1; i++) {
            let rowOne = document.querySelector("tbody").rows[i];
            let rowTwo = document.querySelector("tbody").rows[i+1];
            if (Number(rowOne.children[colNum].innerHTML) < Number(rowTwo.children[colNum].innerText)) {
                rowOne.parentNode.insertBefore(rowTwo, rowOne);
                switching = true;
            };
        }
    }
}

