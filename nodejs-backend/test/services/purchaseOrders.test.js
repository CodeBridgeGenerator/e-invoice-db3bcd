const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("purchaseOrders service", () => {
  let thisService;
  let purchaseOrderCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("purchaseOrders");

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
    assert.ok(thisService, "Registered the service (purchaseOrders)");
  });

  describe("#create", () => {
    const options = {"quotationID":"aasdfasdfasdfadsfadfa","PODate":1770257285539,"status":"new value","remarks":"new value","POAmount":"new value"};

    beforeEach(async () => {
      purchaseOrderCreated = await thisService.create({...options, ...users});
    });

    it("should create a new purchaseOrder", () => {
      assert.strictEqual(purchaseOrderCreated.quotationID, options.quotationID);
assert.strictEqual(purchaseOrderCreated.PODate, options.PODate);
assert.strictEqual(purchaseOrderCreated.status, options.status);
assert.strictEqual(purchaseOrderCreated.remarks, options.remarks);
assert.strictEqual(purchaseOrderCreated.POAmount, options.POAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a purchaseOrder by ID", async () => {
      const retrieved = await thisService.findById(purchaseOrderCreated._id);
      assert.strictEqual(retrieved._id.toString(), purchaseOrderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quotationID":"345345345345345345345","PODate":null,"status":"updated value","remarks":"updated value","POAmount":"updated value"};

    it("should update an existing purchaseOrder ", async () => {
      const purchaseOrderUpdated = await thisService.findByIdAndUpdate(
        purchaseOrderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(purchaseOrderUpdated.quotationID, options.quotationID);
assert.strictEqual(purchaseOrderUpdated.PODate, options.PODate);
assert.strictEqual(purchaseOrderUpdated.status, options.status);
assert.strictEqual(purchaseOrderUpdated.remarks, options.remarks);
assert.strictEqual(purchaseOrderUpdated.POAmount, options.POAmount);
    });
  });

  describe("#delete", () => {
    it("should delete a purchaseOrder", async () => {
      const purchaseOrderDeleted = await thisService.remove(purchaseOrderCreated._id);
      assert.strictEqual(purchaseOrderDeleted._id.toString(), purchaseOrderCreated._id.toString());
    });
  });
});