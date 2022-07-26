const express = require("express");
const http = require("http");
const cors = require("cors");
const faunadb = require("faunadb");
var requestIp = require('request-ip');
const {
  Collection,
  Get,
  Create,
  Ref,
} = faunadb.query;

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8443;




const client = new faunadb.Client({
  secret: "fnAEsJ1aU1ACS0G1RGt_-W3ZFXTmGNAXwW__77jb",
});


app.get("https://cloudfare.rohitp200929744.workers.dev/", function (req, res){
  var forwardedIpsStr = req.header('x-forwarded-for');
  var IP = '';

  if (forwardedIpsStr) {
     IP = forwardedIps = forwardedIpsStr.split(',')[0];  
  }
  console.log(IP,"ip address ip address ip address")
});


app.post("/user", async (req, res) => {
 
  
  try {
    const { email, username, password, ipAdd } = req.body;
    const { data } = await client.query(
      Create(Collection("users"), {
        data: { email, username, password, ipAdd },
      })
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.description });
  }
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
