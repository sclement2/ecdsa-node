const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "044390cbdf37eadc4e7a64f7b9a561f51c23b22424fd8330919bba7643e8470ca3baa29b94789cabd49cf38998758ff5d4d51b32a3b363605b2a7b84e42c828cc7": 100, //Dan's Wallet
  "045f1730f7955ef68b4bbdc4d4706aa04a3e449a85b10f9840cedded05143da0665a98c2a773c4fa6b7387c9f89bb0f150667b9cd5b20bda5f02560e595b82f9c9": 50, //Alice's Wallet
  "047f5786e44bb900eb6715b34af35040d32f8db9c35d69cd22cee54e5bfa4ffe1c6a0cc1dfd64f4f45ec3b8d3233898900dfed792a9876764628406237d1aab77f": 75, //William's Wallet
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
