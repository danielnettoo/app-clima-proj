const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
	document.querySelector("#input-location");

const sectionWeatherInfos = document.querySelector("#weather-infos");

form?.addEventListener("submit", async (event) => {
	event.preventDefault();

	if (!input || !sectionWeatherInfos) return;

	const location = input?.value;

	if (location?.length < 3) {
		alert("Digite um local existente e com pelo menos 3 letras");
	}

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9ed80c2e36f375cd04abb710e95d9be2&lang=pt_br&units=metric`
		);

		const data = await response.json();

		const infos = {
			temperature: Math.round(data.main.temp),
			local: data.name,
			icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
		};

		sectionWeatherInfos.innerHTML = `
      <div class="temperature-location">
                  <h2>${infos.local}</h2>
                  <span>${infos.temperature}ºC</span>
               </div>
   
               <div class="icon-wether">
                  <img src="${infos.icon}" alt="" />`;
	} catch (error) {
		console.log("ERROR - Falha comunicação com a API");
	} finally {
		console.log("Fim execução");
	}
});
