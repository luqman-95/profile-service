const Profile = require('./model');

// Find a single document by
const getById = (id) => Profile
  .findById(id);

// Create a new document
const create = async (item) => {
    const { _id } = await Profile.create(item);
    return getById(_id);
};

// Find a matched document with the search clause
const findBy = (clause) => Profile
  .findOne(clause);

// Update existing document found by the search clause,
// or create a new one if not found
const upsert = async (clause, item) => {
    const doc = await Profile.findOne(clause);
    
    if (doc === null) {
      return (new Profile(item)).save();
    }
    
    return doc.update(item);
};

module.exports = {
    create,
    findBy,
    upsert
};