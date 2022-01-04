import React, { useState, useEffect, useRef } from 'react';
import { loadModules } from "esri-loader";


export default function ThreeDMap(props) {
     // create a ref to element to be used as the map's container
  const mapElThreeD = useRef(null);

  // use a side effect to create the map after react has rendered the DOM
  useEffect(
    () => {
      // define the view here so it can be referenced in the clean up function
      let view;
      // the following code is based on this sample:
      // https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html
      // first lazy-load the esri classes
      loadModules(["esri/Map", "esri/views/SceneView"], {
        css: true
      }).then(([Map, SceneView]) => {
        // then we load a web map from an id
        const map = new Map({
            basemap: "topo-vector",
            ground: "world-elevation"
          });        

        // and we show that map in a container
        view = new SceneView({
            container: mapElThreeD.current, // Reference to the DOM node that will contain the view
            map: map // References the map object created in step 3
        });
      });
      return () => {
        // clean up the map view
        if (!!view) {
          view.destroy();
          view = null;
        }
      };
    },
    // only re-load the map if the id has changed
    []
  );
  return <div style={{ height: "100vh" }} ref={mapElThreeD} />;
}