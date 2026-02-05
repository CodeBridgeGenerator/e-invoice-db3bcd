
    module.exports = function (app) {
        const modelName = "payments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            paymentID: { type:  String , required: true, comment: "Payment ID, p, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , required: true, comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },
dateIssued: { type: Date, comment: "Date Issued, p_date, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type:  String , required: true, comment: "TotalAmount, p, false, true, true, true, true, true, true, , , , ," },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices", comment: "InvoiceID, dropdown, false, true, true, true, true, true, true, invoices, invoices, one-to-one, invoiceID," },
paymentStatus: { type:  String , required: true, comment: "Payment Status, p, false, true, true, true, true, true, true, , , , ," },

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