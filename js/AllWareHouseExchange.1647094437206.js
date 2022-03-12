(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AllWareHouseExchange"],{ac85:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",{staticClass:"common-datatable datatable stripe order-column w-100"},[t._m(0),a("tbody",{staticClass:"line"},t._l(t.confirmProduct,(function(e){return a("tr",{key:e.ProductId},[a("td",[t._v(t._s(e.ProductId))]),a("td",{staticClass:"tdShort"},[t._v(" "+t._s(e.ProductName)+"/"+t._s(e.Specification)+" ")]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UOM))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.OrderQuantity))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.PickableQuantity))]),a("td",{staticClass:"text-center"},[a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.IsConfirm,expression:"product.IsConfirm"}],attrs:{disabled:"",type:"checkbox"},domProps:{checked:Array.isArray(e.IsConfirm)?t._i(e.IsConfirm,null)>-1:e.IsConfirm},on:{change:function(a){var s=e.IsConfirm,n=a.target,r=!!n.checked;if(Array.isArray(s)){var c=null,o=t._i(s,c);n.checked?o<0&&t.$set(e,"IsConfirm",s.concat([c])):o>-1&&t.$set(e,"IsConfirm",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(e,"IsConfirm",r)}}}),a("i",{staticClass:"fas fa-check-square text-secondary"})])])])})),0),a("tbody",t._l(t.tempProduct,(function(e){return a("tr",{key:e.ProductId},[a("td",[t._v(t._s(e.ProductId))]),a("td",[t._v(t._s(e.ProductName)+"/"+t._s(e.Specification))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UOM))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.OrderQuantity))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.PickableQuantity))]),a("td",{staticClass:"text-center"},[a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.IsConfirm,expression:"product.IsConfirm"}],attrs:{name:"IsConfirm",type:"checkbox"},domProps:{checked:Array.isArray(e.IsConfirm)?t._i(e.IsConfirm,null)>-1:e.IsConfirm},on:{change:function(a){var s=e.IsConfirm,n=a.target,r=!!n.checked;if(Array.isArray(s)){var c=null,o=t._i(s,c);n.checked?o<0&&t.$set(e,"IsConfirm",s.concat([c])):o>-1&&t.$set(e,"IsConfirm",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(e,"IsConfirm",r)}}}),a("i",{staticClass:"fas fa-check-square"})])])])})),0)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("品號")]),a("th",[t._v("品名/規格")]),a("th",{staticClass:"text-center"},[t._v("單位")]),a("th",{staticClass:"text-center"},[t._v("寄倉數量")]),a("th",{staticClass:"text-center"},[t._v("可取貨數量")]),a("th",{staticClass:"text-center"},[t._v("選擇產品")])])])}],r={name:"PickUpModalTemplate",props:{tempProduct:{type:Array,required:!0},confirmProduct:{type:Array}}},c=r,o=a("2877"),i=Object(o["a"])(c,s,n,!1,null,null,null);e["a"]=i.exports},d9c4:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",[a("div",{staticClass:"table-title"},[a("span",[t._v("取貨品項")]),a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:function(e){return t.openNewProduct("pickup")}}},[t._v(" 新增品項 ")])]),t.pickupRows.length>0?a("section",{staticClass:"mb-3"},[a("PickUpTemplate",{key:t.keyData,attrs:{pickupRows:t.pickupRows,isDisabled:!1},on:{removeTemplate:t.removeProduct,getPickupData:t.getPickupData}})],1):a("section",{staticClass:"pl-2 mb-2"},[t._v("暫無取貨品項...")]),a("div",{staticClass:"table-title"},[a("span",[t._v("換購品項")]),a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:function(e){return t.openNewProduct("exchange")}}},[t._v(" 新增品項 ")])]),t.exchangeRows.length>0?a("section",{staticClass:"mb-3"},[a("ExchangeTemplate",{key:2*t.keyData,attrs:{isDisabled:!1,exchangeRows:t.exchangeRows},on:{getExchangeData:t.getExchangeData}})],1):a("section",{staticClass:"pl-2 mb-2"},[t._v("暫無換購品項...")]),a("div",{staticClass:"result-wrap"},[a("div",{staticClass:"item"},[t._v(" 取貨總品項 "),a("span",[t._v(t._s(t.allPickupQTY))])]),a("div",{staticClass:"item"},[t._v(" 取貨總金額 "),a("span",[t._v(t._s(t.allPickupPrice))])]),a("div",{staticClass:"item"},[t._v(" 換貨總品項 "),a("span",[t._v(t._s(t.allExchangeQTY))])]),a("div",{staticClass:"item"},[t._v(" 換貨總金額 "),a("span",[t._v(t._s(t.allExchangePrice))])]),a("div",{staticClass:"amount"},[t._v(" 總計差額 "),a("span",[t._v(t._s(t.difference))])]),a("button",{staticClass:"btn btn_info",attrs:{type:"button"},on:{click:t.openCheck}},[t._v(" 確認換貨 ")])]),a("AfterSaleModal",{ref:"AfterSaleModal",attrs:{customer:t.customer,NoWarehouse:!0},on:{searchData:t.searchData,removeProduct:t.removeProduct,sendData:t.sendData}},["pickup"===t.currentTable?a("PickupTable",{attrs:{slot:"table",tempProduct:t.tempProduct,confirmProduct:t.pickupRows},slot:"table"}):t._e(),"exchange"===t.currentTable?a("ExchangeTable",{attrs:{slot:"table",tempProduct:t.tempExchangeProduct,confirmProduct:t.exchangeRows},slot:"table"}):t._e()],1),a("Check",{on:{clickSave:function(e){return t.checkInventory("sendOrder")}}},[a("PickUpTemplate",{key:t.keyData,attrs:{slot:"orderTemplate",pickupRows:t.pickupRows,isDisabled:!0},slot:"orderTemplate"}),a("ExchangeTemplate",{key:2*t.keyData,attrs:{slot:"exchangeTemplate",isDisabled:!0,exchangeRows:t.exchangeRows},slot:"exchangeTemplate"}),a("CheckReceipt",{attrs:{slot:"other_1",allPickupPrice:t.allPickupPrice,allReturnReason:t.allReturnReason,customer:t.customer},on:{getOther:t.getOther1},slot:"other_1"}),a("CheckPayInfo",{attrs:{slot:"other_2",allExchangePrice:t.allExchangePrice,difference:t.difference,allReturnReason:t.allReturnReason,allPayTerm:t.allPayTerm,customer:t.customer},on:{getOther:t.getOther2},slot:"other_2"})],1)],1)},n=[],r=a("5530"),c=(a("99af"),a("4de4"),a("d81d"),a("498a"),a("159b"),a("a9e3"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{key:t.keyData,staticClass:"table-wrap mb-3"},[a("table",{staticClass:"w-100 common-datatable datatable stripe order-column"},[a("thead",[a("tr",{staticClass:"text-center"},[a("th",[t._v("品號")]),a("th",[t._v("品名/規格")]),a("th",[t._v("寄倉數量")]),t.isDisabled?t._e():a("th",[t._v("可取貨數量")]),a("th",[t._v("取貨數量")]),t.isDisabled?t._e():a("th")])]),a("tbody",t._l(t.allProduct,(function(e,s){return a("tr",{key:""+e.Guid},[a("td",[t._v(t._s(e.ProductId))]),a("td",[t._v(t._s(e.ProductName)+"/"+t._s(e.Specification))]),a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.OrderQuantity)+" ")]),t.isDisabled?t._e():a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.PickableQuantity)+" ")]),a("VP",{attrs:{tag:"td",name:"需兌換的數量",rules:"max_value:"+e.PickableQuantity+"|min_value:1"}},[a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cardQuantity,expression:"product.cardQuantity",modifiers:{number:!0}}],staticClass:"w-100",attrs:{type:"number",max:"999",min:"1",placeholder:"請輸入數量",disabled:t.isDisabled},domProps:{value:e.cardQuantity},on:{keyup:function(a){return t.checkQuantity(e)},change:function(a){return t.checkQuantity(e)},input:function(a){a.target.composing||t.$set(e,"cardQuantity",t._n(a.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t.isDisabled?t._e():a("td",[a("button",{staticClass:"btn btn_danger",attrs:{type:"button"},on:{click:function(e){return t.delItem(s)}}},[t._v(" 移除 ")])])],1)})),0)])])}),o=[],i=(a("a434"),{name:"PickupTemplate_WareHouseExchange",props:{pickupRows:{type:Array,required:!0},isDisabled:{type:Boolean,required:!0}},data:function(){return{allProduct:[],currentObj:{},keyData:1}},methods:{checkQuantity:function(t){var e=this;e.currentObj=Object(r["a"])({},t),e.currentObj.cardQuantity>e.currentObj.PickableQuantity&&(t.cardQuantity=e.currentObj.PickableQuantity,e.$notify({title:"提示",message:"取貨數量不得大於可取貨數量",type:"warning",duration:3500})),e.$emit("getPickupData")},delItem:function(t){var e=this;e.allProduct.splice(t,1),e.$store.commit("SUREPRODUCT",e.allProduct)}},watch:{pickupRows:function(t){var e=this;e.allProduct=t}},mounted:function(){var t=this;t.allProduct=t.pickupRows},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}}),l=i,d=a("2877"),u=Object(d["a"])(l,c,o,!1,null,null,null),m=u.exports,p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{key:t.keyData,staticClass:"table-wrap mb-3"},[a("table",{staticClass:"w-100 common-datatable datatable stripe order-column"},[a("thead",[a("tr",{staticClass:"text-center"},[a("th",[t._v("品號")]),a("th",{staticClass:"tdShort"},[t._v("品名/規格")]),a("th",[t._v("庫存量")]),a("th",[t._v("換貨數量")]),a("th",[t._v("單價售價(含稅)")]),a("th",[t._v("小計(含稅)")]),t.isDisabled?t._e():a("th")])]),a("tbody",t._l(t.allProduct,(function(e,s){return a("tr",{key:""+e.Guid},[a("td",[t._v(t._s(e.ItemNo))]),a("td",{staticClass:"tdShort"},[t._v(" "+t._s(e.ItemName)+"/"+t._s(e.Specification)+" ")]),a("td",{staticClass:"text-center"},[t._v(t._s(e.InvQty))]),a("VP",{attrs:{tag:"td",name:"換貨數量",rules:"max_value:999|min_value:1|required"},scopedSlots:t._u([{key:"default",fn:function(s){var n=s.errors;return[a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cardQuantity,expression:"product.cardQuantity",modifiers:{number:!0}}],staticClass:"w-100",attrs:{type:"number",max:"999",disabled:t.isDisabled,placeholder:"請輸入數量"},domProps:{value:e.cardQuantity},on:{keyup:function(a){return t.checkQuantity(e)},change:function(a){return t.checkQuantity(e)},input:function(a){a.target.composing||t.$set(e,"cardQuantity",t._n(a.target.value))},blur:function(e){return t.$forceUpdate()}}}),n?a("span",{staticClass:"text-danger small font-weight-bold"},[t._v(t._s(n[0]))]):t._e()]}}],null,!0)}),a("td",{staticClass:"text-center"},[t._v(t._s(e.UnitPrice))]),a("td",{staticClass:"text-center"},[t._v(" "+t._s(e.cardQuantity*e.UnitPrice||0)+" ")]),t.isDisabled?t._e():a("td",[a("button",{staticClass:"btn btn_danger",attrs:{type:"button"},on:{click:function(e){return t.delItem(s)}}},[t._v(" 移除 ")])])],1)})),0)])])},v=[],h={name:"ExchangeTemplateExchange",props:{exchangeRows:{type:Array,required:!0},isDisabled:{type:Boolean,required:!0}},data:function(){return{allProduct:[],currentObj:{},keyData:1}},methods:{checkQuantity:function(t){var e=this;e.currentObj=Object(r["a"])({},t),e.currentObj.cardQuantity>e.currentObj.InvQty&&(t.cardQuantity=e.currentObj.InvQty,e.$notify({title:"提示",message:"換購數量不得大於庫存量",type:"warning",duration:3500})),e.$emit("getExchangeData")},delItem:function(t){var e=this;e.allProduct.splice(t,1),e.$emit("getExchangeData")}},watch:{exchangeRows:function(t){var e=this;e.allProduct=t}},mounted:function(){var t=this;t.allProduct=t.exchangeRows},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}},f=h,_=Object(d["a"])(f,p,v,!1,null,null,null),g=_.exports,x=a("5214"),I=a("ac85"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",{staticClass:"common-datatable datatable stripe order-column w-100"},[t._m(0),a("tbody",{staticClass:"line"},t._l(t.confirmProduct,(function(e){return a("tr",{key:e.ProductGuid},[a("td",[t._v(t._s(e.ItemNo))]),a("td",[t._v(t._s(e.ItemName)+"/"+t._s(e.Specification))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UOM))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.InvQty))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UnitPrice))]),a("td",{staticClass:"text-center"},[a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.IsConfirm,expression:"product.IsConfirm"}],attrs:{disabled:"",type:"checkbox"},domProps:{checked:Array.isArray(e.IsConfirm)?t._i(e.IsConfirm,null)>-1:e.IsConfirm},on:{change:function(a){var s=e.IsConfirm,n=a.target,r=!!n.checked;if(Array.isArray(s)){var c=null,o=t._i(s,c);n.checked?o<0&&t.$set(e,"IsConfirm",s.concat([c])):o>-1&&t.$set(e,"IsConfirm",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(e,"IsConfirm",r)}}}),a("i",{staticClass:"fas fa-check-square text-secondary"})])])])})),0),a("tbody",t._l(t.tempProduct,(function(e){return a("tr",{key:e.ProductGuid},[a("td",[t._v(t._s(e.ItemNo))]),a("td",[t._v(t._s(e.ItemName)+"/"+t._s(e.Specification))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UOM))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.InvQty))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UnitPrice))]),a("td",{staticClass:"text-center"},[a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.IsConfirm,expression:"product.IsConfirm"}],attrs:{name:"IsConfirm",type:"checkbox"},domProps:{checked:Array.isArray(e.IsConfirm)?t._i(e.IsConfirm,null)>-1:e.IsConfirm},on:{change:function(a){var s=e.IsConfirm,n=a.target,r=!!n.checked;if(Array.isArray(s)){var c=null,o=t._i(s,c);n.checked?o<0&&t.$set(e,"IsConfirm",s.concat([c])):o>-1&&t.$set(e,"IsConfirm",s.slice(0,o).concat(s.slice(o+1)))}else t.$set(e,"IsConfirm",r)}}}),a("i",{staticClass:"fas fa-check-square"})])])])})),0)])},b=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("品號")]),a("th",[t._v("品名/規格")]),a("th",{staticClass:"text-center"},[t._v("單位")]),a("th",{staticClass:"text-center"},[t._v("庫存量")]),a("th",{staticClass:"text-center"},[t._v("標準售價(含稅)")]),a("th",{staticClass:"text-center"},[t._v("選擇產品")])])])}],y={name:"WareHouseModalTemplate",props:{tempProduct:{type:Array,required:!0},confirmProduct:{type:Array}}},P=y,D=Object(d["a"])(P,C,b,!1,null,null,null),k=D.exports,w=a("329e"),N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"line"},[a("div",{staticClass:"row"},[a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"付款方式"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field",class:s[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("付款方式")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.NF003},placeholder:"請選擇",valueFormat:"object",options:t.allPayTerm,reduce:function(t){return t.NF002}},on:{input:t.sendExchangeData},model:{value:t.sendData.PaymentTerms,callback:function(e){t.$set(t.sendData,"PaymentTerms",e)},expression:"sendData.PaymentTerms"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}])})],1),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("換貨總金額")]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.total,expression:"total",modifiers:{number:!0}}],attrs:{type:"number",placeholder:"換貨總金額",disabled:""},domProps:{value:t.total},on:{input:function(e){e.target.composing||(t.total=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("總計差額")]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.difference,expression:"difference",modifiers:{number:!0}}],attrs:{type:"number",placeholder:"總計差額",disabled:""},domProps:{value:t.difference},on:{input:function(e){e.target.composing||(t.difference=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t.difference>0?[a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"不開統編"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("不開統編")]),a("div",{staticClass:"switchBox"},[a("div",{staticClass:"switchBox_content"},[a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.NotTaxId,expression:"sendData.NotTaxId"}],staticClass:"switchBox_content_box_input",attrs:{disabled:t.IsTaxIdDisabled,type:"radio",id:"NotTaxId_Y",name:"NotTaxId"},domProps:{value:!0,checked:t._q(t.sendData.NotTaxId,!0)},on:{click:function(e){t.sendData.NotTaxId=!0,t.sendExchangeData()},change:function(e){return t.$set(t.sendData,"NotTaxId",!0)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("是")])]),a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.NotTaxId,expression:"sendData.NotTaxId"}],staticClass:"switchBox_content_box_input",attrs:{disabled:t.IsTaxIdDisabled,type:"radio",id:"NotTaxId_N",name:"NotTaxId"},domProps:{value:!1,checked:t._q(t.sendData.NotTaxId,!1)},on:{click:function(e){t.sendData.NotTaxId=!1,t.sendExchangeData()},change:function(e){return t.$set(t.sendData,"NotTaxId",!1)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("否")])])])])]),s[0]?a("span",{staticClass:"text-danger font-weight-bold small"},[t._v(t._s(s[0]))]):t._e()]}}],null,!1,6345763)}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:t.sendData.NotTaxId?"":"required",name:"統一編號"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("統一編號")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.TaxId,expression:"sendData.TaxId",modifiers:{trim:!0}}],attrs:{disabled:t.IsTaxIdDisabled,type:"text",placeholder:"統一編號"},domProps:{value:t.sendData.TaxId},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"TaxId",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s?a("span",{staticClass:"text-danger font-weight-bold small"},[t._v(t._s(s[0]))]):t._e()])]}}],null,!1,503377065)}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"隨貨附發票"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("隨貨附發票")]),a("div",{staticClass:"switchBox"},[a("div",{staticClass:"switchBox_content"},[a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.AttachInvoice,expression:"sendData.AttachInvoice"}],staticClass:"switchBox_content_box_input",attrs:{disabled:t.IsTaxIdDisabled,type:"radio",id:"AttachInvoice_Y",name:"AttachInvoice"},domProps:{value:!0,checked:t._q(t.sendData.AttachInvoice,!0)},on:{click:function(e){t.sendData.AttachInvoice=!0,t.sendExchangeData()},change:function(e){return t.$set(t.sendData,"AttachInvoice",!0)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("是")])]),a("label",{staticClass:"switchBox_content_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.sendData.AttachInvoice,expression:"sendData.AttachInvoice"}],staticClass:"switchBox_content_box_input",attrs:{disabled:t.IsTaxIdDisabled,type:"radio",id:"AttachInvoice_N",name:"AttachInvoice"},domProps:{value:!1,checked:t._q(t.sendData.AttachInvoice,!1)},on:{click:function(e){t.sendData.AttachInvoice=!1,t.sendExchangeData()},change:function(e){return t.$set(t.sendData,"AttachInvoice",!1)}}}),a("span",{staticClass:"switchBox_content_box_text"},[t._v("否")])])])])]),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}],null,!1,3697866186)}),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票收件人名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.InvoiceName,expression:"sendData.InvoiceName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票收件人名稱",disabled:!t.sendData.AttachInvoice},domProps:{value:t.sendData.InvoiceName},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"InvoiceName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票收件人電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.InvoiceContact,expression:"sendData.InvoiceContact",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票收件人電話",disabled:!t.sendData.AttachInvoice},domProps:{value:t.sendData.InvoiceContact},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"InvoiceContact",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("發票地址")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.InvoiceAddress,expression:"sendData.InvoiceAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"發票地址",disabled:!t.sendData.AttachInvoice},domProps:{value:t.sendData.InvoiceAddress},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"InvoiceAddress",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])]:t._e()],2)])},R=[],T=(a("fb6a"),{name:"WareHousePayInfoTemplate",props:{allPayTerm:{type:Array,required:!0},allReturnReason:{type:Array,required:!0},difference:{type:Number,required:!0},allExchangePrice:{type:Number,required:!0},customer:{type:Object,required:!0}},data:function(){return{sendData:{PaymentTerms:"",NotTaxId:!1,TaxId:"",AttachInvoice:!0,InvoiceName:"",InvoiceContact:"",InvoiceAddress:""},total:0}},methods:{sendExchangeData:function(){var t=this;t.$emit("getOther",t.sendData)}},watch:{IsTaxIdDisabled:function(t){var e=this;t&&(e.sendData.NotTaxId=!1)},allExchangePrice:function(t){var e=this;e.total=t}},computed:{IsTaxIdDisabled:function(){return"B2B"===JSON.parse(localStorage.getItem("customer")).UTypeName.slice(0,3)}},mounted:function(){var t=this;t.sendData={PaymentTerms:"",NotTaxId:!1,TaxId:t.customer.TaxID,AttachInvoice:!0,InvoiceName:t.customer.Contact,InvoiceContact:t.customer.TEL_NO,InvoiceAddress:t.customer.InvoiceAddress}}}),A=T,E=Object(d["a"])(A,N,R,!1,null,null,null),O=E.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"line"},[a("div",{staticClass:"row"}),a("div",{staticClass:"row"},[a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"換貨原因"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field",class:s[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("換貨原因")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.ReasonDesc},placeholder:"請選擇",valueFormat:"object",options:t.allReturnReason,reduce:function(t){return t.ReasonCode}},on:{input:t.sendExchangeData},model:{value:t.sendData.RtnReasons,callback:function(e){t.$set(t.sendData,"RtnReasons",e)},expression:"sendData.RtnReasons"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}])}),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("退貨總金額")]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.total,expression:"total",modifiers:{number:!0}}],attrs:{type:"number",placeholder:"退貨總金額",disabled:""},domProps:{value:t.total},on:{input:function(e){e.target.composing||(t.total=t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"收貨人"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field",class:s[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("收貨人名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.ReceiveName,expression:"sendData.ReceiveName",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"退貨人名稱"},domProps:{value:t.sendData.ReceiveName},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"ReceiveName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}])}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"連絡電話"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field",class:s[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("收貨人連絡電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.ReceiveContact,expression:"sendData.ReceiveContact",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"收貨人連絡電話"},domProps:{value:t.sendData.ReceiveContact},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"ReceiveContact",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}])}),a("VP",{staticClass:"col-sm-12 col-md-12",attrs:{rules:"required",name:"收貨地址"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("div",{staticClass:"field",class:s[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("收貨地址")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.ReceiveAddress,expression:"sendData.ReceiveAddress",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"收貨地址"},domProps:{value:t.sendData.ReceiveAddress},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"ReceiveAddress",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),s?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(s[0])+" ")]):t._e()]}}])}),a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("備註")]),a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.Memo,expression:"sendData.Memo",modifiers:{trim:!0}}],staticClass:"pl-2",attrs:{placeholder:"備註"},domProps:{value:t.sendData.Memo},on:{change:t.sendExchangeData,input:function(e){e.target.composing||t.$set(t.sendData,"Memo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])],1)])},Q=[],U={name:"WareHouseReceiptTemplate",props:{allReturnReason:{type:Array,required:!0},allPickupPrice:{type:Number,required:!0},customer:{type:Object,required:!0}},data:function(){return{sendData:{RtnReasons:"",ReceiveName:"",ReceiveContact:"",ReceiveAddress:"",Memo:""},total:0}},methods:{sendExchangeData:function(){var t=this;t.$emit("getOther",t.sendData)}},watch:{allPickupPrice:function(t){var e=this;e.total=t}},mounted:function(){var t=this;t.sendData={RtnReasons:"",ReceiveName:t.customer.Owner,ReceiveContact:t.customer.TEL_NO,ReceiveAddress:t.customer.Address,Memo:""}}},q=U,M=Object(d["a"])(q,S,Q,!1,null,null,null),G=M.exports,j=a("6e77"),L=a("a9de"),B=a("16f6"),W=a("bc3a"),H=a.n(W),V=a("4360"),F=function(){var t="".concat("https://api.yahome-test.com.tw/HiqbioApi","/User/Customer/GetPayTerm");return H.a.get(t).catch((function(){V["a"].commit("ISLOADING",!1)}))},J=function(){var t="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Return/GetReturnReason");return H.a.get(t).catch((function(){V["a"].commit("ISLOADING",!1)}))},Y={name:"AllWareHouseExchangeJob",mixins:[j["a"],L["a"],B["a"]],data:function(){return{pickupRows:[],tempProduct:[],exchangeRows:[],tempExchangeProduct:[],currentTable:"pickup",otherData1:{},otherData2:{},allReturnReason:[],allPayTerm:[],keyData:1,allPickupQTY:0,allExchangeQTY:0,allPickupPrice:0,allExchangePrice:0}},methods:{sendData:function(){var t=this;"pickup"===t.currentTable?(t.concatProduct("tempProduct","pickupRows"),t.$store.commit("SUREPRODUCT",t.pickupRows)):"exchange"===t.currentTable&&(t.concatProduct("tempExchangeProduct","exchangeRows"),localStorage.setItem("confirmExchangeProduct",JSON.stringify(t.exchangeRows))),$("#aftersalemodal").modal("hide")},openNewProduct:function(t){var e=this;e.currentTable=t,$("#aftersalemodal").modal("show")},searchData:function(){var t=this,e=t.$refs.AfterSaleModal.searchBox,a="";if(t.$store.commit("ISLOADING",!0),"pickup"===t.currentTable){var s=e.productSeries?e.productSeries.Code:"";a="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Warehouse/GetPickableProducts?customerId=").concat(t.customer.CustomerID,"&productSeries=").concat(s,"&productClass=").concat(e.productType,"&keyword=").concat(e.keyword),t.$http.get(a).then((function(e){if(e.data.ErrorMessage)t.$notify({title:"錯誤",message:e.data.ErrorMessage,type:"error",duration:3500});else{var a=[];e.data.Data.some((function(e){var s=!1;t.pickupRows.some((function(t){if(e.ProductId===t.ProductId&&e.ProductName===t.ProductName)return s=!0,!0})),s||a.push(e)})),a=a.filter((function(t){return t.PickableQuantity>0})),t.tempProduct=a}t.$store.commit("ISLOADING",!1)})).catch((function(){t.$store.commit("ISLOADING",!1)}))}else{var n=e.productSeries?e.productSeries.Code:"";a="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Product/GetProducts?salesDeptId=").concat(t.saleInfo.DeptCode,"&productSeries=").concat(n,"&productClass=").concat(e.productType,"&keyword=").concat(e.keyword),t.$http.get(a).then((function(e){if(0===e.data.Data.length&&t.$notify({title:"提示",message:"未搜尋到任何產品",type:"warning",duration:3500}),e.data.ErrorMessage)t.$notify({title:"錯誤",message:e.data.ErrorMessage,type:"error",duration:3500});else{var a=[];e.data.Data.some((function(e){var s=!1;e.InvQty>0&&(t.exchangeRows.some((function(t){if(e.ItemNo===t.ItemNo&&e.WhseID===t.WhseID)return s=!0,!0})),s||a.push(e))})),t.tempExchangeProduct=a}t.$store.commit("ISLOADING",!1)})).catch((function(){t.$store.commit("ISLOADING",!1)}))}},removeProduct:function(){var t=this;t.tempProduct=[],t.tempExchangeProduct=[]},openCheck:function(){var t=this;if(0===t.exchangeRows.length)return t.$notify({title:"提示",message:"請先選擇商品",type:"warning",duration:3500}),!1;t.checkInventory("getMerge")},sendOrder:function(){var t=this,e="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Warehouse/WarehousePickupProducts"),a=t.pickupRows.map((function(t){return{ItemNo:t.ProductId,ItemName:t.ProductName,Variant:t.Specification,Uom:t.UOM,GiftSpareQty:0,PickupQty:t.cardQuantity}})),s=t.exchangeRows.map((function(t){return{ItemNo:t.ItemNo,ItemName:t.ItemName,Variant:t.Specification,Uom:t.UOM,UnitPrice:t.UnitPrice,ExchangeQty:t.cardQuantity}})),n={CustomerId:t.customer.CustomerID,DeptId:t.customer.DeptID,CustomerFullName:t.customer.CustomerFullName,Contact:t.customer.Contact,ContactTel:t.customer.TEL_NO,Memo:t.otherData1.Memo,PickupContact:t.otherData1.ReceiveName,PickupContactTel:t.otherData1.ReceiveContact,PickupAddress:t.otherData1.ReceiveAddress,SalesId:t.saleInfo.EmpID,TaxId:t.customer.TaxID,IsExchange:!0,CreateUser:localStorage.getItem("uofUserGuid"),WarehousePickups:a,WarehouseExchange:{WithInvoiceTax:t.otherData2.NotTaxId,InvoiceTax:t.otherData2.TaxId,PaymentTermsCode:t.otherData2.PaymentTerms,InvoiceAttached:t.otherData2.AttachInvoice,InvoiceName:t.otherData2.InvoiceName,InvoiceContact:t.otherData2.InvoiceContact,InvoiceAddress:t.otherData2.InvoiceAddress,ExchangeReasonCode:t.otherData1.RtnReasons,WarehouseExchangeProducts:s}};t.$store.commit("ISLOADING",!0),t.$http.post(e,n).then((function(e){e.data.ErrorMessage||(t.$notify({title:"成功",message:"換貨作業完成",type:"success",duration:3500}),t.$store.commit("ISLOADING",!1),t.$router.push({name:"OrderFinish",params:{text:"寄倉取貨單"}}))})).catch((function(e){t.$store.commit("ISLOADING",!1),400===e.response.statue&&t.$notify({title:"錯誤",message:e.response.data,type:"error",duration:3500})}))},checkInventory:function(t){var e=this,a="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Product/CheckProductInventory");e.$store.commit("ISLOADING",!0);var s=e.exchangeRows.map((function(t){return{ProductId:t.ItemNo.trim(),WhseID:t.WhseID.trim(),IsPending:!1,PendingQuantity:0,PurchaseQuantity:t.cardQuantity}})),n={Customers:[{CustomerId:e.customer.CustomerID,Products:s}]};e.$http.post(a,n).then((function(a){if(e.$store.commit("ISLOADING",!1),a.data.ErrorMessage)return e.$message.error({message:"<span>".concat(a.data.ErrorMessage,"<span>"),dangerouslyUseHTMLString:!0,showClose:!0,duration:1e4}),!1;"getMerge"===t?(e.keyData+=1,setTimeout((function(){$("#commoncheckmodal").modal("show")}),50)):e.sendOrder()})).catch((function(t){e.$store.commit("ISLOADING",!1),400===t.response.status&&e.$notify({title:"錯誤",message:t.response.data,type:"error",duration:3500})}))},getPickupData:function(){var t=this,e=0,a=0;t.pickupRows.length>0?t.pickupRows.forEach((function(t){e+=Number(t.cardQuantity),a+=Number(t.cardQuantity*t.UnitPrice)})):e=0,t.allPickupQTY=e,t.allPickupPrice=a},getExchangeData:function(){var t=this,e=0,a=0;t.exchangeRows.length>0?t.exchangeRows.forEach((function(t){e+=Number(t.cardQuantity),a+=Number(t.cardQuantity*t.UnitPrice)})):e=0,t.allExchangeQTY=e,t.allExchangePrice=a},getOther1:function(t){var e=this;e.otherData1=Object(r["a"])({},t)},getOther2:function(t){var e=this;e.otherData2=Object(r["a"])({},t)},getUnitFormat:function(t){var e=this,a=[],s={};return t.forEach((function(t){var s={ProductId:t.ItemNo.trim(),PayTermCode:e.otherData2.PaymentTerms,Quantity:t.cardQuantity?t.cardQuantity:1};a.push(s)})),s={Products:a},s},getUnitPrice:function(t){var e=this,a="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Product/GetProductUnitPrice");e.$store.commit("ISLOADING",!0),e.$http.post(a,t).then((function(t){e.UnitPrice=t.data.Data,e.UnitPrice.length>0?e.exchangeRows.forEach((function(t){e.UnitPrice.forEach((function(e){e.ItemNo===t.ItemNo.trim()&&(t.UnitPrice=e.UnitPrice)}))})):e.exchangeRows.forEach((function(t){t.UnitPrice=0})),setTimeout((function(){e.getPickupData(),e.getExchangeData(),e.$store.commit("ISLOADING",!1)}),0)})).catch((function(){e.$store.commit("ISLOADING",!1)}))}},watch:{"otherData2.PaymentTerms":function(t){var e=this;t&&e.getUnitPrice(e.getUnitFormat(e.exchangeRows))},pickupRows:function(t){var e=this;e.getPickupData(),0===t.length&&(e.allPickupPrice=0)},exchangeRows:function(t){var e=this;e.getExchangeData(),0===t.length&&(e.allExchangePrice=0)}},computed:{saleInfo:function(){return JSON.parse(localStorage.getItem("saleInfo"))},customer:function(){return JSON.parse(localStorage.getItem("customer"))},difference:function(){var t=this;return t.allPickupPrice-t.allExchangePrice}},mounted:function(){var t=this;t.$store.commit("HEADER","寄倉換貨作業"),t.$store.commit("ISWELCOME",!1),t.$store.commit("ISGOBACK",!0),0===JSON.parse(localStorage.getItem("sureProduct")).length&&t.$router.back(),t.pickupRows=t.$route.params.confirmProduct||JSON.parse(localStorage.getItem("sureProduct")),t.axios.all([J(),F()]).then(t.axios.spread((function(e,a){e.data.ErrorMessage?t.$notify({title:"錯誤",message:e.data.ErrorMessage,type:"error",duration:3500}):t.allReturnReason=e.data.Data,a.data.ErrorMessage?t.$notify({title:"錯誤",message:a.data.ErrorMessage,type:"error",duration:3500}):t.allPayTerm=a.data.Data,t.$store.commit("ISLOADING",!1)}))),t.allPickupQTY=t.pickupRows.length,t.$store.commit("ISLOADING",!1)},components:{PickUpTemplate:m,ExchangeTemplate:g,AfterSaleModal:x["a"],PickupTable:I["a"],ExchangeTable:k,Check:w["a"],CheckPayInfo:O,CheckReceipt:G},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}},K=Y,z=Object(d["a"])(K,s,n,!1,null,null,null);e["default"]=z.exports}}]);