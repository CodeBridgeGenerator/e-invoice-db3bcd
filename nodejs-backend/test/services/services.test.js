const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("services service", () => {
  let thisService;
  let serviceCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("services");

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
    assert.ok(thisService, "Registered the service (services)");
  });

  describe("#create", () => {
    const options = {"serviceID":"new value","name":"new value","description":"new value","units":"new value","serviceType":"new value","price":"new value"};

    beforeEach(async () => {
      serviceCreated = await thisService.create({...options, ...users});
    });

    it("should create a new service", () => {
      assert.strictEqual(serviceCreated.serviceID, options.serviceID);
assert.strictEqual(serviceCreated.name, options.name);
assert.strictEqual(serviceCreated.description, options.description);
assert.strictEqual(serviceCreated.units, options.units);
assert.strictEqual(serviceCreated.serviceType, options.serviceType);
assert.strictEqual(serviceCreated.price, options.price);
    });
  });

  describe("#get", () => {
    it("should retrieve a service by ID", async () => {
      const retrieved = await thisService.findById(serviceCreated._id);
      assert.strictEqual(retrieved._id.toString(), serviceCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"serviceID":"updated value","name":"updated value","description":"updated value","units":"updated value","serviceType":"updated value","price":"updated value"};

    it("should update an existing service ", async () => {
      const serviceUpdated = await thisService.findByIdAndUpdate(
        serviceCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(serviceUpdated.serviceID, options.serviceID);
assert.strictEqual(serviceUpdated.name, options.name);
assert.strictEqual(serviceUpdated.description, options.description);
assert.strictEqual(serviceUpdated.units, options.units);
assert.strictEqual(serviceUpdated.serviceType, options.serviceType);
assert.strictEqual(serviceUpdated.price, options.price);
    });
  });

  describe("#delete", () => {
    it("should delete a service", async () => {
      const serviceDeleted = await thisService.remove(serviceCreated._id);
      assert.strictEqual(serviceDeleted._id.toString(), serviceCreated._id.toString());
    });
  });
});