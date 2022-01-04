import React, { useState, useEffect, useRef } from 'react';
import { loadModules } from "esri-loader";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import { dummyLocations } from '../dummyData';


export default function TwoDMap(props) {

  const [ refreshFlag, setRefreshFlag ] = useState(false)

     // create a ref to element to be used as the map's container
  const mapElTwoD = useRef(null);

  // use a side effect to create the map after react has rendered the DOM
  useEffect(
    () => {

      console.log('querying for location updates')
        var config = {
            method: 'get',
            url: 'http://localhost:1880/samsara/locations',
          };
          axios(config)
          .then(function (response) {
              let allTrucks = response.data.data
              console.log(allTrucks)
              // define the view here so it can be referenced in the clean up function
              let view;
              loadModules([
                "esri/Graphic",
                "esri/layers/GraphicsLayer",
                "esri/Map",
                "esri/views/MapView"], {
                css: true
              }).then(([Graphic, GraphicsLayer, Map, MapView]) => {
        
                // then we load a web map from an id
                const map = new Map({
                    basemap: "topo-vector"
                  });        
        
                // and we show that map in a container
                view = new MapView({
                  map: map,
                  // use the ref as a container
                  container: mapElTwoD.current,
                  center: [-96.09702811373576, 30.40136843546005],
                  zoom: 10
                });
        
                const graphicsLayer = new GraphicsLayer();
        
                // const point = { //Create a point
                //   type: "point",
                //   longitude: -96.09702811373576, //[-96.09702811373576, 30.40136843546005]
                //   latitude: 30.40136843546005
                // };
        
                const simpleMarkerSymbol = {
                  type: "simple-marker",
                  color: [0, 225, 0, .5],  // Orange
                  size: '32px',
                  outline: {
                      color: [0, 0, 0], // White
                      width: 1
                  }
                };
        
                for(let each in allTrucks){
                  let pointGraphic = new Graphic({
                    geometry: { //Create a point
                      type: "point",
                      longitude: allTrucks[each].location.longitude, 
                      latitude: allTrucks[each].location.latitude,
                    },
                    symbol: simpleMarkerSymbol,
                    popupTemplate: {
                      title: allTrucks[each].name,
                      content: "Mark Jackson \n 1558 N LaSalle St, Navasota, Texas 77868"
                    }
                    });
                  graphicsLayer.add(pointGraphic);
                }
        
        
                map.add(graphicsLayer);
        
              });
              return () => {
                // clean up the map view
                if (!!view) {
                  view.destroy();
                  view = null;
                }
              };
          })
          .catch(function (error) {
              console.log(error);
          });
    },
    [refreshFlag]
  );

  //to refresh and recall samsara api
  const refreshLocations = () => {
        
  }

  return (
    <Grid container sx={{ backgroundColor: 'black' }}>
      <Grid item xs={3} sx={{ backgroundColor: 'black', paddingTop: '20px' }}>
          <button onClick={()=>setRefreshFlag(!refreshFlag)}>
            refresh locations
          </button>
        </Grid>
      <Grid item xs={9} sx={{ border: '3px solid', borderColor: 'black', backgroundColor: 'black' }}>
          <div style={{ height: "99vh" }} ref={mapElTwoD} />
      </Grid>
    </Grid>
    );
}

//{"lat":30.40136843546005,"long":-96.09702811373576}

