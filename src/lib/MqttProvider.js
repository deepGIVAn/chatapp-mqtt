import React, { createContext, useContext, useEffect } from "react";
import mqtt from "mqtt";

const MqttContext = createContext();

export const useMqttClient = () => useContext(MqttContext);

const brokerUrl = "mqtt://broker.hivemq.com";

const client = mqtt.connect(brokerUrl);

const topic = "try111";

client.on("connect", async () => {
  client.subscribe(topic);
  client.publish(topic, "Hello");
  setInterval(() => {
    client.publish(topic, "Hiiiii");
  }, 2000);
});

const MqttProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      client.end(); // Disconnect MQTT client
    };
  }, []);

  const value = {
    client,
    topic,
  };

  return <MqttContext.Provider value={value}>{children}</MqttContext.Provider>;
};

export { MqttProvider };
