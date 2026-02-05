const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("invoices service", () => {
  let thisService;
  let invoiceCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("invoices");

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
    assert.ok(thisService, "Registered the service (invoices)");
  });

  describe("#create", () => {
    const options = {"invoiceID":"new value","customerID":"aasdfasdfasdfadsfadfa","invoiceDate":1770257285555,"dueDate":1770257285555,"totalAmount":"new value","status":"new value","paymentTermsID":"aasdfasdfasdfadsfadfa","remarks":"new value"};

    beforeEach(async () => {
      invoiceCreated = await thisService.create({...options, ...users});
    });

    it("should create a new invoice", () => {
      assert.strictEqual(invoiceCreated.invoiceID, options.invoiceID);
assert.strictEqual(invoiceCreated.customerID, options.customerID);
assert.strictEqual(invoiceCreated.invoiceDate, options.invoiceDate);
assert.strictEqual(invoiceCreated.dueDate, options.dueDate);
assert.strictEqual(invoiceCreated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceCreated.status, options.status);
assert.strictEqual(invoiceCreated.paymentTermsID, options.paymentTermsID);
assert.strictEqual(invoiceCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a invoice by ID", async () => {
      const retrieved = await thisService.findById(invoiceCreated._id);
      assert.strictEqual(retrieved._id.toString(), invoiceCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"invoiceID":"updated value","customerID":"345345345345345345345","invoiceDate":null,"dueDate":null,"totalAmount":"updated value","status":"updated value","paymentTermsID":"345345345345345345345","remarks":"updated value"};

    it("should update an existing invoice ", async () => {
      const invoiceUpdated = await thisService.findByIdAndUpdate(
        invoiceCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(invoiceUpdated.invoiceID, options.invoiceID);
assert.strictEqual(invoiceUpdated.customerID, options.customerID);
assert.strictEqual(invoiceUpdated.invoiceDate, options.invoiceDate);
assert.strictEqual(invoiceUpdated.dueDate, options.dueDate);
assert.strictEqual(invoiceUpdated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceUpdated.status, options.status);
assert.strictEqual(invoiceUpdated.paymentTermsID, options.paymentTermsID);
assert.strictEqual(invoiceUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
    it("should delete a invoice", async () => {
      const invoiceDeleted = await thisService.remove(invoiceCreated._id);
      assert.strictEqual(invoiceDeleted._id.toString(), invoiceCreated._id.toString());
    });
  });
});