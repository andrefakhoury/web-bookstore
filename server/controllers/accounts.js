const { Account } = require('../models/accounts');

// GET data
exports.get = (req, res) => {
  Account.find(req.query).sort({ _id: -1 }).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Get data by id in req
exports.getById = (req, res) => {
  const id = req.params.id;
  Account.findById(id).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Post / Create data given in body
exports.post = (req, res) => {
  const account = new Account(req.body);
  account.save().then(result => {
    res.status(201).send(result);
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Update
exports.put = (req, res) => {
  const id = req.params.id;
  Account.findById(id).then(account => {
    if (account !== null) {
      Account.findByIdAndDelete(account._id).then(() => {
        Account(req.body).save();
        res.status(201).send(req.body);
      });
    } else {
      Account(req.body).save();
      res.status(201).send(req.body);
    }
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Delete id if exists
exports.delete = (req, res) => {
  const id = req.params.id;
  Account.findByIdAndDelete(id).then(account => {
    if (account) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

}