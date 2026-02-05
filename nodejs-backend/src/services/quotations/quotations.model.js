
    module.exports = function (app) {
        const modelName = "quotations";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationID: { type: Number, max: 1000000, comment: "Quotation ID, p_number, false, true, true, true, true, true, true, , , , ," },
customerID: { type: Schema.Types.ObjectId, ref: "companies", comment: "Customer ID, dropdown, false, true, true, true, true, true, true, companies, companies, one-to-one, name," },
quotationDate: { type: Date, comment: "Quotation Date, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type: Number, max: 10000000, comment: "Total Amount, p_number, false, true, true, true, true, true, true, , , , ," },

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