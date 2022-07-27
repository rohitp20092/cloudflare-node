const express = require("express");
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
  secret: process.env.FAUNA_SECRET,
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
