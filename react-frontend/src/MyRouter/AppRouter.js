import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

import SingleQuotationsPage from "../components/app_components/QuotationsPage/SingleQuotationsPage";
import QuotationProjectLayoutPage from "../components/app_components/QuotationsPage/QuotationProjectLayoutPage";
import SinglePurchaseOrdersPage from "../components/app_components/PurchaseOrdersPage/SinglePurchaseOrdersPage";
import PurchaseOrderProjectLayoutPage from "../components/app_components/PurchaseOrdersPage/PurchaseOrderProjectLayoutPage";
import SingleInvoicesPage from "../components/app_components/InvoicesPage/SingleInvoicesPage";
import InvoiceProjectLayoutPage from "../components/app_components/InvoicesPage/InvoiceProjectLayoutPage";
import SingleCreditNotePage from "../components/app_components/CreditNotePage/SingleCreditNotePage";
import CreditNoteProjectLayoutPage from "../components/app_components/CreditNotePage/CreditNoteProjectLayoutPage";
import SingleDebitNotePage from "../components/app_components/DebitNotePage/SingleDebitNotePage";
import DebitNoteProjectLayoutPage from "../components/app_components/DebitNotePage/DebitNoteProjectLayoutPage";
import SingleServicesPage from "../components/app_components/ServicesPage/SingleServicesPage";
import ServiceProjectLayoutPage from "../components/app_components/ServicesPage/ServiceProjectLayoutPage";
import SingleReceiptsPage from "../components/app_components/ReceiptsPage/SingleReceiptsPage";
import ReceiptProjectLayoutPage from "../components/app_components/ReceiptsPage/ReceiptProjectLayoutPage";
import SinglePaymentsPage from "../components/app_components/PaymentsPage/SinglePaymentsPage";
import PaymentProjectLayoutPage from "../components/app_components/PaymentsPage/PaymentProjectLayoutPage";
import SinglePaymentTermsPage from "../components/app_components/PaymentTermsPage/SinglePaymentTermsPage";
import PaymentTermProjectLayoutPage from "../components/app_components/PaymentTermsPage/PaymentTermProjectLayoutPage";
import SingleInvoiceItemsPage from "../components/app_components/InvoiceItemsPage/SingleInvoiceItemsPage";
import InvoiceItemProjectLayoutPage from "../components/app_components/InvoiceItemsPage/InvoiceItemProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/quotations/:singleQuotationsId" exact element={<SingleQuotationsPage />} />
<Route path="/quotations" exact element={<QuotationProjectLayoutPage />} />
<Route path="/purchaseOrders/:singlePurchaseOrdersId" exact element={<SinglePurchaseOrdersPage />} />
<Route path="/purchaseOrders" exact element={<PurchaseOrderProjectLayoutPage />} />
<Route path="/invoices/:singleInvoicesId" exact element={<SingleInvoicesPage />} />
<Route path="/invoices" exact element={<InvoiceProjectLayoutPage />} />
<Route path="/creditNote/:singleCreditNoteId" exact element={<SingleCreditNotePage />} />
<Route path="/creditNote" exact element={<CreditNoteProjectLayoutPage />} />
<Route path="/debitNote/:singleDebitNoteId" exact element={<SingleDebitNotePage />} />
<Route path="/debitNote" exact element={<DebitNoteProjectLayoutPage />} />
<Route path="/services/:singleServicesId" exact element={<SingleServicesPage />} />
<Route path="/services" exact element={<ServiceProjectLayoutPage />} />
<Route path="/receipts/:singleReceiptsId" exact element={<SingleReceiptsPage />} />
<Route path="/receipts" exact element={<ReceiptProjectLayoutPage />} />
<Route path="/payments/:singlePaymentsId" exact element={<SinglePaymentsPage />} />
<Route path="/payments" exact element={<PaymentProjectLayoutPage />} />
<Route path="/paymentTerms/:singlePaymentTermsId" exact element={<SinglePaymentTermsPage />} />
<Route path="/paymentTerms" exact element={<PaymentTermProjectLayoutPage />} />
<Route path="/invoiceItems/:singleInvoiceItemsId" exact element={<SingleInvoiceItemsPage />} />
<Route path="/invoiceItems" exact element={<InvoiceItemProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppRouter);
