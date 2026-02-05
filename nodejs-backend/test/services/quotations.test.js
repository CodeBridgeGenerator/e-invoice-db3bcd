const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("quotations service", () => {
  let thisService;
  let quotationCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("quotations");

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
    assert.ok(thisService, "Registered the service (quotations)");
  });

  describe("#create", () => {
    const options = {"quotationID":23,"customerID":"aasdfasdfasdfadsfadfa","quotationDate":1770257285523,"status":"new value","totalAmount":23};

    beforeEach(async () => {
      quotationCreated = await thisService.create({...options, ...users});
    });

    it("should create a new quotation", () => {
      assert.strictEqual(quotationCreated.quotationID, options.quotationID);
assert.strictEqual(quotationCreated.customerID, options.customerID);
assert.strictEqual(quotationCreated.quotationDate, options.quotationDate);
assert.strictEqual(quotationCreated.status, options.status);
assert.strictEqual(quotationCreated.totalAmount, options.totalAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a quotation by ID", async () => {
      const retrieved = await thisService.findById(quotationCreated._id);
      assert.strictEqual(retrieved._id.toString(), quotationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quotationID":100,"customerID":"345345345345345345345","quotationDate":null,"status":"updated value","totalAmount":100};

    it("should update an existing quotation ", async () => {
      const quotationUpdated = await thisService.findByIdAndUpdate(
        quotationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(quotationUpdated.quotationID, options.quotationID);
assert.strictEqual(quotationUpdated.customerID, options.customerID);
assert.strictEqual(quotationUpdated.quotationDate, options.quotationDate);
assert.strictEqual(quotationUpdated.status, options.status);
assert.strictEqual(quotationUpdated.totalAmount, options.totalAmount);
    });
  });

  describe("#delete", () => {
    it("should delete a quotation", async () => {
      const quotationDeleted = await thisService.remove(quotationCreated._id);
      assert.strictEqual(quotationDeleted._id.toString(), quotationCreated._id.toString());
    });
  });
});