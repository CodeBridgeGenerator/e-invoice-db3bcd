const quotations = require("./quotations/quotations.service.js");
const purchaseOrders = require("./purchaseOrders/purchaseOrders.service.js");
const invoices = require("./invoices/invoices.service.js");
const creditNote = require("./creditNote/creditNote.service.js");
const debitNote = require("./debitNote/debitNote.service.js");
const services = require("./services/services.service.js");
const receipts = require("./receipts/receipts.service.js");
const payments = require("./payments/payments.service.js");
const paymentTerms = require("./paymentTerms/paymentTerms.service.js");
const invoiceItems = require("./invoiceItems/invoiceItems.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(quotations);
  app.configure(purchaseOrders);
  app.configure(invoices);
  app.configure(creditNote);
  app.configure(debitNote);
  app.configure(services);
  app.configure(receipts);
  app.configure(payments);
  app.configure(paymentTerms);
  app.configure(invoiceItems);
    // ~cb-add-configure-service-name~
};
