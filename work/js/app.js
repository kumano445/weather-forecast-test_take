document.getElementById("get-weather").addEventListener("click", function() {
  const cityId = document.getElementById("city-select").value;

  // 都市が選択されていない場合は警告を表示して終了
  if (!cityId) {
    alert("都市を選択してください");
    return;
  }

  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityId}.json`;

  fetch(url)
    .then(response => response.json())
    .then(weather => {
      // timeSeriesの内容を確認
      console.log(weather[0].timeSeries);

      // 各timeSeriesのareasを確認
      weather[0].timeSeries.forEach((series, index) => {
        console.log(`timeSeries[${index}] areas:`, series.areas);
      });

      // tempAverageの気温データ
      const tempAverage = weather[1].tempAverage;
      if (tempAverage && tempAverage.areas && tempAverage.areas[0]) {
        const tempData = tempAverage.areas[0];

        // 最大気温と最小気温を取得
        const maxTemp = tempData.max ? tempData.max + "℃" : "データなし";
        const minTemp = tempData.min ? tempData.min + "℃" : "データなし";

        // HTML要素にデータを反映
        document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice;
        document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;

        // 正確な地域名を表示するため、areasの最初の地域名を取得
        const targetAreaName = weather[0].timeSeries[0].areas[0].area.name;
        document.getElementById("targetArea").lastElementChild.textContent = targetAreaName;

        document.getElementById("todayHighTemperature").lastElementChild.textContent = maxTemp;
        document.getElementById("todayLowTemperature").lastElementChild.textContent = minTemp;
        
        // 各日の天気情報
        const weatherInfo = weather[0].timeSeries[0].areas[0];
        document.getElementById("today").lastElementChild.textContent = weatherInfo.weathers[0] || "データなし";
        document.getElementById("tomorrow").lastElementChild.textContent = weatherInfo.weathers[1] || "データなし";
        document.getElementById("dayAfterTomorrow").lastElementChild.textContent = weatherInfo.weathers[2] || "データなし";
      } else {
        alert("気温データが取得できませんでした。");
      }
    })
    .catch(error => console.error("Error:", error));
});
