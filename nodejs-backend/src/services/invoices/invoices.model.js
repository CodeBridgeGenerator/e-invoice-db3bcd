
    module.exports = function (app) {
        const modelName = "invoices";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceID: { type:  String , required: true, comment: "Invoice Number, p, false, true, true, true, true, true, true, , , , ," },
customerID: { type: Schema.Types.ObjectId, ref: "companies", comment: " Customer ID, dropdown, false, true, true, true, true, true, true, companies, companies, one-to-one, name," },
invoiceDate: { type: Date, comment: "Invoice Date, p_date, false, true, true, true, true, true, true, , , , ," },
dueDate: { type: Date, comment: " Due Date, p_date, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type:  String , required: true, comment: "Total Amount, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
paymentTermsID: { type: Schema.Types.ObjectId, ref: "payment_terms", comment: "Payment Terms ID, dropdown, false, true, true, true, true, true, true, paymentTerms, payment_terms, one-to-one, paymentTermID," },
remarks: { type:  String , required: true, comment: "Remarks, p, false, true, true, true, true, true, true, , , , ," },

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