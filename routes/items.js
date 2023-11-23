const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.post("/", async (req, res) => {
  const team = new Item({
    name: req.body.name,
    brand: req.body.brand,
    shop: req.body.shop,
    acronym: req.body.acronym,
    country: req.body.country
  });
  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getItem, async (req, res) => {
  if (req.body != null) {
      res.item.prices.push(req.body);
  }
  try {
      const updatedItem = await res.item.save();
      res.json(updatedItem);
  } catch (err) {
      res.status(400).json({message: err.message});
  }
});

async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannon find item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.item = item;
  next();
}

router.get('/prices', async (req, res)=> {
  try {
    const items = await Item.find();
    let prices = [];
    items.forEach((el) => {
      let lastprice = el.prices.pop();
      let price = {
        acronym: el.acronym,
        price: lastprice.price,
        currency: lastprice.currency
      }
      prices.push(price);
    });
    res.json(prices);
  } catch (err) {
    console.log("ERROR!!!!!!!!!!!!!!ERROR!!!!!!!!  ", err);
    res.status(500).json({ message: "Sorry for party rocking!"});
  }
});
module.exports = router;