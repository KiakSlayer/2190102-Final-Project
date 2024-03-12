async function generateChart() {
    // Script by 6538149021 Pemapol Sripratipbundit
    const urlQuery = "https://restcountries.com/v3.1/name/" + document.getElementById("countryName").value + "?fullText=true";
    const response = await fetch(urlQuery);
    const countryData = await response.json();
    var error = document.getElementById("error");
    var vacRate = document.getElementById("vacRate");
    if (countryData.status == 404) {
        error.textContent = "Country not found.";
        setTimeout(() => error.textContent = "", 3000);
    }

    let chartStatus = Chart.getChart("doughnutChart");
    if (chartStatus != undefined) {
        vacRate.innerHTML = "<b>No Percentage</b>";
        chartStatus.destroy();
    }

    console.log(urlQuery);

    const countryCode = countryData[0].cca3;
    console.log(countryCode);

    const response2 = await fetch("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json");
    const vaccinationData = await response2.json();
    
    const isQueryCountry = (element) => element.iso_code == countryCode;
    var countryIndex = vaccinationData.findIndex(isQueryCountry);
    console.log(countryIndex);
    
    const numberOfVac = vaccinationData[countryIndex].data[vaccinationData[countryIndex].data.length-1].people_fully_vaccinated_per_hundred;
    if (numberOfVac == NaN){
        error.textContent = "No data available.";
        setTimeout(() => error.textContent = "", 3000);
    }
    const numberOfNotVac = 100 - numberOfVac;
    console.log(numberOfNotVac, numberOfVac);
    vacRate.innerHTML = "<b>Vaccination Percentage</b>: " + numberOfVac + "%";
    var ctx = document.getElementById("doughnutChart").getContext('2d');
    console.log(ctx);
    var data = [numberOfVac,numberOfNotVac];

    new Chart(ctx, {
        type: 'doughnut',
        data: {labels: [
            'Vaccinated',
            'Not Vaccinated'
          ],
          datasets: [{
            label: ' Rate of ' + countryData[0].name.common,
            data: data,
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)'
            ],
            hoverOffset: 0
          }]
        },
        options: {
          borderWidth: 10,
          borderRadius: 2,
          hoverBorderWidth: 0,
          //responsive: false,
          //maintainAspectRatio: false,
          plugins: {
            legend: {
                labels: {
                    font: {
                        size: 24
                    }
                }
            }
        }
        }
    });
  };

  


  
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height =sec.offsetHeight;
    let id =sec.getAttribute('');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelectorAll('header nav a [href*=' + id +']').classList.add('active');
      });
    };
  });
};

