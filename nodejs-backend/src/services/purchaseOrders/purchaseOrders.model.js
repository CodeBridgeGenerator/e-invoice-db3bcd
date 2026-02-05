
    module.exports = function (app) {
        const modelName = "purchase_orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationID: { type: Schema.Types.ObjectId, ref: "quotations", comment: "Quotation ID, dropdown, false, true, true, true, true, true, true, quotations, quotations, one-to-one, quotationID," },
PODate: { type: Date, comment: "PODate, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
remarks: { type:  String , required: true, comment: "Remarks, p, false, true, true, true, true, true, true, , , , ," },
POAmount: { type:  String , required: true, comment: "POAmount, p, false, true, true, true, true, true, true, , , , ," },

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