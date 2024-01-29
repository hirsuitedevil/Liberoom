/* global H */

import React, { useEffect } from 'react';

const MapComponent = ({ latitude, longitude }) => {
  useEffect(() => {
    // Initialize HERE Map
    const platform = new H.service.Platform({
      apikey: 'quhVrdb2B-bvrDCtO1tp14k3VKC4-6nGCh9BuZUBQTA',
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(
      document.getElementById('map-container'),
      defaultLayers.vector.normal.map,
      {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
      }
    );

    // Add a marker for the specified location
    const svgMarkup =
      '<svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="5" cy="5" r="4" stroke="black" stroke-width="1" fill="red" /></svg>';

    const customIcon = new H.map.Icon(svgMarkup);
    const marker = new H.map.Marker({ lat: latitude, lng: longitude }, { icon: customIcon });
    map.addObject(marker);
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    


    // Clean up resources on component unmount
    return () => {
      map.dispose();
    };
  }, [latitude, longitude]);

  return <div id="map-container" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
