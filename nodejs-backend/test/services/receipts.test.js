const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("receipts service", () => {
  let thisService;
  let receiptCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("receipts");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (receipts)");
  });

  describe("#create", () => {
    const options = {"receiptID":"new value","paymentID":"aasdfasdfasdfadsfadfa","dateIssued":1770257285615,"receiptDetails":"new value","discount":"new value","totalAmount":"new value"};

    beforeEach(async () => {
      receiptCreated = await thisService.create({...options, ...users});
    });

    it("should create a new receipt", () => {
      assert.strictEqual(receiptCreated.receiptID, options.receiptID);
assert.strictEqual(receiptCreated.paymentID, options.paymentID);
assert.strictEqual(receiptCreated.dateIssued, options.dateIssued);
assert.strictEqual(receiptCreated.receiptDetails, options.receiptDetails);
assert.strictEqual(receiptCreated.discount, options.discount);
assert.strictEqual(receiptCreated.totalAmount, options.totalAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a receipt by ID", async () => {
      const retrieved = await thisService.findById(receiptCreated._id);
      assert.strictEqual(retrieved._id.toString(), receiptCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"receiptID":"updated value","paymentID":"345345345345345345345","dateIssued":null,"receiptDetails":"updated value","discount":"updated value","totalAmount":"updated value"};

    it("should update an existing receipt ", async () => {
      const receiptUpdated = await thisService.findByIdAndUpdate(
        receiptCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(receiptUpdated.receiptID, options.receiptID);
assert.strictEqual(receiptUpdated.paymentID, options.paymentID);
assert.strictEqual(receiptUpdated.dateIssued, options.dateIssued);
assert.strictEqual(receiptUpdated.receiptDetails, options.receiptDetails);
assert.strictEqual(receiptUpdated.discount, options.discount);
assert.strictEqual(receiptUpdated.totalAmount, options.totalAmount);
    });
  });

  describe("#delete", () => {
    it("should delete a receipt", async () => {
      const receiptDeleted = await thisService.remove(receiptCreated._id);
      assert.strictEqual(receiptDeleted._id.toString(), receiptCreated._id.toString());
    });
  });
});