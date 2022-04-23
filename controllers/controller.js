const library = require("../models/book-model");

module.exports = {
  getBooks: (req, res) => {
    library.find({})
      .then((books) => {
        res.render("home", {
          books: books,
        });
      })
      .catch((error) => {
        console.log(`Error fetching books:${error.message}`);
      });
  },
  getabook: (req, res, next) => {
    let id = req.params.booknum;
    console.log(id);

    library
      .findById(id)
      .then((nbook) => {
        res.locals.nbook = nbook;
        console.log(nbook);

        res.render("book", { books: nbook });
      })
      .catch((error) => {
        console.log(`Error fetching book ID : ${error.message}`);
        next(error);
      });
  },
  deletebooks: (req, res) => {
    library
      .find({})
      .then((books) => {
        res.render("delete", {
          books: books,
        });
      })
      .catch((error) => {
        console.log(`Error fetching books:${error.message}`);
      });
  },

  bookcreate: (req, res, next) => {
    let bookParam = {
      name: req.body.name,
      author: req.body.author,
      link: req.body.url,
    };

    library.create(bookParam);
    res.redirect("/home");
  },

  delete: (req, res, next) => {
    let id = req.params.booknum;
    library.findByIdAndRemove(id, (error) => {
      if (error) next(error);
      res.redirect("/home");
    });
  },
};
