import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// import mqtt from "mqtt";
import authRoute from './route/authRoute.js'
import userRoute from "./route/userRoute.js";
import deviceRoute from "./route/deviceRoute.js";
import locationRoute from "./route/locationRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("trust proxy", 1)
// let client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");
// let client = mqtt.connect(
//   `${process.env.MQTT_PROTOCOL}://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}/mqtt`
// );

// const mqttConnect = async () => {
//   await client.on("connect", () => {
//     client.subscribe(process.env.MQTT_TOPIC, (err, granted) => {
//       if (!err) {
//         console.log("no error", err);
//       }
//       console.log(granted);
//     });
//   });
// };

// const mqttReceiveMessage = async () => {
//   await client.on("message", (topic, message) => {
//     // message is Buffer
//     console.log("payload :", message.toString());
//     console.log("topic:", topic);

//     let payload = topic;

//     let regex = /\/([^/]+)$/;
//     let data = payload.match(regex);

//     console.log("data:", data);

//     let id;
//     if (data) {
//       id = data[1];
//       console.log(`id: ${id}`);
//       //   try {
//       //     prisma.widget.update({
//       //       where: { id: id },
//       //       data : {
//       //         value_boolean: message.toString() === 'true' ? true : false
//       //       }
//       //     }).then((data) => {
//       //       console.log(data);
//       //     })
//       //   } catch (error) {
//       //     console.error(error);
//       //   }
//     }
//   });
// };

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://frontend-tracker-app.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser())

app.use(authRoute);
app.use(userRoute);
app.use(deviceRoute);
app.use(locationRoute);

app.listen(port || 3000, () => {
  console.log("listening on port 3000");
  // mqttConnect();
  // mqttReceiveMessage();
});
