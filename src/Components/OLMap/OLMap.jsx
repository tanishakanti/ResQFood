import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style, Text, Fill, Stroke } from "ol/style";
import Overlay from "ol/Overlay";
import { LineString } from "ol/geom";
import "./OLMap.css";

const OLMap = () => {
  const mapRef = useRef();
  const mapInstance = useRef(null);
  const volunteersSource = useRef(new VectorSource());
  const restaurantsSource = useRef(new VectorSource());
  const routesSource = useRef(new VectorSource());
  const [volunteers, setVolunteers] = useState([]);
  const [restaurants] = useState([
    {
      id: 1,
      name: "Guru Kripa Restaurant",
      location: [72.8311, 19.1334], // Powai
      type: "restaurant"
    },
    {
      id: 2,
      name: "Shiv Sagar Restaurant",
      location: [72.8777, 19.0760], // Matunga
      type: "restaurant"
    },
    {
      id: 3,
      name: "Shalimar Restaurant",
      location: [72.8343, 19.0176], // Bhendi Bazaar
      type: "restaurant"
    }
  ]);
  const [destinations] = useState([
    {
      id: 1,
      name: "Dharavi Community Center",
      location: [72.8489, 19.0400], // Dharavi
      type: "destination"
    },
    {
      id: 2,
      name: "Worli Slum Redevelopment",
      location: [72.8162, 19.0160], // Worli
      type: "destination"
    },
    {
      id: 3,
      name: "Mankhurd Relief Camp",
      location: [72.9302, 19.0506], // Mankhurd
      type: "destination"
    }
  ]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const popupRef = useRef();

  // Initialize volunteers with realistic data
  useEffect(() => {
    const initialVolunteers = [
      {
        id: 1,
        name: "Raj Sharma",
        ngo: "Feeding India",
        location: [72.8311, 19.1334], // Starting at Guru Kripa, Powai
        status: "enroute",
        destination: [72.8489, 19.0400], // Heading to Dharavi
        restaurant: "Guru Kripa Restaurant",
        progress: 0.3,
        lastUpdate: new Date(),
        speed: 0.0005,
        capacity: 50
      },
      {
        id: 2,
        name: "Priya Patel",
        ngo: "Robin Hood Army",
        location: [72.8777, 19.0760], // Starting at Shiv Sagar, Matunga
        status: "loading",
        destination: [72.8162, 19.0160], // Heading to Worli
        restaurant: "Shiv Sagar Restaurant",
        progress: 0,
        lastUpdate: new Date(),
        speed: 0.0006,
        capacity: 40
      },
      {
        id: 3,
        name: "Amit Kumar",
        ngo: "No Food Waste",
        location: [72.8343, 19.0176], // Starting at Shalimar, Bhendi Bazaar
        status: "enroute",
        destination: [72.9302, 19.0506], // Heading to Mankhurd
        restaurant: "Shalimar Restaurant",
        progress: 0.6,
        lastUpdate: new Date(),
        speed: 0.0004,
        capacity: 60
      }
      
    ];
    
    setVolunteers(initialVolunteers);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            crossOrigin: null,
            tilePixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([72.8777, 19.0760]), // Mumbai
        zoom: 11,
      }),
    });

    // Create vector layers
    const volunteersLayer = new VectorLayer({
      source: volunteersSource.current,
    });
    
    const restaurantsLayer = new VectorLayer({
      source: restaurantsSource.current,
    });
    
    const routesLayer = new VectorLayer({
      source: routesSource.current,
      style: new Style({
        stroke: new Stroke({
          color: '#ff4081',
          width: 2,
          lineDash: [5, 5]
        })
      })
    });
    
    mapInstance.current.addLayer(volunteersLayer);
    mapInstance.current.addLayer(restaurantsLayer);
    mapInstance.current.addLayer(routesLayer);

    // Create popup overlay
    const popup = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -40],
    });
    mapInstance.current.addOverlay(popup);

    // Handle map clicks to close popup
    mapInstance.current.on('click', (evt) => {
      const feature = mapInstance.current.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
      if (!feature) {
        popup.setPosition(undefined);
        setSelectedVolunteer(null);
      }
    });

    setTimeout(() => mapInstance.current.updateSize(), 200);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
      }
    };
  }, []);

  // Update restaurant markers
  useEffect(() => {
    if (!restaurantsSource.current) return;

    restaurantsSource.current.clear();

    restaurants.forEach(restaurant => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(restaurant.location)),
        type: 'restaurant',
        data: restaurant
      });

      const style = new Style({
        image: new Icon({
          src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
          scale: 1.2,
          anchor: [0.5, 1],
        }),
        text: new Text({
          text: restaurant.name,
          offsetY: 30,
          font: 'bold 12px sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 3 })
        })
      });

      feature.setStyle(style);
      restaurantsSource.current.addFeature(feature);
    });
  }, [restaurants]);

  // Update volunteer markers and routes
  useEffect(() => {
    if (!volunteersSource.current || !routesSource.current) return;

    volunteersSource.current.clear();
    routesSource.current.clear();

    volunteers.forEach(volunteer => {
      // Create volunteer marker
      const feature = new Feature({
        geometry: new Point(fromLonLat(volunteer.location)),
        type: 'volunteer',
        data: volunteer
      });

      // Style based on status
      const color = volunteer.status === 'enroute' ? 'blue' : 
                   volunteer.status === 'loading' ? 'orange' : 'green';

      const style = new Style({
        image: new Icon({
          src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
          scale: 1.2,
          anchor: [0.5, 1],
        }),
        text: new Text({
          text: volunteer.name,
          offsetY: 30,
          font: 'bold 12px sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({ color: '#fff', width: 3 })
        })
      });

      feature.setStyle(style);
      
      // Add click handler to show popup
      feature.on('click', (evt) => {
        const map = mapInstance.current;
        const overlay = map.getOverlays().getArray().find(o => o.getElement() === popupRef.current);
        overlay.setPosition(fromLonLat(volunteer.location));
        setSelectedVolunteer(volunteer);
      });

      volunteersSource.current.addFeature(feature);

      // Create route line
      if (volunteer.status === 'enroute') {
        const routeLine = new Feature({
          geometry: new LineString([
            fromLonLat(volunteer.location),
            fromLonLat(volunteer.destination)
          ]),
          type: 'route'
        });

        routesSource.current.addFeature(routeLine);
      }
    });
  }, [volunteers]);

  // Simulate volunteer movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVolunteers(prev => prev.map(volunteer => {
        if (volunteer.status === 'loading') {
          // Randomly start enroute after loading
          if (Math.random() > 0.7) {
            return {
              ...volunteer,
              status: 'enroute',
              lastUpdate: new Date()
            };
          }
          return volunteer;
        }

        if (volunteer.status === 'enroute') {
          // Calculate new position along the route
          const newProgress = Math.min(1, volunteer.progress + volunteer.speed);
          const currentLon = volunteer.location[0] + (volunteer.destination[0] - volunteer.location[0]) * volunteer.speed;
          const currentLat = volunteer.location[1] + (volunteer.destination[1] - volunteer.location[1]) * volunteer.speed;
          
          // Check if reached destination
          if (newProgress >= 0.98) {
            return {
              ...volunteer,
              status: 'delivered',
              location: volunteer.destination,
              progress: 1,
              lastUpdate: new Date()
            };
          }
          
          return {
            ...volunteer,
            location: [currentLon, currentLat],
            progress: newProgress,
            lastUpdate: new Date()
          };
        }

        if (volunteer.status === 'delivered') {
          // After delivery, return to restaurant
          if (Math.random() > 0.95) {
            const restaurant = restaurants.find(r => r.name === volunteer.restaurant);
            return {
              ...volunteer,
              status: 'returning',
              destination: restaurant.location,
              lastUpdate: new Date()
            };
          }
          return volunteer;
        }

        if (volunteer.status === 'returning') {
          // Calculate return to restaurant
          const newProgress = Math.min(1, volunteer.progress + volunteer.speed);
          const currentLon = volunteer.location[0] + (volunteer.destination[0] - volunteer.location[0]) * volunteer.speed;
          const currentLat = volunteer.location[1] + (volunteer.destination[1] - volunteer.location[1]) * volunteer.speed;
          
          // Check if reached restaurant
          if (newProgress >= 0.98) {
            return {
              ...volunteer,
              status: 'loading',
              location: volunteer.destination,
              progress: 0,
              lastUpdate: new Date()
            };
          }
          
          return {
            ...volunteer,
            location: [currentLon, currentLat],
            progress: newProgress,
            lastUpdate: new Date()
          };
        }

        return volunteer;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [restaurants]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'loading': return '#ff9800';
      case 'enroute': return '#2196f3';
      case 'delivered': return '#4caf50';
      case 'returning': return '#9c27b0';
      default: return '#000';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
        Mumbai NGO Food Distribution Tracker
      </h1>
      
      <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
        <div style={{ flex: 1, position: 'relative', borderRadius: "12px", overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <div
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
          />
          
          {/* Popup for volunteer details */}
          <div ref={popupRef} className="volunteer-popup" style={{ 
            background: 'white', 
            padding: '15px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            minWidth: '250px',
            display: selectedVolunteer ? 'block' : 'none'
          }}>
            {selectedVolunteer && (
              <>
                <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  {selectedVolunteer.name}
                </h3>
                <p style={{ margin: '6px 0', display: 'flex', alignItems: 'center' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: getStatusColor(selectedVolunteer.status),
                    marginRight: '8px'
                  }}></span>
                  Status: <strong style={{ marginLeft: '4px', textTransform: 'capitalize' }}>
                    {selectedVolunteer.status}
                  </strong>
                </p>
                <p style={{ margin: '6px 0' }}>NGO: <strong>{selectedVolunteer.ngo}</strong></p>
                <p style={{ margin: '6px 0' }}>Meals: <strong>{selectedVolunteer.capacity}</strong></p>
                <p style={{ margin: '6px 0' }}>From: <strong>{selectedVolunteer.restaurant}</strong></p>
                <p style={{ margin: '6px 0' }}>
                  Last update: {selectedVolunteer.lastUpdate.toLocaleTimeString()}
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Side panel */}
        <div style={{ width: '300px', background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <h2 style={{ marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Volunteers</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff9800' }}></span>
              Loading ({volunteers.filter(v => v.status === 'loading').length})
            </h3>
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2196f3' }}></span>
              Enroute ({volunteers.filter(v => v.status === 'enroute').length})
            </h3>
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4caf50' }}></span>
              Delivered ({volunteers.filter(v => v.status === 'delivered').length})
            </h3>
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '8px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#9c27b0' }}></span>
              Returning ({volunteers.filter(v => v.status === 'returning').length})
            </h3>
          </div>
          
          <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Restaurants</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {restaurants.map(restaurant => (
              <li key={restaurant.id} style={{ marginBottom: '8px' }}>
                <strong>{restaurant.name}</strong>
              </li>
            ))}
          </ul>
          
          <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Destinations</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {destinations.map(destination => (
              <li key={destination.id} style={{ marginBottom: '8px' }}>
                <strong>{destination.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>About This Project</h3>
        <p>
          This tracker shows real-time movement of NGO volunteers collecting excess food from restaurants and delivering it to communities in need across Mumbai.
          The system helps reduce food waste and fight hunger by efficiently coordinating food redistribution efforts.
        </p>
      </div>
    </div>
  );
};

export default OLMap;