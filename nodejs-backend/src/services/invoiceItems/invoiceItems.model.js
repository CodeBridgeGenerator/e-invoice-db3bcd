
    module.exports = function (app) {
        const modelName = "invoice_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceID: { type: Schema.Types.ObjectId, ref: "invoices", comment: "InvoiceID, dropdown, false, true, true, true, true, true, true, invoices, invoices, one-to-one, invoiceID," },
invoiceItems: { type: Schema.Types.ObjectId, ref: "services", comment: "Invoice Items, dropdown, false, true, true, true, true, true, true, services, services, one-to-one, name," },
units: { type:  String , required: true, comment: "Units, p, false, true, true, true, true, true, true, , , , ," },
unitPrice: { type:  String , required: true, comment: "Unit Price, p, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type:  String , required: true, comment: "Total Amount, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };