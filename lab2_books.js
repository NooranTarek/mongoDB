db.booksLib.aggregate([
  {
    $unwind: "$categories"
  },
  {
    $group: {
      _id: "$categories",
      bookNum: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: 1 }
  }
]);
//____________________________________________________
db.booksLib.aggregate([
  {
    $unwind: "$authors"
  },
  {
    $project: {
      title: 1,
      authors: 1,
      pageCount: 1,
    }
  }
]);
//____________________________________________________
db.booksLib.aggregate([
  {
    $addFields: {
      isNewBook: {
        $gte: ["$publishedDate", 2023]
      }
    }
  },
  {
    $limit: 5
  },
  {
    $sort: { _id: 1 }
  }
]);
//____________________________________________________
db.booksLib.aggregate([
  {
    $unwind: "$authors"
  },
  {
    $project: {
      bookDetails: {
        $concat: [
          "$title",
          " by ",
          "$authors"
        ]
      }
    }
  }
]);
//____________________________________________________
db.booksLib.aggregate([
  {
    $sort: { _id: 1 }
  },
  {
    $skip: 5
  }
]);  
//____________________________________________________
db.booksLib.aggregate([
  {
    $project: {
      title: 1,
      publishedDate: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$publishedDate"
        }
      }
    }
  }
]);

  
  
  
  