
// mapbox configuration
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYW1hdHRpbyIsImEiOiJjazh1bGh4dDQwY2UxM2ZwYWlpYzlnaWdwIn0.63xKI3WTfdcGNWGDhU_0jw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 1,
    center: [-34.599975, 39.281189]
});

function changeMapDate(dateIndex) {
  var date = [
    {
      label: 'Jan 22, 2020',
      key: '1/22/20'
    },
    {
      label: 'Jan 29, 2020',
      key: '1/29/20'
    },
    {
      label: 'Feb 5 ,2020',
      key: '2/5/20'
    },
    {
      label: 'Feb 12, 2020',
      key: '2/12/20'
    },
    {
      label: 'Feb 26, 2020',
      key: '2/26/20'
    },
    {
    label: 'Mar 4, 2020',
    key: '3/4/20'
    },
    {
    label: 'Mar 11, 2020',
    key: '3/11/20'
  },
  {
    label: 'Mar 18, 2020',
    key: '3/18/20'
  },
  {
    label: 'Mar 25, 2020',
    key: '3/25/20'
  },
  {
    label: 'Apr 1, 2020',
    key: '4/1/20'
  },
  {
    label: 'Apr 7, 2020',
    key: '4/7/20'
  }
  ];
  var currentDate = date[dateIndex];

  document.getElementById('dateLabel').textContent = currentDate.label;

  var property = {
     property: currentDate.key,
     type: 'exponential',
     stops: [
       [0, 0],
       [100000, 30]
     ]
   };
  map.setPaintProperty('datelayer', 'circle-radius', property);
}



// set dataset source
map.on('load', function() {
  map.addSource('covidSource', {
    "type": "geojson",
    "data": covidCasesGeo
  });
// add dataset to map and stylize
  map.addLayer({
          'id': 'datelayer',
          'type': 'circle',
          'source': 'covidSource',
          'paint': {
            'circle-radius': {
               property: '4/7/20',
               type: 'exponential',
               stops: [
                 [0, 0],
                 [100000, 20]
               ]
              },
            'circle-color': 'rgb(255,0,0)',
            'circle-opacity': 0.1,
            'circle-stroke-color': 'rgb(255,0,0)',
            'circle-stroke-width': 1
          }
      });

      document
       .getElementById('slider')
       .addEventListener('input', function(e) {
         var dateIndex = parseInt(e.target.value, 10);
         changeMapDate(dateIndex);
});

});
