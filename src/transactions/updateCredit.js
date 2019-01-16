const database = require("../database");
const Credit = require("../models/credit");
const { cleanClone } = require("../utils");
const mutex = require("../mutex");

function updateCredit(creditModel, conditions, newValue) {
  return creditModel.findOneAndUpdate(conditions, newValue, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  });
}

function updateCreditTransaction(conditions, newValue) {
  const CreditPrimary = Credit();
  const CreditReplica = Credit("replica");

  let oldValue;

  return Promise.resolve(CreditPrimary.findOne(conditions))
    .then(doc => {
      oldValue = doc;
    })
    .then(() => {
      return updateCredit(CreditPrimary, conditions, newValue).then(doc => {
        console.log("Credit updated successfully", doc);
        return doc;
      });
    })
    .then(cleanClone)
    .then(replica => {
      return updateCredit(CreditReplica, conditions, replica).then(doc => {
        console.log("Credit replicated successfully", doc);
        return doc;
      });
    })
    .then(doc => {
      if (doc == null) {
        throw "Credit transaction couldn't be replicated";
      }
      return doc;
    })
    .catch(err => {
      console.log("Error saving credit transaction:", err);
      if (oldValue) {
        oldValue.markModified("amount");
        oldValue.save().then(() => {
          throw err;
        });
      } else {
        throw err;
      }
    });
}

module.exports = function(conditions, newValue, cb) {
  if (database.isReplicaOn()) {
    mutex.lock(function() {
      updateCreditTransaction(conditions, newValue)
      .then(doc => {
        mutex.unlock();
        cb(doc);
      })
      .catch(err => {
        mutex.unlock();
        cb(undefined, err);
      });
    })
  } else {
    mutex.lock(function() {
      updateCredit(Credit(), conditions, newValue)
      .then(doc => {
        console.log("Credit updated successfully", doc);
        mutex.unlock();
        cb(doc);
      })
      .catch(err => {
        mutex.unlock();
        cb(undefined, err);
      });
    });
  }
};
