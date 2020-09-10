const char webpage[] PROGMEM = R"=====(
<!doctype html>
<html>

<head>
  <title>Green House</title>
  
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="https://cdn.rawgit.com/Mikhus/canvas-gauges/gh-pages/download/2.1.5/all/gauge.min.js"></script>
  
</head>

<body>
  <div >
    <br>
    <b>Green hose temp</b>
    <div class="alert alert-primary" role="alert">
      A simple primary alert—check it out!
    </div>
    
    <br><br>

  </div>

  <div class="row"> 
    <div class="col-md-2 card"> <!-- 1 temp -->
    
    <canvas id="tempGauge" data-type="linear-gauge"
        data-width="160"
        data-height="450"
        data-border-radius="20"
        data-borders="0"
        data-bar-stroke-width="0"
        data-minor-ticks="20"
        data-animation-rule="cycle"
        data-animation-duration="1000"
        data-major-ticks="22,24,26,28,30,32,34,36,38,40"
        data-title="Temperature"
        data-min-value="20"
        data-max-value="40"
        data-units="°C"
        data-color-value-box-shadow="false"
        data-animated-value="true"
    ></canvas>
    
    </div>
    
    <div class="col-md-2"> <!-- 4 Tank Level -->
    
    <canvas id="tankGauge" data-type="linear-gauge"
        data-width="160"
        data-height="450"
        data-border-radius="20"
        data-borders="0"
        data-bar-begin-circle="false"
        data-title="Tank Level"
        data-units="Level %"
        data-color-units="#f00"
        data-minor-ticks="10"
        data-major-ticks="0,10,20,30,40,50,60,70,80,90,100"
        data-tick-side="right"
        data-number-side="right"
        data-needle-side="right"
        data-animation-rule="bounce"
        data-animation-duration="750"
        data-bar-stroke-width="5"
        data-value-box-border-radius="0"
        data-value-text-shadow="false"
    ></canvas>
    </div>
    
    <div class="col-md-4 card" > 
    
    
      <!-- 2 LUX -->
      
      
        <canvas id="luxGauge" data-type="radial-gauge"
        data-width="400"
        data-height="400"
        data-units="LUX"
        data-title="false"
        data-min-value="0"
        data-max-value="150000"
        data-animate-on-init="true"
        data-minor-ticks="10"
        data-major-ticks="0,15000,30000,45000,60000,75000,90000,105000,120000,135000,150000"
        data-stroke-ticks="true"
        data-color-plate="#222"
        data-color-major-ticks="#f5f5f5"
        data-color-minor-ticks="#ddd"
        data-color-title="#fff"
        data-color-units="#ccc"
        data-color-numbers="#eee"
        data-color-needle-start="rgba(240, 128, 128, 1)"
        data-color-needle-end="rgba(255, 160, 122, .9)"
        data-value-box="true"
        data-font-value="Repetition"
        data-font-numbers="Repetition"
        data-animated-value="true"
        data-borders="false"
        data-border-shadow-width="0"
        data-needle-type="arrow"
        data-needle-width="2"
        data-needle-circle-size="7"
        data-needle-circle-outer="true"
        data-needle-circle-inner="false"
        data-animation-duration="1500"
        data-animation-rule="linear"
        data-ticks-angle="250"
        data-start-angle="55"
        data-color-needle-shadow-down="#333"
        data-value-box-width="45"
        ></canvas>
    
    </div>
    
    <!-- 3 Soil -->
    <div class="col-md-4">

      <canvas id="soilGauge" data-type="radial-gauge"
      data-width="400"
      data-height="400"
      data-units="Soil moisture"
      data-title="false"
      data-animate-on-init="true"
      data-animated-value="true"
      data-min-value="0"
      data-max-value="100"
      data-major-ticks="0,10,20,30,40,50,60,70,80,90,100"
      data-minor-ticks="2"
      data-stroke-ticks="false"
      data-highlights='[
        { "from": 300, "to": 700, "color": "rgba(0,255,0,0.25)" },
        { "from": 700, "to": 800, "color": "rgba(255,30,0,0.25)" },
        
      ]'
      data-color-plate="#222"
      data-color-major-ticks="#f5f5f5"
      data-color-minor-ticks="#ddd"
      data-color-title="#fff"
      data-color-units="#ccc"
      data-color-numbers="#eee"
      data-color-needle-start="rgba(240, 128, 128, 1)"
      data-color-needle-end="rgba(255, 160, 122, .9)"
      data-value-box="true"
      data-animation-rule="bounce"
      data-animation-duration="500"
      data-border-outer-width="3"
      data-border-middle-width="3"
      data-border-inner-width="3"
      ></canvas>

    </div>
    
  </div>
  
  <div class="row"> 
  </div>
  
  
  <script>
    $( document ).ready(function() {
      console.log( "ready!" );
      //Ajax script to get ADC voltage at every 1 Second
      setInterval(getData, 1000);
    })

  
    //-----------------------
    function getData() {
      var xhttp = new XMLHttpRequest();
      xhttp.responseType = "json";
      xhttp.onreadystatechange = function() {
        
      if (this.readyState == 4 && this.status == 200) {
       var data = this.response; 
       console.log('data : '+data);
       if(data == null){
        return;
      }
       
       console.log("tankLevel : "+data.tankLevel);
       console.log("is number : " +  (typeof temparature == 'number'));
      
        if((typeof data.tankLevel == 'number')) {
          tempgauge = document.gauges.get('tempGauge');
          tempgauge.value = data.tempOutEnv;
          
          tankgauge = document.gauges.get('tankGauge');
          tankgauge.value = data.tankLevel;
          
          luxgauge = document.gauges.get('luxGauge'); 
          luxgauge.value = data.luxLevel;
          
          soilGauge = document.gauges.get('soilGauge');
          soilGauge.value = data.soilMoisture;
        }

        //gauge.value

      }
      };
      xhttp.open("GET", "/getSensorsData", true); //Handle readADC server on ESP8266
      xhttp.send();
    }
    //-------------------------
  </script>
</body>

</html>

)=====";
