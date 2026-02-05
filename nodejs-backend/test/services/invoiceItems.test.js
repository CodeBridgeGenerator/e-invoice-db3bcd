const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("invoiceItems service", () => {
  let thisService;
  let invoiceItemCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("invoiceItems");

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
    assert.ok(thisService, "Registered the service (invoiceItems)");
  });

  describe("#create", () => {
    const options = {"invoiceID":"aasdfasdfasdfadsfadfa","invoiceItems":"aasdfasdfasdfadsfadfa","units":"new value","unitPrice":"new value","totalAmount":"new value"};

    beforeEach(async () => {
      invoiceItemCreated = await thisService.create({...options, ...users});
    });

    it("should create a new invoiceItem", () => {
      assert.strictEqual(invoiceItemCreated.invoiceID, options.invoiceID);
assert.strictEqual(invoiceItemCreated.invoiceItems, options.invoiceItems);
assert.strictEqual(invoiceItemCreated.units, options.units);
assert.strictEqual(invoiceItemCreated.unitPrice, options.unitPrice);
assert.strictEqual(invoiceItemCreated.totalAmount, options.totalAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a invoiceItem by ID", async () => {
      const retrieved = await thisService.findById(invoiceItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), invoiceItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"invoiceID":"345345345345345345345","invoiceItems":"345345345345345345345","units":"updated value","unitPrice":"updated value","totalAmount":"updated value"};

    it("should update an existing invoiceItem ", async () => {
      const invoiceItemUpdated = await thisService.findByIdAndUpdate(
        invoiceItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(invoiceItemUpdated.invoiceID, options.invoiceID);
assert.strictEqual(invoiceItemUpdated.invoiceItems, options.invoiceItems);
assert.strictEqual(invoiceItemUpdated.units, options.units);
assert.strictEqual(invoiceItemUpdated.unitPrice, options.unitPrice);
assert.strictEqual(invoiceItemUpdated.totalAmount, options.totalAmount);
    });
  });

  describe("#delete", () => {
    it("should delete a invoiceItem", async () => {
      const invoiceItemDeleted = await thisService.remove(invoiceItemCreated._id);
      assert.strictEqual(invoiceItemDeleted._id.toString(), invoiceItemCreated._id.toString());
    });
  });
});