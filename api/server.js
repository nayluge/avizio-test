require("dotenv").config();
const express = require("express");
const { createZoomMeeting } = require("./thirdParty/zoomApi");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-meeting", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const meeting = await createZoomMeeting(req.body);
    res.json(meeting);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during the creation of the meeting");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
