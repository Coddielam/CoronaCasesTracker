// data loads once window loads
window.onload = function () {
    coronaCases();
}

// fetch data from corona virus tracker api
function coronaCases() {
    // var province = document.querySelector("option").innerText;
    fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=csbs&province=" + "Massachusetts")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data.locations[0]);
        let massData = data;
        // console.log(massData.locations[1].latest);
        for (let i = 0; i<massData.locations.length; i++) {
            let countyConfirmed = massData.locations[i].latest.confirmed;
            let countyDeaths = massData.locations[i].latest.deaths;
            let countyRecovered = massData.locations[i].latest.recovered;

            let countyStatContainer = document.createElement("div");
            countyStatContainer.setAttribute("class","county-stat-container");

            let county = document.createElement('h2');
            county.innerText = massData.locations[i].county;

            let countyStats = document.createElement('ul');
            countyStats.innerHTML += "<li> Conformed Cases: " + countyConfirmed + "</li>";
            countyStats.innerHTML += "<li> Deaths: " + countyDeaths + "</li>";
            countyStats.innerHTML += "<li> Recovered Cases: " + countyRecovered + "</li>";
            
            countyStatContainer.appendChild(county);
            countyStatContainer.appendChild(countyStats);
            
            document.querySelector(".stats").appendChild(countyStatContainer);
        }
    })
    .catch(function() {
        console.log("error")
    })
    setTimeout(coronaCases, 43200000) //update every 12 hours
}