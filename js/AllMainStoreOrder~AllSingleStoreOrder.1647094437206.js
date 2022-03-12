(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AllMainStoreOrder~AllSingleStoreOrder"],{2725:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal fade bd-example-modal-lg",attrs:{id:"check",tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true","data-backdrop":"static"}},[a("div",{staticClass:"modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered"},[a("VO",{staticClass:"modal-content",attrs:{tag:"section"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.handleSubmit;return[a("div",{staticClass:"modal-body p-0 overflow-hidden"},[a("div",{staticClass:"order-detail row"},[a("div",{staticClass:"info col-sm-12 col-md-3 col-lg-3"},[a("h3",[t._v(t._s(t.customerData.CustomerFullName))]),a("div",[t._v(t._s(t.customerData.CustomerID))]),a("table",[a("tr",[a("td",[a("i",{staticClass:"fas fa-barcode"})]),a("td",[t._v(t._s(t.customerData.TaxID))])]),a("tr",[a("td",[a("i",{staticClass:"fas fa-phone-volume"})]),a("td",[t._v(t._s(t.customerData.Contact))])]),a("tr",[a("td",[a("i",{staticClass:"fas fa-headset"})]),a("td",[t._v(t._s(t.customerData.TEL_NO))])])])]),a("div",{staticClass:"list col-md-9 col-lg-9 col-sm-12"},[a("div",{staticClass:"p-3"},[a("section",{staticClass:"invoice-block line"},[t.IsMainStore?a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票資訊")]),a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.IsHeadquarterInvoice,expression:"sendData.IsHeadquarterInvoice"}],attrs:{type:"radio",name:"in-info"},domProps:{value:!0,checked:t._q(t.sendData.IsHeadquarterInvoice,!0)},on:{change:function(e){return t.$set(t.sendData,"IsHeadquarterInvoice",!0)}}}),a("span",[t._v("1.總店號發票合併")])]),a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.IsHeadquarterInvoice,expression:"sendData.IsHeadquarterInvoice"}],attrs:{type:"radio",name:"in-info"},domProps:{value:!1,checked:t._q(t.sendData.IsHeadquarterInvoice,!1)},on:{change:function(e){return t.$set(t.sendData,"IsHeadquarterInvoice",!1)}}}),a("span",[t._v("2.分店分別寄送")])])])])]):t._e(),a("div",{staticClass:"invoice-detail"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("客戶代碼(總店號)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.CustomerId,expression:"sendData.CustomerId"}],attrs:{type:"text",disabled:"",placeholder:"客戶代碼(總店號)"},domProps:{value:t.sendData.CustomerId},on:{input:function(e){e.target.composing||t.$set(t.sendData,"CustomerId",e.target.value)}}})])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("客戶名稱(總店號)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.CustomerName,expression:"sendData.CustomerName"}],attrs:{type:"text",disabled:"",placeholder:"客戶名稱(總店號)"},domProps:{value:t.sendData.CustomerName},on:{input:function(e){e.target.composing||t.$set(t.sendData,"CustomerName",e.target.value)}}})])]),t.sendData.IsHeadquarterInvoice?[a("VP",{staticClass:"col-sm -12 col-md-6",attrs:{tag:"div",rules:"required",name:"付款方式"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("付款方式")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.NF003},placeholder:"請選擇",valueFormat:"object",options:t.allPayTerm,reduce:function(t){return t.NF002}},on:{input:function(e){return t.getUnitPrice(t.sendData.PayTermCode,"all")}},model:{value:t.sendData.PayTermCode,callback:function(e){t.$set(t.sendData,"PayTermCode",e)},expression:"sendData.PayTermCode"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])]),s[0]?a("span",{staticClass:"small font-weight-bold text-danger"},[t._v(t._s(s[0]))]):t._e()],1)]}}],null,!0)}),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("不開統編")]),a("div",{staticClass:"switchBox"},[a("div",{staticClass:"switchBox_content"},[a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.NotTaxId,expression:"sendData.NotTaxId"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"NotTaxId_Y",name:"NotTaxId",disabled:t.IsTaxIdDisabled},domProps:{value:!0,checked:t._q(t.sendData.NotTaxId,!0)},on:{change:function(e){return t.$set(t.sendData,"NotTaxId",!0)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("是")])]),a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.NotTaxId,expression:"sendData.NotTaxId"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"NotTaxId_N",name:"NotTaxId",disabled:t.IsTaxIdDisabled},domProps:{value:!1,checked:t._q(t.sendData.NotTaxId,!1)},on:{change:function(e){return t.$set(t.sendData,"NotTaxId",!1)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("否")])])])])])]),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:t.sendData.NotTaxId?"":"required",name:"統一編號"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("統一編號")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.TaxId,expression:"sendData.TaxId",modifiers:{trim:!0}}],attrs:{disabled:t.IsTaxIdDisabled,type:"text",placeholder:"統一編號"},domProps:{value:t.sendData.TaxId},on:{input:function(e){e.target.composing||t.$set(t.sendData,"TaxId",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s?a("span",{staticClass:"text-danger font-weight-bold small"},[t._v(t._s(s[0]))]):t._e()])]}}],null,!0)}),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("隨貨附發票")]),a("div",{staticClass:"switchBox"},[a("div",{staticClass:"switchBox_content"},[a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.AttachInvoice,expression:"sendData.AttachInvoice"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"AttachInvoice_Y",name:"AttachInvoice"},domProps:{value:!0,checked:t._q(t.sendData.AttachInvoice,!0)},on:{change:function(e){return t.$set(t.sendData,"AttachInvoice",!0)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("是")])]),a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.AttachInvoice,expression:"sendData.AttachInvoice"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"AttachInvoice_N",name:"AttachInvoice"},domProps:{value:!1,checked:t._q(t.sendData.AttachInvoice,!1)},on:{change:function(e){return t.$set(t.sendData,"AttachInvoice",!1)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("否")])])])])])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票收件人名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.InvoiceName,expression:"sendData.InvoiceName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票收件人名稱",disabled:!t.sendData.AttachInvoice},domProps:{value:t.sendData.InvoiceName},on:{input:function(e){e.target.composing||t.$set(t.sendData,"InvoiceName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票收件人電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.InvoiceContact,expression:"sendData.InvoiceContact",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票收件人電話",disabled:!t.sendData.AttachInvoice},domProps:{value:t.sendData.InvoiceContact},on:{input:function(e){e.target.composing||t.$set(t.sendData,"InvoiceContact",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("VP",{staticClass:"col-sm-12 col-md-12",attrs:{tag:"div",name:"發票地址",rules:t.sendData.AttachInvoice?"required":""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票地址")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.InvoiceAddress,expression:"sendData.InvoiceAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票地址",disabled:!t.sendData.AttachInvoice},domProps:{value:t.sendData.InvoiceAddress},on:{input:function(e){e.target.composing||t.$set(t.sendData,"InvoiceAddress",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()])]}}],null,!0)})]:t._e(),a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("備註")]),a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.Memo,expression:"sendData.Memo",modifiers:{trim:!0}}],staticClass:"pl-2",attrs:{maxlength:"400",placeholder:"備註"},domProps:{value:t.sendData.Memo},on:{input:function(e){e.target.composing||t.$set(t.sendData,"Memo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])],2)])]),t._l(t.branchStore,(function(e,s){return a("section",{key:e.Guid,staticClass:"line"},[a("div",{staticClass:"table-title"},[a("span",[t._v(t._s(e.store.CustomerShtName)+t._s(e.store.CustomerID)+"-訂購品項 ")])]),a("div",{staticClass:"table-wrap"},[a("table",{staticClass:"common-datatable datatable stripe order-column w-100"},[a("thead",[a("tr",[a("th",[t._v("品號")]),a("th"),a("th",[t._v("品名/規格")]),a("th",[t._v("訂購數量")]),a("th",[t._v("寄倉數量")]),a("th",[t._v("性質")]),a("th",[t._v("售價(含稅)")]),a("th",[t._v("小計(含稅)")])])]),a("tbody",t._l(e.productData,(function(e){return a("tr",{key:e.ProductGuid+"-"+e.IsPending+"-"+e.orderQuantity},[a("td",[t._v(t._s(e.ItemNo))]),a("td",[a("span",[e.IsPending&&0===e.warehousesNum?a("span",{staticClass:"pendingOrder d-block mb-1"},[t._v("掛單 ")]):t._e(),e.warehousesNum>0&&!e.IsPending?a("span",{staticClass:"pendingOrder d-block"},[t._v("寄倉 ")]):t._e()])]),a("td",[t._v(" "+t._s(e.ItemName)+" ")]),a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.orderQuantity)+" ")]),a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.warehousesNum)+" ")]),e.IsOrder?a("td",[t._v("訂購")]):a("td",[t._v("公關品項")]),e.IsOrder?a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.UnitPrice)+" ")]):a("td",{staticClass:"text-center"},[t._v("0")]),e.IsOrder?a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.UnitPrice*e.orderQuantity)+" ")]):a("td",{staticClass:"text-center"},[t._v("0")])])})),0)])]),a("div",{staticClass:"row mt-2"},[a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"送貨日期"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("送貨日期")]),a("DatePicker",{staticClass:"w-100 sameOtherField",attrs:{"disabled-date":t.notDeliveryDate,"value-type":"format",format:"YYYY-MM-DD",placeholder:"送貨日期"},model:{value:e.DeliveryDate,callback:function(a){t.$set(e,"DeliveryDate",a)},expression:"branch.DeliveryDate"}}),r?a("span",{staticClass:"font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()],1)]}}],null,!0)}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"送貨時段"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("送貨時段")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.Name},placeholder:"請選擇",valueFormat:"object",options:t.allDeliveryTime},model:{value:e.DeliveryTime,callback:function(a){t.$set(e,"DeliveryTime",a)},expression:"branch.DeliveryTime"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}],null,!0)}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"收貨人名稱"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("收貨人名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.ReceiveName,expression:"branch.ReceiveName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"收貨人名稱"},domProps:{value:e.ReceiveName},on:{input:function(a){a.target.composing||t.$set(e,"ReceiveName",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}],null,!0)}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"連絡電話"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("收貨人連絡電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.ReceiveContact,expression:"branch.ReceiveContact",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"收貨人連絡電話"},domProps:{value:e.ReceiveContact},on:{input:function(a){a.target.composing||t.$set(e,"ReceiveContact",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}],null,!0)}),t.sendData.IsHeadquarterInvoice?t._e():[a("VP",{staticClass:"col-sm -12 col-md-6",attrs:{tag:"div",rules:"required",name:"付款方式"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(r){var i=r.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("付款方式")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.NF003},placeholder:"請選擇",valueFormat:"object",options:t.allPayTerm,reduce:function(t){return t.NF002}},on:{input:function(a){return t.getUnitPrice(e.PayTermCode,s)}},model:{value:e.PayTermCode,callback:function(a){t.$set(e,"PayTermCode",a)},expression:"branch.PayTermCode"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])]),i[0]?a("span",{staticClass:"small font-weight-bold text-danger"},[t._v(t._s(i[0]))]):t._e()],1)]}}],null,!0)}),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("不開統編")]),a("div",{staticClass:"switchBox"},[a("div",{staticClass:"switchBox_content"},[a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.NotTaxId,expression:"branch.NotTaxId"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"NotTaxId_Y",name:"NotTaxId"+(s+1),disabled:t.IsTaxIdDisabled},domProps:{value:!0,checked:t._q(e.NotTaxId,!0)},on:{change:function(a){return t.$set(e,"NotTaxId",!0)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("是")])]),a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.NotTaxId,expression:"branch.NotTaxId"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"NotTaxId_N",name:"NotTaxId"+(s+1),disabled:t.IsTaxIdDisabled},domProps:{value:!1,checked:t._q(e.NotTaxId,!1)},on:{change:function(a){return t.$set(e,"NotTaxId",!1)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("否")])])])])])]),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:e.NotTaxId?"":"required",name:"統一編號"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("統一編號")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.TaxId,expression:"branch.TaxId",modifiers:{trim:!0}}],attrs:{disabled:t.IsTaxIdDisabled,type:"text",placeholder:"統一編號"},domProps:{value:e.TaxId},on:{input:function(a){a.target.composing||t.$set(e,"TaxId",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),r?a("span",{staticClass:"text-danger font-weight-bold small"},[t._v(t._s(r[0]))]):t._e()])]}}],null,!0)}),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("隨貨附發票")]),a("div",{staticClass:"switchBox"},[a("div",{staticClass:"switchBox_content"},[a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.AttachInvoice,expression:"branch.AttachInvoice"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"AttachInvoice_Y"+(s+1),name:"AttachInvoice"+(s+1)},domProps:{value:!0,checked:t._q(e.AttachInvoice,!0)},on:{change:function(a){return t.$set(e,"AttachInvoice",!0)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("是")])]),a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.AttachInvoice,expression:"branch.AttachInvoice"}],staticClass:"switchBox_content_box_input",attrs:{type:"radio",id:"AttachInvoice_N"+(s+1),name:"AttachInvoice"+(s+1)},domProps:{value:!1,checked:t._q(e.AttachInvoice,!1)},on:{change:function(a){return t.$set(e,"AttachInvoice",!1)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("否")])])])])])]),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{tag:"div",rules:e.AttachInvoice?"required":"",name:"發票收件人名稱"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票收件人名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.InvoiceName,expression:"branch.InvoiceName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票收件人名稱",disabled:!e.AttachInvoice},domProps:{value:e.InvoiceName},on:{input:function(a){a.target.composing||t.$set(e,"InvoiceName",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),r?a("span",{staticClass:"text-danger font-weight-bold small"},[t._v(t._s(r[0]))]):t._e()])]}}],null,!0)}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{tag:"div",rules:e.AttachInvoice?"required":"",name:"發票收件人電話"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票收件人電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.InvoiceContact,expression:"branch.InvoiceContact",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票收件人電話",disabled:!e.AttachInvoice},domProps:{value:e.InvoiceContact},on:{input:function(a){a.target.composing||t.$set(e,"InvoiceContact",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),r?a("span",{staticClass:"text-danger font-weight-bold small"},[t._v(t._s(r[0]))]):t._e()])]}}],null,!0)}),a("VP",{staticClass:"col-sm-12 col-md-12",attrs:{tag:"div",name:"發票地址"+(s+1),rules:e.AttachInvoice?"required":""},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票地址")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.InvoiceAddress,expression:"branch.InvoiceAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票地址",disabled:!e.AttachInvoice},domProps:{value:e.InvoiceAddress},on:{input:function(a){a.target.composing||t.$set(e,"InvoiceAddress",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()])]}}],null,!0)})],a("div",{staticClass:"col-sm-12 col-md-4"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("手續費")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Charge.Sales_Fees.Costs,expression:"Charge.Sales_Fees.Costs"}],attrs:{type:"text",placeholder:"手續費",disabled:""},domProps:{value:t.Charge.Sales_Fees.Costs},on:{input:function(e){e.target.composing||t.$set(t.Charge.Sales_Fees,"Costs",e.target.value)}}})])]),a("div",{staticClass:"col-sm-12 col-md-4"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("運費")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.Freight.Sales_Fees.Costs,expression:"Freight.Sales_Fees.Costs"}],attrs:{type:"text",placeholder:"運費",disabled:""},domProps:{value:t.Freight.Sales_Fees.Costs},on:{input:function(e){e.target.composing||t.$set(t.Freight.Sales_Fees,"Costs",e.target.value)}}})])]),0===t.keyData?a("span",[t._v(t._s(t.keyData))]):t._e(),a("div",{staticClass:"col-sm-12 col-md-4"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("分店總計")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.Subtotal,expression:"branch.Subtotal"}],attrs:{type:"text",placeholder:"分店總計",disabled:""},domProps:{value:e.Subtotal},on:{input:function(a){a.target.composing||t.$set(e,"Subtotal",a.target.value)}}})])]),a("VP",{staticClass:"col-sm-12 col-md-12",attrs:{rules:"required",name:"收貨地址"+(s+1)},scopedSlots:t._u([{key:"default",fn:function(s){var r=s.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("收貨地址")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.ReceiveAddress,expression:"branch.ReceiveAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"收貨地址"},domProps:{value:e.ReceiveAddress},on:{input:function(a){a.target.composing||t.$set(e,"ReceiveAddress",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}],null,!0)}),a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("備註")]),a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.Memo,expression:"branch.Memo",modifiers:{trim:!0}}],staticClass:"pl-2",attrs:{placeholder:"備註"},domProps:{value:e.Memo},on:{input:function(a){a.target.composing||t.$set(e,"Memo",a.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])],2)])})),a("div",{staticClass:"invoice-detail"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("總金額")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.total,expression:"total"}],attrs:{type:"text",placeholder:"總金額",disabled:""},domProps:{value:t.total},on:{input:function(e){e.target.composing||(t.total=e.target.value)}}})])])])])],2),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn_cancel",attrs:{type:"reset","data-dismiss":"modal"}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:function(e){return s(t.doubleCheck)}}},[t._v(" 儲存 ")])])])])])]}}])})],1)])},r=[],i=a("5530"),o=a("2909"),n=(a("0481"),a("d81d"),a("159b"),a("498a"),a("7db0"),a("fb6a"),a("a9de")),d=a("2b61"),c={name:"CheckOrder",mixins:[n["a"]],props:{IsMainStore:{type:Boolean,required:!0},DeliveryTime:{type:Array,required:!0},Freight:{type:Object,required:!0},Charge:{type:Object,required:!0},DeliveryDate:{type:Object,required:!0}},data:function(){return{startDate:"",allPayTerm:[],sendData:{SalesId:JSON.parse(localStorage.getItem("saleInfo")).EmpID,SalesName:JSON.parse(localStorage.getItem("saleInfo")).EmpCName,SalesDept:JSON.parse(localStorage.getItem("saleInfo")).DeptCode,IsHeadquarterInvoice:!0,CustomerName:JSON.parse(localStorage.getItem("customer")).CustomerFullName,CustomerId:JSON.parse(localStorage.getItem("customer")).CustomerID,TaxId:JSON.parse(localStorage.getItem("customer")).TaxID,PayTermCode:"",NotTaxId:!1,AttachInvoice:!0,InvoiceName:JSON.parse(localStorage.getItem("customer")).Contact,InvoiceContact:JSON.parse(localStorage.getItem("customer")).TEL_NO,InvoiceAddress:JSON.parse(localStorage.getItem("customer")).InvoiceAddress,Memo:"",Customers:JSON.parse(localStorage.getItem("pendingOrderConcat")),CreateUser:localStorage.getItem("uofUserGuid")},allDeliveryTime:[],total:0,keyData:1}},methods:{getUnitPrice:function(t,e){var a=this,s=this;if(!t)return!1;var r={Products:[]},i="all"===e?s.branchStore.map((function(t){return t.productData})).flat(1/0):s.branchStore[e].productData;i.forEach((function(e){r.Products.push({ProductId:e.ItemNo.trim(),Quantity:e.orderQuantity,PayTermCode:t})})),"all"===e?s.branchStore.forEach((function(t){t.productData.forEach((function(t){t.UnitPrice=10}))})):s.branchStore[e].productData.forEach((function(t){t.UnitPrice=10})),s.$nextTick((function(){s.total=0,a.print("branchStore",s.branchStore),s.branchStore.forEach((function(t){t.productData.forEach((function(e){e.IsPR||(t.Subtotal=e.UnitPrice*e.orderQuantity+s.Charge.Sales_Fees.Costs+s.Freight.Sales_Fees.Costs)})),Object.prototype.hasOwnProperty.call(t,"Subtotal")||(t.Subtotal=s.Charge.Sales_Fees.Costs+s.Freight.Sales_Fees.Costs),s.keyData+=3,s.total+=t.Subtotal})),s.total||(s.total=0)}))},doubleCheck:function(){var t=this;t.sendCheckData()},sendCheckData:function(){var t=this;t.$notify({title:"成功",message:"訂單已送出",type:"success",duration:3500}),t.$router.push({name:"OrderFinish",params:{text:"訂單"}})},notDeliveryDate:function(t){var e=this,a=new Date;return t<new Date(a.getTime()+24*e.DeliveryDate.DateDIF*3600*1e3)}},watch:{DeliveryTime:function(t){t&&(this.allDeliveryTime=Object(o["a"])(t))},pendingOrderConcat:function(t){var e=this;e.sendData.Customers=Object(o["a"])(t)},branchStore:function(t){var e=this;t.length>0&&(e.keyData+=3,"OrderSearch"===localStorage.getItem("routerFrom")&&t.forEach((function(a,s){var r=e.$route.params.checkModalBranchData.find((function(t){return a.store.CustomerID===t.CustomerId}));r.DeliveryTime&&e.DeliveryTime.some((function(t){t.Code===r.DeliveryTime&&(r.DeliveryTime=t)})),t[s]=Object(i["a"])(Object(i["a"])({},a),r)})))},"sendData.IsHeadquarterInvoice":function(t){var e=this;t?e.sendData.PayTermCode=null:e.branchStore.forEach((function(t){t.PayTermCode=null,t.AttachInvoice=!0,t.NotTaxId=!1}))}},computed:{customerData:function(){return JSON.parse(localStorage.getItem("customer"))},branchStore:function(){return this.$store.state.branchStore||JSON.parse(localStorage.getItem("branchStore"))},pendingOrderConcat:function(){return this.$store.state.pendingOrderConcat||JSON.parse(localStorage.getItem("pendingOrderConcat"))},IsTaxIdDisabled:function(){return"B2B"===JSON.parse(localStorage.getItem("customer")).UTypeName.slice(0,3)}},mounted:function(){var t=this;t.$store.commit("ISLOADING",!0),t.allPayTerm=d.Data,Object.prototype.hasOwnProperty.call(t.customerData,"IsHeadquarterInvoice")&&(t.sendData.IsHeadquarterInvoice=t.customerData.IsHeadquarterInvoice),t.$store.commit("ISLOADING",!1)},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}},l=c,u=a("2877"),m=Object(u["a"])(l,s,r,!1,null,null,null);e["a"]=m.exports},"2b61":function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":[{"NF001":"2","NF002":"014-00","NF003":"貨到14天+1電匯","NF004":"1"},{"NF001":"2","NF002":"014-01","NF003":"貨到14天+1-業務親收","NF004":"1"},{"NF001":"2","NF002":"014-02","NF003":"貨到14天+1-寄回支票","NF004":"1"},{"NF001":"2","NF002":"015-00","NF003":"統一客樂得代收","NF004":"1"},{"NF001":"2","NF002":"030-01","NF003":"月結,附回郵乙紙","NF004":"1"},{"NF001":"2","NF002":"030-05","NF003":"月結30天,每月5日電匯","NF004":"2"},{"NF001":"2","NF002":"030-10","NF003":"月結30天,每月10日電匯","NF004":"2"},{"NF001":"2","NF002":"030-25","NF003":"月結30天,每月25日電匯","NF004":"2"},{"NF001":"2","NF002":"030-30","NF003":"月結30天,30日內由業務親收貨款","NF004":"2"},{"NF001":"2","NF002":"045-00","NF003":"月結45天,","NF004":"2"}]}')},"5f2c":function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":{"DeptID":"23100","DateDIF":2}}')},"6e77":function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var s=a("5530"),r=(a("159b"),a("6946")),i={mixins:[r["a"]],data:function(){return{}},methods:{splitRow:function(t){var e=this;t.forEach((function(t,a,s){if(t.IsOrder&&t.IsPR){t.IsPR=!1;var r=JSON.parse(JSON.stringify(t));r.IsPR=!0,r.IsOrder=!1,r.ProductGuid=e.Guid(),s.push(r)}}))},filterTemplate:function(t){var e=this;t.forEach((function(t){if(t.ProductGuid=e.Guid(),t.DetailRows=[{Guid:e.Guid(),IsPending:!t.InvQty,store:null,orderQuantity:1,warehousesNum:0,IsPartialDelivery:!1}],t.IsOrder&&t.IsPR){t.OrderTemplateId=e.orderRows.length,e.orderRows.push(t);var a=Object(s["a"])({},t);a.ProductGuid=e.Guid(),a.DetailRows=[{Guid:e.Guid(),IsPending:!t.InvQty,store:null,orderQuantity:1,warehousesNum:0,IsPartialDelivery:!1}],a.PRTemplateId=e.prRows.length,e.prRows.push(a)}else t.IsOrder&&(t.OrderTemplateId=e.orderRows.length,e.orderRows.push(t)),t.IsPR&&(t.PRTemplateId=e.prRows.length,e.prRows.push(t))}))},OrderSearchFilter:function(t){var e=this;t.forEach((function(t){t.IsOrder&&(t.OrderTemplateId=e.orderRows.length,e.orderRows.push(t)),t.IsPR&&(t.PRTemplateId=e.prRows.length,e.prRows.push(t))}))},getSelfBranch:function(t,e){t.forEach((function(t){e.some((function(e){if(t.store===e.CustomerID)return t.store=e,!0}))}))}}}},a9de:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("159b"),a("d81d"),a("498a");var s=a("ddfc"),r={data:function(){return{branchData:null,filterContented:null,keyData:0}},methods:{concatRow:function(){this.print("將掛單和關聯的合併再一起1","這裡?");var t=this;this.print("store",t.$store.state.branchStore),t.branchData=JSON.parse(JSON.stringify(t.$store.state.branchStore)),t.branchData.forEach((function(t){t.productData=t.productData.map((function(e,a,r){var i,o,n;return!e.IsPending&&(null===e||void 0===e?void 0:e.ProductGuid)===(null===(i=r[a+1])||void 0===i?void 0:i.ProductGuid)&&null!==(o=r[a+1])&&void 0!==o&&o.IsPending?(Object(s["a"])("不是掛單，但下一筆是掛單",e),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:!0,PendingQuantity:r[a+1].orderQuantity,PurchaseQuantity:e.orderQuantity+r[a+1].orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:r[a+1].IsPartialDelivery,PartialDeliveryQuantity:r[a+1].orderQuantity,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum+r[a+1].warehousesNum,UOM:e.UOM}):e.IsPending&&(null===e||void 0===e?void 0:e.ProductGuid)!==(null===(n=r[a+1])||void 0===n?void 0:n.ProductGuid)?(Object(s["a"])("是掛單，但下一筆不是掛單",e),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:!0,PendingQuantity:e.orderQuantity,PurchaseQuantity:e.orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:e.IsPartialDelivery,PartialDeliveryQuantity:e.orderQuantity,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum,UOM:e.UOM}):e.IsPending?(Object(s["a"])("都不是的判斷",e),Object(s["a"])("都不是的判斷結果",t.productData),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:e.IsPending,PendingQuantity:e.orderQuantity,PurchaseQuantity:e.orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:e.IsPartialDelivery,PartialDeliveryQuantity:e.PartialDeliveryQuantity,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum,UOM:e.UOM}):(Object(s["a"])("不是掛單的一般項目",e),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:!1,PendingQuantity:0,PurchaseQuantity:e.orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:e.IsPartialDelivery,PartialDeliveryQuantity:0,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum,UOM:e.UOM})}))}));var e=[];t.branchData.forEach((function(t,a){e.push(JSON.parse(JSON.stringify(t))),e[a].productData=[],t.productData.forEach((function(t,s,r){(0===s||t.ProductGuid!==r[s-1].ProductGuid)&&e[a].productData.push(t)}))})),t.branchData=JSON.parse(JSON.stringify(e)),this.print("branchData",t.branchData),t.branchData=t.branchData.map((function(t){return{CustomerId:t.store.CustomerID,Products:t.productData,Store:t.store}})),this.print("返回結構",t.branchData)},checkInventory:function(){var t=this;t.$store.commit("ISLOADING",!0),t.concatRow(),t.$nextTick((function(){var e=JSON.parse(JSON.stringify(t.branchData));e.forEach((function(t){t.Products=t.Products.map((function(t){return{ProductId:t.ProductId,WhseID:t.WhseID,IsPending:t.IsPending,PendingQuantity:t.PendingQuantity,PurchaseQuantity:t.PurchaseQuantity}}))})),e=e.map((function(t){return{CustomerId:t.CustomerId,Products:t.Products}})),Object(s["a"])("確認訂單格式",e),t.filterContented={Customers:e}}))}}}},c3b6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:t.Guid,staticClass:"modal fade",attrs:{id:t.Guid,tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true","data-backdrop":"static"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered"},[a("VO",{staticClass:"modal-content",attrs:{tag:"section"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.handleSubmit;return[a("div",{staticClass:"modal-header"},[t._v("庫存不足")]),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"table-wrap mt-5"},[a("div",{staticClass:"alert-check"},[t._v(" 商品庫存量為: "),a("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.InvQty))]),t._v(" ，現已訂購量: "),a("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.screenTotal))]),t._v(" ，剩餘數量: "),a("span",{staticClass:"font-weight-bold"},[t._v(t._s(t.totalMinusScreen))]),t._v("。 "),a("div",[t._v(" 請選擇出貨方式: "),a("label",{staticClass:"y-checkbox mr-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.InventoryOrder.Type,expression:"InventoryOrder.Type"}],attrs:{type:"radio",name:"sendtype"},domProps:{value:!0,checked:t._q(t.InventoryOrder.Type,!0)},on:{change:function(e){return t.$set(t.InventoryOrder,"Type",!0)}}}),a("i",{staticClass:"fas fa-check-square"}),t._v(" 分批 ")]),a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.InventoryOrder.Type,expression:"InventoryOrder.Type"}],attrs:{type:"radio",name:"sendtype"},domProps:{value:!1,checked:t._q(t.InventoryOrder.Type,!1)},on:{change:function(e){return t.$set(t.InventoryOrder,"Type",!1)}}}),a("i",{staticClass:"fas fa-check-square"}),t._v(" 整批 ")])])]),t.InventoryOrder.Type?a("VP",{attrs:{name:"出貨數量",rules:"required|integer|min_value:"+Math.abs(t.totalMinusScreen)+"|max_value:"+t.currentValue},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.InventoryOrder.exportQuantity,expression:"InventoryOrder.exportQuantity",modifiers:{number:!0}}],staticClass:"commonInput ml-2 d-block",attrs:{type:"number",placeholder:"請輸入出貨數量",checked:""},domProps:{value:t.InventoryOrder.exportQuantity},on:{input:function(e){e.target.composing||t.$set(t.InventoryOrder,"exportQuantity",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}}),s?a("span",{staticClass:"ml-2 text-danger font-weight-bold small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}],null,!0)}):t._e()],1)]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn_cancel",attrs:{type:"reset","data-dismiss":"modal"},on:{click:function(e){return t.clearContent(!1)}}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:function(e){return s(t.confirmQuantity)}}},[t._v(" 確定 ")])])]}}])})],1)])},r=[],i=(a("a9e3"),{name:"InventoryShortageModal",props:{InvQty:Number,inputType:String,Guid:String,Store:Object,screenTotal:Number,totalMinusScreen:Number,currentValue:Number},data:function(){return{InventoryOrder:{Type:!0,exportQuantity:0},currentType:"訂購",currentIndex:0}},methods:{confirmQuantity:function(){var t=this,e={},a=t.InventoryOrder.Type?t.InventoryOrder.exportQuantity:t.currentValue;e={IsPartialDelivery:t.InventoryOrder.Type,PartialDeliveryQuantity:Number(t.InventoryOrder.exportQuantity),Guid:t.Guid,IsPending:!0,orderQuantity:a,store:t.Store,warehousesNum:0},t.$emit("confirmQuantity",e,t.InventoryOrder.Type,t.currentType),t.clearContent(!0)},clearContent:function(t){var e=this;e.InventoryOrder={Type:!0,exportQuantity:0},t||e.$emit("returnMax",e.Guid),e.$nextTick((function(){var t=e.$refs[e.Guid];$(t).modal("hide")}))}},watch:{inputType:function(t){t&&(this.currentType=t)}},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}}),o=i,n=a("2877"),d=Object(n["a"])(o,s,r,!1,null,null,null);e["a"]=d.exports},d072:function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":[{"Code":"1","Name":"1.早上(09~12點)"},{"Code":"2","Name":"2.中午(12~17點)"},{"Code":"3","Name":"3.下午(17~20點)"},{"Code":"4","Name":"4.不分時段"}]}')}}]);