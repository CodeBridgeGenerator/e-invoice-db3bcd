const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("creditNote service", () => {
  let thisService;
  let creditNoteCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("creditNote");

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
    assert.ok(thisService, "Registered the service (creditNote)");
  });

  describe("#create", () => {
    const options = {"creditNoteID":"new value","invoiceID":"aasdfasdfasdfadsfadfa","issueDate":1770257285576,"reason":"new value","amount":"new value"};

    beforeEach(async () => {
      creditNoteCreated = await thisService.create({...options, ...users});
    });

    it("should create a new creditNote", () => {
      assert.strictEqual(creditNoteCreated.creditNoteID, options.creditNoteID);
assert.strictEqual(creditNoteCreated.invoiceID, options.invoiceID);
assert.strictEqual(creditNoteCreated.issueDate, options.issueDate);
assert.strictEqual(creditNoteCreated.reason, options.reason);
assert.strictEqual(creditNoteCreated.amount, options.amount);
    });
  });

  describe("#get", () => {
    it("should retrieve a creditNote by ID", async () => {
      const retrieved = await thisService.findById(creditNoteCreated._id);
      assert.strictEqual(retrieved._id.toString(), creditNoteCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"creditNoteID":"updated value","invoiceID":"345345345345345345345","issueDate":null,"reason":"updated value","amount":"updated value"};

    it("should update an existing creditNote ", async () => {
      const creditNoteUpdated = await thisService.findByIdAndUpdate(
        creditNoteCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(creditNoteUpdated.creditNoteID, options.creditNoteID);
assert.strictEqual(creditNoteUpdated.invoiceID, options.invoiceID);
assert.strictEqual(creditNoteUpdated.issueDate, options.issueDate);
assert.strictEqual(creditNoteUpdated.reason, options.reason);
assert.strictEqual(creditNoteUpdated.amount, options.amount);
    });
  });

  describe("#delete", () => {
    it("should delete a creditNote", async () => {
      const creditNoteDeleted = await thisService.remove(creditNoteCreated._id);
      assert.strictEqual(creditNoteDeleted._id.toString(), creditNoteCreated._id.toString());
    });
  });
});