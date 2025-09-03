import express, { json } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';

const serviceAccount = {
  "type": "service_account",
  "project_id": "mega-udp",
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": "firebase-adminsdk-fbsvc@mega-udp.iam.gserviceaccount.com",
  "client_id": "106910240851425010184",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40mega-udp.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(json());

const db = admin.database();
const udpDataRef = db.ref('/udp-data');

app.post('/get-udp-data', async (req, res) => {
  const {userIdToken} = await req.body;
  if(!userIdToken){
    return res.status(400).send("bad request, DATA is missing..!")
  }
  try{
    const user = await admin.auth().verifyIdToken(userIdToken);
    if(!user){
      return res.status(403).send("NONE authenticated user !, login and try again !")
    }
    if(user.uuid !== null || undefined){
      const allUdpDATA = await udpDataRef.once('value');
      const snapshot = await allUdpDATA.val();
      console.log(snapshot);
      res.status(200).json({snapshot})
    }
  } catch (error){
    res.status(500).send("There was an Error on Our Server..!: ", error)
    console.log("Server Error:", error);
  }
})

app.post('/push-udp-data', async (req, res) => {

  const userIdToken = req.body.userIdToken;
  const udpDATA = req.body.udpDATA;

  if (!udpDATA || !userIdToken) {
    return res.status(400).send("Bad Request: Data is missing.");
  }

  try {
    const user = await admin.auth().verifyIdToken(userIdToken);

    if (user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).send("Forbidden: Only admin can post data.");
    }

    await udpDataRef.push(udpDATA);
    res.status(200).send("Data saved successfully.");

  } catch (error) {
    console.error("Error processing UDP data:", error);
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("The server is listening on Port:", PORT));