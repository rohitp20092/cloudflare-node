const express = require("express");
const http = require("http");
const cors = require("cors");
const faunadb = require("faunadb");
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

app.get("/user", async (req, res) => {
  try {
    const doc = await client.query(
      Get(Ref(Collection("users"), req.params.id))
    );
    res.send(doc);
  } catch (error) {
    console.log(error);
  }
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
