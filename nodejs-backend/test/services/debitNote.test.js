const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("debitNote service", () => {
  let thisService;
  let debitNoteCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("debitNote");

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
    assert.ok(thisService, "Registered the service (debitNote)");
  });

  describe("#create", () => {
    const options = {"debitNoteID":"new value","invoiceID":"aasdfasdfasdfadsfadfa","issueDate":1770257285591,"reason":"new value","amount":"new value"};

    beforeEach(async () => {
      debitNoteCreated = await thisService.create({...options, ...users});
    });

    it("should create a new debitNote", () => {
      assert.strictEqual(debitNoteCreated.debitNoteID, options.debitNoteID);
assert.strictEqual(debitNoteCreated.invoiceID, options.invoiceID);
assert.strictEqual(debitNoteCreated.issueDate, options.issueDate);
assert.strictEqual(debitNoteCreated.reason, options.reason);
assert.strictEqual(debitNoteCreated.amount, options.amount);
    });
  });

  describe("#get", () => {
    it("should retrieve a debitNote by ID", async () => {
      const retrieved = await thisService.findById(debitNoteCreated._id);
      assert.strictEqual(retrieved._id.toString(), debitNoteCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"debitNoteID":"updated value","invoiceID":"345345345345345345345","issueDate":null,"reason":"updated value","amount":"updated value"};

    it("should update an existing debitNote ", async () => {
      const debitNoteUpdated = await thisService.findByIdAndUpdate(
        debitNoteCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(debitNoteUpdated.debitNoteID, options.debitNoteID);
assert.strictEqual(debitNoteUpdated.invoiceID, options.invoiceID);
assert.strictEqual(debitNoteUpdated.issueDate, options.issueDate);
assert.strictEqual(debitNoteUpdated.reason, options.reason);
assert.strictEqual(debitNoteUpdated.amount, options.amount);
    });
  });

  describe("#delete", () => {
    it("should delete a debitNote", async () => {
      const debitNoteDeleted = await thisService.remove(debitNoteCreated._id);
      assert.strictEqual(debitNoteDeleted._id.toString(), debitNoteCreated._id.toString());
    });
  });
});