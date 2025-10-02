// CRUD Operations
// Find all books in a specific genre
db.books.find({ genre: "Fantasy" });

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" });

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 12.49 } });

// Delete a book by its title
db.books.deleteOne({ title: "The Catcher in the Rye" });

// Advanced Queries
// Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sorting
db.books.find().sort({ price: 1 }); // ascending
db.books.find().sort({ price: -1 }); // descending

// Pagination: 5 books per page
db.books.find().limit(5).skip(0); // Page 1
db.books.find().limit(5).skip(5); // Page 2

// Aggregation Pipelines
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by decade
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// Indexing
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: -1 });

// Explain query with index
db.books.find({ title: "The Hobbit" }).explain("executionStats");
