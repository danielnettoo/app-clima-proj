"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-location");
const sectionWeatherInfos = document.querySelector("#weather-infos");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectionWeatherInfos)
        return;
    const location = input === null || input === void 0 ? void 0 : input.value;
    if ((location === null || location === void 0 ? void 0 : location.length) < 3) {
        alert("Digite um local existente e com pelo menos 3 letras");
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9ed80c2e36f375cd04abb710e95d9be2&lang=pt_br&units=metric`);
        const data = yield response.json();
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
    }
    catch (error) {
        console.log("ERROR - Falha comunicação com a API");
    }
    finally {
        console.log("Fim execução");
    }
}));
