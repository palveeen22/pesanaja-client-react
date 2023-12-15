import React, { useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

const Maps = () => {
  const [open, setOpen] = useState(false);
  const position = { lat: -6.32, lng: 106.64 };
  return (
    <APIProvider apiKey="AIzaSyDXDuS3ypAeyjOKfABdALO-dddBi7eKwfM">
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId="a5d6d3e7129a24fc">
          <AdvancedMarker
            position={position}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm here </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default Maps;
