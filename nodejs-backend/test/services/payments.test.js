const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("payments service", () => {
  let thisService;
  let paymentCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("payments");

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
    assert.ok(thisService, "Registered the service (payments)");
  });

  describe("#create", () => {
    const options = {"paymentID":"new value","paymentMethod":"new value","dateIssued":1770257285628,"totalAmount":"new value","invoiceID":"aasdfasdfasdfadsfadfa","paymentStatus":"new value"};

    beforeEach(async () => {
      paymentCreated = await thisService.create({...options, ...users});
    });

    it("should create a new payment", () => {
      assert.strictEqual(paymentCreated.paymentID, options.paymentID);
assert.strictEqual(paymentCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(paymentCreated.dateIssued, options.dateIssued);
assert.strictEqual(paymentCreated.totalAmount, options.totalAmount);
assert.strictEqual(paymentCreated.invoiceID, options.invoiceID);
assert.strictEqual(paymentCreated.paymentStatus, options.paymentStatus);
    });
  });

  describe("#get", () => {
    it("should retrieve a payment by ID", async () => {
      const retrieved = await thisService.findById(paymentCreated._id);
      assert.strictEqual(retrieved._id.toString(), paymentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"paymentID":"updated value","paymentMethod":"updated value","dateIssued":null,"totalAmount":"updated value","invoiceID":"345345345345345345345","paymentStatus":"updated value"};

    it("should update an existing payment ", async () => {
      const paymentUpdated = await thisService.findByIdAndUpdate(
        paymentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(paymentUpdated.paymentID, options.paymentID);
assert.strictEqual(paymentUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(paymentUpdated.dateIssued, options.dateIssued);
assert.strictEqual(paymentUpdated.totalAmount, options.totalAmount);
assert.strictEqual(paymentUpdated.invoiceID, options.invoiceID);
assert.strictEqual(paymentUpdated.paymentStatus, options.paymentStatus);
    });
  });

  describe("#delete", () => {
    it("should delete a payment", async () => {
      const paymentDeleted = await thisService.remove(paymentCreated._id);
      assert.strictEqual(paymentDeleted._id.toString(), paymentCreated._id.toString());
    });
  });
});