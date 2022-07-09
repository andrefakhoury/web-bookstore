const { Book } = require('../models/books');

// GET data
exports.get = (req, res) => {
  Book.find(req.query).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Get data by id in req
exports.getById = (req, res) => {
  const id = req.params.id;
  Book.findById(id).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Post / Create data given in body
exports.post = (req, res) => {
  const book = new Book(req.body);
  book.save().then(result => {
    res.status(201).send(result);
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Replace
exports.put = (req, res) => {
  const id = req.params.id;
  Book.findById(id).then(book => {
    if (book !== null) {
      Book.findByIdAndDelete(book._id).then(() => {
        Book(req.body).save();
        res.status(201).send(req.body);
      });
    } else {
      Book(req.body).save();
      res.status(201).send(req.body);
    }
  }).catch(err => {
    res.status(400).send(err);
  });
};

// Delete id if exists
exports.delete = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id).then(book => {
    if (book) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  });

}