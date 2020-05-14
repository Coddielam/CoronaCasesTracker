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
    document.querySelector("h1").innerText = province;
}

document.querySelector("select").addEventListener("change", function(){
    document.querySelector(".stats").innerHTML = '';
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