const { db } = require("../configs/firebase.config");

class FirebaseSchema {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);
  }

  async getAll() {
    const snapshot = await this.collection.get();
    const documents = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  }

  async getById(id) {
    const document = await this.collection.doc(id).get();
    if (!document.exists) {
      return null;
    }
    return {
      id: document.id,
      ...document.data(),
    };
  }

  async findOne(key, value) {
    const document = await this.collection.where(key, "==", value).get();
    if (document.size === 0) {
      return null;
    }
    return {
      id: document.docs[0].id,
      ...document.docs[0].data(),
    };
  }

  async create(data) {
    const document = await this.collection.add(data);
    return {
      id: document.id,
      ...data,
    };
  }

  async update(id, data) {
    await this.collection.doc(id).update(data);
    return {
      id,
      ...data,
    };
  }

  async delete(id) {
    await this.collection.doc(id).delete();
  }
}

module.exports = FirebaseSchema;
