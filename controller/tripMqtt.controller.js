// const { MongoClient } = require('mongodb');
// const express = require('express');
// const app = express();
// const mqtt = require('mqtt');
// const dotenv = require('dotenv');
// dotenv.config({ path: '../.env' });
// //const cookieParser = require("cookie-parser");

// const uri = process.env.MONGODB_URI;
// const dbName = process.env.MONGODB_DB_NAME;

// const client = new MongoClient(uri, { useUnifiedTopology: true });

// async function connectToMongoDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB'); 
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// } 

// connectToMongoDB();

// const getMqttData = () => {
//   // MQTT creds
//   const host = process.env.MQTT_HOST;
//   const port = process.env.MQTT_PORT;
//   const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

//   const connectUrl = `mqtt://${host}:${port}`;

//   // Connect to MQTT server
//   const mqttClient = mqtt.connect(connectUrl, {
//     clientId,
//     clean: true,
//     connectTimeout: 4000,
//     username: process.env.MQTT_USERNAME,
//     password: process.env.MQTT_PASSWORD,
//     reconnectPeriod: 1000,
//   });

//   mqttClient.on('message', async function (topic, message) {
//     try {
//       // Parse the message as JSON
//       const jsonData = JSON.parse(message.toString());

//       // Insert into Trip Summary
//       if (
//         jsonData.device_id !== 'EC0000A' &&
//         jsonData.trip_id !== '' &&
//         jsonData.td.lat !== undefined &&
//         jsonData.td.lat !== '' &&
//         jsonData.td.lng !== undefined &&
//         jsonData.td.lng !== ''
//       ) {
//         const tripSummaryCollection = client.db(dbName).collection('trip_summary');

//         const tripSummaryQuery = {
//           trip_id: jsonData.trip_id,
//         };

//         const tripSummaryData = {
//           trip_id: jsonData.trip_id,
//           user_id: jsonData.user_id,
//           vehicle_id: jsonData.vehicle_id,
//           device_id: jsonData.device_id,
//           trip_start_time: jsonData.timestamp,
//           trip_status: 0,
//           created_at: new Date(),
//         };

//         const tripSummaryOptions = {
//           upsert: true,
//         };

//         await tripSummaryCollection.updateOne(tripSummaryQuery, { $set: tripSummaryData }, tripSummaryOptions);
//         console.log('Trip summary inserted!');
//       }

//       // Insert into Trip Data
//       if (
//         jsonData.device_id !== 'EC0000A' &&
//         jsonData.trip_id !== '' &&
//         jsonData.td.lat !== undefined &&
//         jsonData.td.lat !== '' &&
//         jsonData.td.lng !== undefined &&
//         jsonData.td.lng !== ''
//       ) {
//         const tripDataCollection = client.db(dbName).collection('tripdata');

//         const tripDataQuery = {
//           trip_id: jsonData.trip_id,
//         };

//         const tripData = {
//           trip_id: jsonData.trip_id,
//           device_id: jsonData.device_id,
//           event: jsonData.event,
//           message: jsonData.message,
//           timestamp: jsonData.timestamp,
//           ignition: jsonData.ignition,
//           lat: jsonData.td.lat,
//           lng: jsonData.td.lng,
//           spd: jsonData.td.spd,
//           cpu_load: jsonData.device_health?.cpu_load || null,
//           cpu_temp: jsonData.device_health?.cpu_temp || null,
//           memory: jsonData.device_health?.memory || null,
//           jsonData: JSON.stringify(jsonData),
//         };

//         await tripDataCollection.updateOne(tripDataQuery, { $set: tripData }, { upsert: true });
//         console.log('Inserted into tripdata');
//       }
//     } catch (error) {
//       console.error('Error processing MQTT message:', error);
//     }
//   });
// };

// getMqttData();
