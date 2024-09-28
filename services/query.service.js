const createQuery = async (collection, object) => {
  try {
    const createRecord = await collection.create(object);
    if (!createRecord) {
      return `Something went wrong while create ${collection.name}`;
    }

    return createRecord;
  } catch (error) {
    console.log("----catch error, er", error);
  }
};

const findOneQuery = async (collection, query) => {
  try {
    const findRecord = await collection.findOne(query);
    if (!findRecord) {
      return `${collection.name} details not found!`;
    }
    return findRecord;
  } catch (error) {
    console.log("------- catch error", error);
    res.status(400).send({ message: "Email or phone is required!" });
  }
};

module.exports = {
  createQuery,
  findOneQuery,
};
