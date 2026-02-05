
    module.exports = function (app) {
        const modelName = "credit_note";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            creditNoteID: { type:  String , required: true, comment: "Credit Note ID, p, false, true, true, true, true, true, true, , , , ," },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices", comment: "Invoice Number, dropdown, false, true, true, true, true, true, true, invoices, invoices, one-to-one, invoiceID," },
issueDate: { type: Date, comment: "Issue Date, p_date, false, true, true, true, true, true, true, , , , ," },
reason: { type:  String , required: true, comment: "Reason, p, false, true, true, true, true, true, true, , , , ," },
amount: { type:  String , required: true, comment: "Amount, p, false, true, true, true, true, true, true, , , , ," },

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