(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AllExchangeJob~AllPickUpWork~AllReturnWork~AllWareHouseExchange"],{"06c5":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("fb6a"),a("d3b7"),a("b0c0"),a("a630"),a("3ca3");var o=a("6b75");function r(t,e){if(t){if("string"===typeof t)return Object(o["a"])(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(o["a"])(t,e):void 0}}},"16f6":function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));a("159b"),a("99af");var o={data:function(){return{}},methods:{concatProduct:function(t,e){var a=this,o=[];a[t].forEach((function(t){t.cardQuantity=1,t.Guid=a.Guid(),t.IsConfirm&&o.push(t)})),a[e]||(a[e]=[]),a[e]=a[e].concat(o),o.length>0?a.$nextTick((function(){a[t]=[],a.keyData+=1})):a.$notify({title:"提示",message:"請至少選擇一種產品",type:"warning",duration:3500})}}}},2909:function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));var o=a("6b75");function r(t){if(Array.isArray(t))return Object(o["a"])(t)}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function n(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var s=a("06c5");function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return r(t)||n(t)||Object(s["a"])(t)||i()}},"329e":function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal fade bd-example-modal-lg",attrs:{id:"commoncheckmodal",tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true","data-backdrop":"static"}},[a("div",{staticClass:"modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered"},[a("VO",{staticClass:"modal-content",attrs:{tag:"section"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.handleSubmit;return[a("div",{staticClass:"modal-body p-0 overflow-hidden"},[a("div",{staticClass:"order-detail row"},[a("div",{staticClass:"info col-sm-12 col-md-3 col-lg-3"},[a("h3",[t._v(t._s(t.customerData.CustomerFullName))]),a("div",[t._v(t._s(t.customerData.CustomerID))]),a("table",[a("tr",[a("td",[a("i",{staticClass:"fas fa-barcode"})]),a("td",[t._v(t._s(t.customerData.TaxID))])]),a("tr",[a("td",[a("i",{staticClass:"fas fa-phone-volume"})]),a("td",[t._v(t._s(t.customerData.Contact))])]),a("tr",[a("td",[a("i",{staticClass:"fas fa-headset"})]),a("td",[t._v(t._s(t.customerData.TEL_NO))])])])]),a("div",{staticClass:"list col-md-9 col-lg-9 col-sm-12"},[a("div",{staticClass:"p-3"},[t._t("orderTemplate"),t._t("other_1"),t._t("exchangeTemplate"),t._t("other_2")],2),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn_cancel",attrs:{type:"reset","data-dismiss":"modal"}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:function(e){return o(t.clickSave)}}},[t._v(" 儲存 ")])])])])])]}}],null,!0)})],1)])},r=[],n=a("2909"),s=(a("fb6a"),a("a9de")),i={name:"CommonCheckModal",mixins:[s["a"]],data:function(){return{sendData:{SalesId:JSON.parse(localStorage.getItem("saleInfo")).EmpID,SalesName:JSON.parse(localStorage.getItem("saleInfo")).EmpCName,SalesDept:JSON.parse(localStorage.getItem("saleInfo")).DeptCode,IsHeadquarterInvoice:!0,CustomerName:JSON.parse(localStorage.getItem("customer")).CustomerFullName,CustomerId:JSON.parse(localStorage.getItem("customer")).CustomerID,TaxId:JSON.parse(localStorage.getItem("customer")).TaxID,PayTermCode:"",NotTaxId:!1,AttachInvoice:!0,InvoiceName:JSON.parse(localStorage.getItem("customer")).Contact,InvoiceContact:JSON.parse(localStorage.getItem("customer")).TEL_NO,InvoiceAddress:JSON.parse(localStorage.getItem("customer")).InvoiceAddress,Memo:"",Customers:JSON.parse(localStorage.getItem("pendingOrderConcat")),CreateUser:localStorage.getItem("uofUserGuid")},keyData:1}},methods:{clickSave:function(){var t=this;t.$emit("clickSave")}},mounted:function(){var t=this;t.$store.commit("ISLOADING",!0),t.$store.commit("ISLOADING",!1)},watch:{pendingOrderConcat:function(t){var e=this;e.sendData.Customers=Object(n["a"])(t)}},computed:{customerData:function(){return JSON.parse(localStorage.getItem("customer"))},branchStore:function(){return this.$store.state.branchStore||JSON.parse(localStorage.getItem("branchStore"))},pendingOrderConcat:function(){return this.$store.state.pendingOrderConcat||JSON.parse(localStorage.getItem("pendingOrderConcat"))},IsTaxIdDisabled:function(){return!!Object.prototype.hasOwnProperty.call(JSON.parse(localStorage.getItem("customer")),"UTypeName")&&(JSON.parse(localStorage.getItem("customer")).UTypeName.slice(0,3),!0)}},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}},c=i,d=a("2877"),u=Object(d["a"])(c,o,r,!1,null,null,null);e["a"]=u.exports},"35d7":function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":[{"WhseID":"KS01001   ","WhseName":"棚康良品倉","Type":"1","IsInventoryWarehouse":true,"Memo":"","OwnDeptID":"21800","OwnDeptName":"管倉儲物流"},{"WhseID":"KS01005   ","WhseName":"棚康年底倉","Type":"1","IsInventoryWarehouse":true,"Memo":"","OwnDeptID":"23000","OwnDeptName":"人醫保健部"},{"WhseID":"KS01007   ","WhseName":"行銷通路倉","Type":"1","IsInventoryWarehouse":true,"Memo":"","OwnDeptID":"23900","OwnDeptName":"人行銷處"},{"WhseID":"KS01008   ","WhseName":"整合行銷倉","Type":"1","IsInventoryWarehouse":true,"Memo":"","OwnDeptID":"23900","OwnDeptName":"人行銷處"},{"WhseID":"KS01010   ","WhseName":"人醫保健倉","Type":"1","IsInventoryWarehouse":true,"Memo":"","OwnDeptID":"23000","OwnDeptName":"人醫保健部"},{"WhseID":"KS01011   ","WhseName":"統一夢公園","Type":"1","IsInventoryWarehouse":true,"Memo":"","OwnDeptID":"23100","OwnDeptName":"人藥局通路"},{"WhseID":"KS11003   ","WhseName":"棚康非存貨","Type":"2","IsInventoryWarehouse":false,"Memo":"","OwnDeptID":"21800","OwnDeptName":"管倉儲物流"}]}')},5214:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{key:t.keyData,staticClass:"modal fade bd-example-modal-lg",attrs:{id:"aftersalemodal",tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true","data-backdrop":"static"}},[a("div",{staticClass:"modal-dialog modal-lg modal-dialog-centered"},[a("section",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[t._v("產品選擇")]),a("div",{staticClass:"modal-body",staticStyle:{overflow:"unset"}},[a("div",{staticClass:"customer-info"},[a("div",{staticClass:"name"},[t._v(" "+t._s(t.customerData.CustomerShtName)+" ")]),a("div",{staticClass:"number"},[t._v(t._s(t.customerData.CustomerID))])]),a("div",{staticClass:"filter-block"},[a("div",{staticClass:"filter-field"},[a("span",{staticClass:"title"},[t._v(" 商品系列 ")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.Name},placeholder:"請選擇",valueFormat:"object",options:t.allProductCategory},model:{value:t.searchBox.productSeries,callback:function(e){t.$set(t.searchBox,"productSeries",e)},expression:"searchBox.productSeries"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),a("div",{staticClass:"filter-field"},[a("span",{staticClass:"title"},[t._v(" 商品分類 ")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.Name},placeholder:"請選擇",options:t.allCategoryChild,reduce:function(t){return t.Code}},model:{value:t.searchBox.productType,callback:function(e){t.$set(t.searchBox,"productType",e)},expression:"searchBox.productType"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),t.NoWarehouse?t._e():a("div",{staticClass:"filter-field"},[a("span",{staticClass:"title"},[t._v(" 庫別 ")]),a("VSelect",{attrs:{getOptionLabel:function(t){return t.WhseName},placeholder:"請選擇",options:t.allWhses,reduce:function(t){return t.WhseID}},model:{value:t.searchBox.WhseName,callback:function(e){t.$set(t.searchBox,"WhseName",e)},expression:"searchBox.WhseName"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),a("div",{staticClass:"filter-field"},[a("span",{staticClass:"title"},[t._v(" 關鍵字 ")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchBox.keyword,expression:"searchBox.keyword",modifiers:{trim:!0}}],staticClass:"pl-2",attrs:{type:"text",placeholder:"請輸入產品關鍵字"},domProps:{value:t.searchBox.keyword},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.searchData.apply(null,arguments)},input:function(e){e.target.composing||t.$set(t.searchBox,"keyword",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"filter-btn-wrap"},[a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:t.searchData}},[t._v(" 查詢 ")])])]),a("div",{staticClass:"table-wrap"},[t._t("table")],2)]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn_cancel",attrs:{type:"reset","data-dismiss":"modal"},on:{click:t.closeModal}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn_primary",attrs:{type:"button"},on:{click:t.saveOrder}},[t._v(" 確認 ")])])])])])},r=[],n=a("5530"),s=a("2909"),i=a("53ca"),c=(a("7db0"),a("159b"),a("498a"),a("6946")),d=a("a94a"),u={name:"AfterSaleModal",mixins:[c["a"],d["a"]],props:{customer:{type:Object,required:!0},NoWarehouse:{type:Boolean}},data:function(){return{searchBox:{productSeries:"",productType:"",WhseName:"",keyword:""},customerData:{CustomerShtName:"",CustomerID:""},keyData:0,tempProduct:[]}},methods:{searchData:function(){var t=this;t.$emit("searchData")},saveOrder:function(){var t=this;t.$emit("sendData")},closeModal:function(){var t=this;t.tempProduct=[],t.$emit("removeProduct")}},watch:{"searchBox.productSeries":function(t){var e=this;t&&("object"!==Object(i["a"])(t)&&(t=e.allProductCategory.find((function(e){return t===e.Code})),e.searchBox.productSeries=t),e.searchBox.productType=null,e.allCategoryChild=Object(s["a"])(t.ProductCategories),e.allCategoryChild.forEach((function(t){t.Code=t.Code.trim()})))},customer:function(t){var e=this;if(e.customerData=Object(n["a"])({},t),t&&!e.NoWarehouse){var a,o;if(localStorage.setItem("customer",JSON.stringify(t)),this.print("??",null===(a=e.saleInfo)||void 0===a?void 0:a.DeptCode),null===(o=e.saleInfo)||void 0===o||!o.DeptCode)return e.$notify({title:"提示",message:"此客戶暫無部門 ID，無法取得庫別",type:"warning",duration:3500}),!1;e.getAllWhses(e.saleInfo.DeptCode)}}},mounted:function(){var t,e=this;localStorage.getItem("customer")&&(e.customerData=JSON.parse(localStorage.getItem("customer"))),null!==e&&void 0!==e&&null!==(t=e.saleInfo)&&void 0!==t&&t.DeptCode&&e.getAllWhses(e.saleInfo.DeptCode)},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}},l=u,m=a("2877"),p=Object(m["a"])(l,o,r,!1,null,null,null);e["a"]=p.exports},"53ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function o(t){return o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}},6946:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));a("ac1f"),a("5319"),a("d3b7"),a("25f0"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("99af");var o={data:function(){return{today:""}},methods:{Guid:function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)}))},AddZero:function(t){return t<10?"0".concat(t):t},Today:function(){var t=this,e=new Date,a=e.getFullYear(),o=t.AddZero(e.getMonth()+1),r=t.AddZero(e.getDate()),n="".concat(a,"-").concat(o,"-").concat(r);t.today=n}},mounted:function(){var t=this;t.Today()}}},"6b75":function(t,e,a){"use strict";function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,o=new Array(e);a<e;a++)o[a]=t[a];return o}a.d(e,"a",(function(){return o}))},"6e77":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var o=a("5530"),r=(a("159b"),a("6946")),n={mixins:[r["a"]],data:function(){return{}},methods:{splitRow:function(t){var e=this;t.forEach((function(t,a,o){if(t.IsOrder&&t.IsPR){t.IsPR=!1;var r=JSON.parse(JSON.stringify(t));r.IsPR=!0,r.IsOrder=!1,r.ProductGuid=e.Guid(),o.push(r)}}))},filterTemplate:function(t){var e=this;t.forEach((function(t){if(t.ProductGuid=e.Guid(),t.DetailRows=[{Guid:e.Guid(),IsPending:!t.InvQty,store:null,orderQuantity:1,warehousesNum:0,IsPartialDelivery:!1}],t.IsOrder&&t.IsPR){t.OrderTemplateId=e.orderRows.length,e.orderRows.push(t);var a=Object(o["a"])({},t);a.ProductGuid=e.Guid(),a.DetailRows=[{Guid:e.Guid(),IsPending:!t.InvQty,store:null,orderQuantity:1,warehousesNum:0,IsPartialDelivery:!1}],a.PRTemplateId=e.prRows.length,e.prRows.push(a)}else t.IsOrder&&(t.OrderTemplateId=e.orderRows.length,e.orderRows.push(t)),t.IsPR&&(t.PRTemplateId=e.prRows.length,e.prRows.push(t))}))},OrderSearchFilter:function(t){var e=this;t.forEach((function(t){t.IsOrder&&(t.OrderTemplateId=e.orderRows.length,e.orderRows.push(t)),t.IsPR&&(t.PRTemplateId=e.prRows.length,e.prRows.push(t))}))},getSelfBranch:function(t,e){t.forEach((function(t){e.some((function(e){if(t.store===e.CustomerID)return t.store=e,!0}))}))}}}},"725a":function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":[{"Category_Code":"2","Category_Name":"產品系列","Code":"AA    ","Name":"HIQ_Health","ProductCategories":[{"Category_Name":"產品分類","Code":"AA_001","Name":"褐抑定"},{"Category_Name":"產品分類","Code":"AA_002","Name":"褐抑定PLUS"},{"Category_Name":"產品分類","Code":"AA_003","Name":"普保健"},{"Category_Name":"產品分類","Code":"AA_004","Name":"藻防護"},{"Category_Name":"產品分類","Code":"AA_005","Name":"藻盛利"},{"Category_Name":"產品分類","Code":"AA_006","Name":"鱸魚精"},{"Category_Name":"產品分類","Code":"AA_007","Name":"藻久甘"},{"Category_Name":"產品分類","Code":"AA_008","Name":"藻衡糖"},{"Category_Name":"產品分類","Code":"AA_009","Name":"藻衡糖PLUS"},{"Category_Name":"產品分類","Code":"AA_010","Name":"麩醯胺酸"}]},{"Category_Code":"2","Category_Name":"產品系列","Code":"BB    ","Name":"HIQ_Pets","ProductCategories":[{"Category_Name":"產品分類","Code":"BB_001","Name":"藻康留"},{"Category_Name":"產品分類","Code":"BB_002","Name":"藻心沛"},{"Category_Name":"產品分類","Code":"BB_003","Name":"藻膚好"},{"Category_Name":"產品分類","Code":"BB_004","Name":"藻護盛"},{"Category_Name":"產品分類","Code":"BB_005","Name":"藻飛速"},{"Category_Name":"產品分類","Code":"BB_006","Name":"寵物機能餅"}]},{"Category_Code":"2","Category_Name":"產品系列","Code":"CC    ","Name":"HIQ_Fresh","ProductCategories":[]},{"Category_Code":"2","Category_Name":"產品系列","Code":"DD    ","Name":"HIQ_Beauty","ProductCategories":[{"Category_Name":"產品分類","Code":"DD_001","Name":"面膜類"},{"Category_Name":"產品分類","Code":"DD_002","Name":"凝膠類"},{"Category_Name":"產品分類","Code":"DD_003","Name":"精華液類"},{"Category_Name":"產品分類","Code":"DD_004","Name":"保濕露類"},{"Category_Name":"產品分類","Code":"DD_005","Name":"慕斯類"},{"Category_Name":"產品分類","Code":"DD_006","Name":"機能霜類"},{"Category_Name":"產品分類","Code":"DD_007","Name":"修護乳類"},{"Category_Name":"產品分類","Code":"DD_008","Name":"隔離乳類"}]},{"Category_Code":"2","Category_Name":"產品系列","Code":"EE    ","Name":"HIQ_Creati","ProductCategories":[]}]}')},a94a:function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("159b"),a("498a");var o=a("725a"),r=a("35d7"),n={data:function(){return{allProductCategory:[],allCategoryChild:[],allWhses:[]}},methods:{getAllProductCategory:function(){var t=this,e="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Product/GetProductCategory");return t.$http.get(e).catch((function(){t.$store.commit("ISLOADING",!1)}))},getAllWhses:function(){var t=this;t.allWhses=r.Data}},mounted:function(){var t=this;t.allProductCategory=o.Data,t.allProductCategory.forEach((function(t){t.Code=t.Code.trim()}))}}},a9de:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("159b"),a("d81d"),a("498a");var o=a("ddfc"),r={data:function(){return{branchData:null,filterContented:null,keyData:0}},methods:{concatRow:function(){this.print("將掛單和關聯的合併再一起1","這裡?");var t=this;this.print("store",t.$store.state.branchStore),t.branchData=JSON.parse(JSON.stringify(t.$store.state.branchStore)),t.branchData.forEach((function(t){t.productData=t.productData.map((function(e,a,r){var n,s,i;return!e.IsPending&&(null===e||void 0===e?void 0:e.ProductGuid)===(null===(n=r[a+1])||void 0===n?void 0:n.ProductGuid)&&null!==(s=r[a+1])&&void 0!==s&&s.IsPending?(Object(o["a"])("不是掛單，但下一筆是掛單",e),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:!0,PendingQuantity:r[a+1].orderQuantity,PurchaseQuantity:e.orderQuantity+r[a+1].orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:r[a+1].IsPartialDelivery,PartialDeliveryQuantity:r[a+1].orderQuantity,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum+r[a+1].warehousesNum,UOM:e.UOM}):e.IsPending&&(null===e||void 0===e?void 0:e.ProductGuid)!==(null===(i=r[a+1])||void 0===i?void 0:i.ProductGuid)?(Object(o["a"])("是掛單，但下一筆不是掛單",e),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:!0,PendingQuantity:e.orderQuantity,PurchaseQuantity:e.orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:e.IsPartialDelivery,PartialDeliveryQuantity:e.orderQuantity,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum,UOM:e.UOM}):e.IsPending?(Object(o["a"])("都不是的判斷",e),Object(o["a"])("都不是的判斷結果",t.productData),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:e.IsPending,PendingQuantity:e.orderQuantity,PurchaseQuantity:e.orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:e.IsPartialDelivery,PartialDeliveryQuantity:e.PartialDeliveryQuantity,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum,UOM:e.UOM}):(Object(o["a"])("不是掛單的一般項目",e),{ProductGuid:e.ProductGuid,ProductId:e.ItemNo.trim(),WhseID:e.WhseID.trim(),IsPending:!1,PendingQuantity:0,PurchaseQuantity:e.orderQuantity,ProductName:e.ItemName,IsFree:e.IsPR||!1,IsPartialDelivery:e.IsPartialDelivery,PartialDeliveryQuantity:0,UnitPrice:e.UnitPrice,Subtotal:0,Specification:e.Specification,DepositQuantity:e.warehousesNum,UOM:e.UOM})}))}));var e=[];t.branchData.forEach((function(t,a){e.push(JSON.parse(JSON.stringify(t))),e[a].productData=[],t.productData.forEach((function(t,o,r){(0===o||t.ProductGuid!==r[o-1].ProductGuid)&&e[a].productData.push(t)}))})),t.branchData=JSON.parse(JSON.stringify(e)),this.print("branchData",t.branchData),t.branchData=t.branchData.map((function(t){return{CustomerId:t.store.CustomerID,Products:t.productData,Store:t.store}})),this.print("返回結構",t.branchData)},checkInventory:function(){var t=this;t.$store.commit("ISLOADING",!0),t.concatRow(),t.$nextTick((function(){var e=JSON.parse(JSON.stringify(t.branchData));e.forEach((function(t){t.Products=t.Products.map((function(t){return{ProductId:t.ProductId,WhseID:t.WhseID,IsPending:t.IsPending,PendingQuantity:t.PendingQuantity,PurchaseQuantity:t.PurchaseQuantity}}))})),e=e.map((function(t){return{CustomerId:t.CustomerId,Products:t.Products}})),Object(o["a"])("確認訂單格式",e),t.filterContented={Customers:e}}))}}}}}]);