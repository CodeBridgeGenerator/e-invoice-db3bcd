const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("paymentTerms service", () => {
  let thisService;
  let paymentTermCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("paymentTerms");

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
    assert.ok(thisService, "Registered the service (paymentTerms)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","dueDays":"new value","paymentTermID":"new value","earlyPaymentDiscount":"new value","latePenalty":"new value"};

    beforeEach(async () => {
      paymentTermCreated = await thisService.create({...options, ...users});
    });

    it("should create a new paymentTerm", () => {
      assert.strictEqual(paymentTermCreated.name, options.name);
assert.strictEqual(paymentTermCreated.description, options.description);
assert.strictEqual(paymentTermCreated.dueDays, options.dueDays);
assert.strictEqual(paymentTermCreated.paymentTermID, options.paymentTermID);
assert.strictEqual(paymentTermCreated.earlyPaymentDiscount, options.earlyPaymentDiscount);
assert.strictEqual(paymentTermCreated.latePenalty, options.latePenalty);
    });
  });

  describe("#get", () => {
    it("should retrieve a paymentTerm by ID", async () => {
      const retrieved = await thisService.findById(paymentTermCreated._id);
      assert.strictEqual(retrieved._id.toString(), paymentTermCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value","dueDays":"updated value","paymentTermID":"updated value","earlyPaymentDiscount":"updated value","latePenalty":"updated value"};

    it("should update an existing paymentTerm ", async () => {
      const paymentTermUpdated = await thisService.findByIdAndUpdate(
        paymentTermCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(paymentTermUpdated.name, options.name);
assert.strictEqual(paymentTermUpdated.description, options.description);
assert.strictEqual(paymentTermUpdated.dueDays, options.dueDays);
assert.strictEqual(paymentTermUpdated.paymentTermID, options.paymentTermID);
assert.strictEqual(paymentTermUpdated.earlyPaymentDiscount, options.earlyPaymentDiscount);
assert.strictEqual(paymentTermUpdated.latePenalty, options.latePenalty);
    });
  });

  describe("#delete", () => {
    it("should delete a paymentTerm", async () => {
      const paymentTermDeleted = await thisService.remove(paymentTermCreated._id);
      assert.strictEqual(paymentTermDeleted._id.toString(), paymentTermCreated._id.toString());
    });
  });
});