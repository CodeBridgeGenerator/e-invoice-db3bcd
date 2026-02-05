
    module.exports = function (app) {
        const modelName = "receipts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            receiptID: { type:  String , maxLength: 150, index: true, trim: true, comment: "Receipt ID, p, false, true, true, true, true, true, true, , , , ," },
paymentID: { type: Schema.Types.ObjectId, ref: "payments", comment: "Payment ID, dropdown, false, true, true, true, true, true, true, payments, payments, one-to-one, paymentID," },
dateIssued: { type: Date, comment: "Date Issued, p_date, false, true, true, true, true, true, true, , , , ," },
receiptDetails: { type:  String , required: true, comment: "Receipt Details, p, false, true, true, true, true, true, true, , , , ," },
discount: { type:  String , required: true, comment: "Discount, p, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type:  String , required: true, comment: "TotalAmount, p, false, true, true, true, true, true, true, , , , ," },

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