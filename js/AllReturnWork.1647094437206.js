(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AllReturnWork"],{"2b61":function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":[{"NF001":"2","NF002":"014-00","NF003":"貨到14天+1電匯","NF004":"1"},{"NF001":"2","NF002":"014-01","NF003":"貨到14天+1-業務親收","NF004":"1"},{"NF001":"2","NF002":"014-02","NF003":"貨到14天+1-寄回支票","NF004":"1"},{"NF001":"2","NF002":"015-00","NF003":"統一客樂得代收","NF004":"1"},{"NF001":"2","NF002":"030-01","NF003":"月結,附回郵乙紙","NF004":"1"},{"NF001":"2","NF002":"030-05","NF003":"月結30天,每月5日電匯","NF004":"2"},{"NF001":"2","NF002":"030-10","NF003":"月結30天,每月10日電匯","NF004":"2"},{"NF001":"2","NF002":"030-25","NF003":"月結30天,每月25日電匯","NF004":"2"},{"NF001":"2","NF002":"030-30","NF003":"月結30天,30日內由業務親收貨款","NF004":"2"},{"NF001":"2","NF002":"045-00","NF003":"月結45天,","NF004":"2"}]}')},"2ddf":function(t){t.exports=JSON.parse('{"Status":200,"ErrorMessage":null,"Data":[{"ReasonCode":"01        ","ReasonDesc":"效期6個月","Memo":"111"},{"ReasonCode":"02        ","ReasonDesc":"外包裝破損","Memo":""},{"ReasonCode":"03        ","ReasonDesc":"品項錯誤","Memo":""}]}')},"68d1":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{key:t.keyData},[a("VO",{attrs:{tag:"article"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.handleSubmit;return[a("div",{staticClass:"table-title"},[a("span"),a("button",{staticClass:"btn btn_primary",attrs:{type:"button","data-toggle":"modal","data-target":"#aftersalemodal"}},[t._v(" 新增品項 ")])]),a("div",{staticClass:"table-title"},[a("span",[t._v("訂購品項")])]),t.confirmProduct.length>0?a("section",[a("ReturnTemplate",{attrs:{confirmProduct:t.confirmProduct,allReturnReason:t.allReturnReason,allPayTerm:t.allPayTerm,customer:t.customer,isDisabled:!1},on:{getReturnData:t.getReturnData,getAllReturnQTY:t.getAllReturnQTY}})],1):a("section",{staticClass:"pl-2 mb-2"},[t._v("暫無退貨品項...")]),a("div",{staticClass:"result-wrap mt-2"},[a("div",{staticClass:"item"},[t._v(" 退貨總品項 "),a("span",[t._v(t._s(t.allReturnQTY))])]),a("div",{staticClass:"amount"},[t._v(" 退貨總金額 "),a("span",[t._v(t._s(t.totalPrice))])]),a("button",{staticClass:"btn btn_info",attrs:{type:"button"},on:{click:function(e){return r(t.checkOrder)}}},[t._v(" 確認退貨 ")])])]}}])}),a("AfterSaleModal",{ref:"AfterSaleModal",attrs:{customer:t.customer},on:{sendData:t.sendData,searchData:t.searchData,removeProduct:t.removeProduct}},[a("Table",{key:t.keyData,attrs:{slot:"table",confirmProduct:t.confirmProduct,tempProduct:t.tempProduct},slot:"table"})],1),a("CheckModal",{on:{clickSave:t.confirmReturn}},[a("ReturnTemplate",{attrs:{slot:"orderTemplate",confirmProduct:t.confirmProduct,allReturnReason:t.allReturnReason,allPayTerm:t.allPayTerm,isDisabled:!0,customer:t.customer,returnData:t.returnData},slot:"orderTemplate"})],1)],1)},s=[],n=a("5530"),o=a("1da1"),i=(a("99af"),a("159b"),a("498a"),a("a9e3"),a("96cf"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("article",[a("div",{staticClass:"table-wrap mb-3"},[a("table",{staticClass:"w-100 common-datatable datatable stripe order-column"},[a("thead",[a("tr",{staticClass:"text-center"},[a("th",[t._v("品號")]),a("th",[t._v("品名/規格")]),a("th",[t._v("銷貨數量")]),a("th",[t._v("可退貨的數量")]),a("th",[t._v("退貨數量")]),t.isDisabled?t._e():a("th")])]),a("tbody",t._l(t.allReturn,(function(e,r){return a("tr",{key:e.Guid},[a("td",[t._v(t._s(e.ProductId))]),a("td",[t._v(t._s(e.ProductName)+"/"+t._s(e.Specification))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.OrderQuantity))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.ReturnableQuantity))]),a("VP",{attrs:{tag:"td",name:"退貨數量",rules:"max_value:"+e.ReturnableQuantity+"|min_value:1"}},[a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.cardQuantity,expression:"product.cardQuantity",modifiers:{number:!0}}],staticClass:"w-100",attrs:{disabled:t.isDisabled,type:"number",max:"999",min:"1",placeholder:"請輸入數量"},domProps:{value:e.cardQuantity},on:{keyup:function(a){return t.checkQuantity(e)},change:function(a){return t.checkQuantity(e)},input:function(a){a.target.composing||t.$set(e,"cardQuantity",t._n(a.target.value))},blur:function(e){return t.$forceUpdate()}}})]),t.isDisabled?t._e():a("td",[a("button",{staticClass:"btn btn_danger",attrs:{type:"button"},on:{click:function(e){return t.delItem(r)}}},[t._v(" 移除 ")])])],1)})),0)])]),a("section",{staticClass:"modal-content border-0",staticStyle:{"background-color":"transparent"}},[a("div",{staticClass:"modal-body p-0 mh-100",staticStyle:{"background-color":"transparent",overflow:"unset"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("客戶名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.CustomerFullName,expression:"sendData.CustomerFullName",modifiers:{trim:!0}}],attrs:{type:"text",disabled:"",placeholder:"客戶名稱"},domProps:{value:t.sendData.CustomerFullName},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"CustomerFullName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("客戶代號")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.CustomerID,expression:"sendData.CustomerID",modifiers:{trim:!0}}],attrs:{type:"text",disabled:"",placeholder:"客戶代號"},domProps:{value:t.sendData.CustomerID},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"CustomerID",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("統一編號")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.TaxID,expression:"sendData.TaxID",modifiers:{trim:!0}}],attrs:{type:"text",disabled:"",placeholder:"統一編號"},domProps:{value:t.sendData.TaxID},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"TaxID",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("聯絡人")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.Contact,expression:"sendData.Contact",modifiers:{trim:!0}}],attrs:{type:"text",disabled:"",placeholder:"聯絡人"},domProps:{value:t.sendData.Contact},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"Contact",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("div",{staticClass:"col-sm-12 col-md-6"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("聯絡人電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.TEL_NO,expression:"sendData.TEL_NO",modifiers:{trim:!0}}],attrs:{type:"text",disabled:"",placeholder:"聯絡人電話"},domProps:{value:t.sendData.TEL_NO},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"TEL_NO",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])]),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"退換貨原因"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("退換貨原因")]),a("VSelect",{attrs:{disabled:t.isDisabled,getOptionLabel:function(t){return t.ReasonDesc},placeholder:"請選擇",valueFormat:"object",options:t.allReturnReason,reduce:function(t){return t.ReasonCode}},on:{input:t.sendReturnData},model:{value:t.sendData.RtnReasons,callback:function(e){t.$set(t.sendData,"RtnReasons",e)},expression:"sendData.RtnReasons"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}])}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"退貨人"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("退貨人名稱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.ReceiveName,expression:"sendData.ReceiveName",modifiers:{trim:!0}}],attrs:{type:"text",disabled:t.isDisabled,placeholder:"退貨人名稱"},domProps:{value:t.sendData.ReceiveName},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"ReceiveName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}])}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"連絡電話"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("退貨人連絡電話")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.ReceiveContact,expression:"sendData.ReceiveContact",modifiers:{trim:!0}}],attrs:{type:"text",disabled:t.isDisabled,placeholder:"退貨人連絡電話"},domProps:{value:t.sendData.ReceiveContact},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"ReceiveContact",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}])}),a("VP",{staticClass:"col-sm-12 col-md-6",attrs:{rules:"required",name:"付款方式"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("付款方式")]),a("VSelect",{attrs:{disabled:t.isDisabled,getOptionLabel:function(t){return t.NF003},placeholder:"請選擇",valueFormat:"object",options:t.allPayTerm,reduce:function(t){return t.NF002}},on:{input:t.sendReturnData},model:{value:t.sendData.PaymentTerms,callback:function(e){t.$set(t.sendData,"PaymentTerms",e)},expression:"sendData.PaymentTerms"}},[a("span",{attrs:{slot:"no-options"},slot:"no-options"},[t._v("暫無資料")])])],1),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}])}),a("VP",{staticClass:"col-sm-12 col-md-12",attrs:{rules:"required",name:"退貨地址"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.errors;return[a("div",{staticClass:"field",class:r[0]?" mb-0":""},[a("div",{staticClass:"field-name"},[t._v("退貨地址")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.ReceiveAddress,expression:"sendData.ReceiveAddress",modifiers:{trim:!0}}],attrs:{disabled:t.isDisabled,type:"text",placeholder:"退貨地址"},domProps:{value:t.sendData.ReceiveAddress},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"ReceiveAddress",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),r?a("span",{staticClass:"mb-2 font-weight-bold text-danger small"},[t._v(" "+t._s(r[0])+" ")]):t._e()]}}])}),a("div",{staticClass:"col-sm-12 col-md-12"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-name"},[t._v("備註")]),a("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.sendData.Memo,expression:"sendData.Memo",modifiers:{trim:!0}}],staticClass:"pl-2",attrs:{readonly:t.isDisabled,placeholder:"備註"},domProps:{value:t.sendData.Memo},on:{change:t.sendReturnData,input:function(e){e.target.composing||t.$set(t.sendData,"Memo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})])])],1)])])])}),c=[],l=(a("a434"),{name:"ReturnTemplate",props:{confirmProduct:{type:Array,required:!0},allReturnReason:{type:Array,required:!0},allPayTerm:{type:Array,required:!0},customer:{type:Object,required:!0},isDisabled:{type:Boolean,required:!0},returnData:{type:Object}},data:function(){return{currentObj:{},allReturn:[],sendData:{CustomerFullName:"",CustomerID:"",Contact:"",TEL_NO:"",TaxID:"",RtnReasons:"",ReceiveName:"",ReceiveContact:"",PaymentTerms:"",ReceiveAddress:"",Memo:""}}},methods:{checkQuantity:function(t){var e=this;e.currentObj=Object(n["a"])({},t),e.currentObj.cardQuantity>e.currentObj.ReturnableQuantity&&(t.cardQuantity=e.currentObj.ReturnableQuantity,e.$notify({title:"提示",message:"退貨數量不得大於可退貨數量",type:"warning",duration:3500})),e.$emit("getAllReturnQTY")},sendReturnData:function(){var t=this;t.$emit("getReturnData",t.sendData)},delItem:function(t){var e=this;e.allReturn.splice(t,1),e.$store.commit("SUREPRODUCT",e.allReturn)}},watch:{confirmProduct:function(t){var e=this;e.allReturn=t},returnData:function(t){var e=this;e.sendData=t}},mounted:function(){var t=this;t.allReturn=t.confirmProduct,t.sendData={CustomerFullName:t.customer.CustomerFullName,CustomerID:t.customer.CustomerID,Contact:t.customer.Contact,TEL_NO:t.customer.TEL_NO,TaxID:t.customer.TaxID,RtnReasons:"",ReceiveName:t.customer.Owner,ReceiveContact:t.customer.TEL_NO,PaymentTerms:"",ReceiveAddress:t.customer.Address,Memo:""},t.$store.commit("ISLOADING",!1)},components:{},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}}),d=l,u=a("2877"),m=Object(u["a"])(d,i,c,!1,null,null,null),f=m.exports,v=a("6e77"),p=a("a9de"),C=a("16f6"),b=a("5214"),D=a("882c"),h=a("329e"),y=a("2f62"),_=a("2b61"),R=a("2ddf"),g={name:"AllReturnWork",mixins:[v["a"],p["a"],C["a"]],data:function(){return{allReturnReason:[],allPayTerm:[],totalExchangeQuantity:0,keyData:1,returnData:{},customer:JSON.parse(localStorage.getItem("customer")),confirmProduct:[],tempProduct:[],UnitPrice:[],allReturnQTY:1,totalPrice:0}},methods:{checkOrder:function(){$("#commoncheckmodal").modal("show")},confirmReturn:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,0!==a.confirmProduct.length){e.next=4;break}return a.$notify({title:"提示",message:"請先選擇商品",type:"warning",duration:3500}),e.abrupt("return",!1);case 4:return e.next=6,a.getUnitPrice(a.getUnitFormat(a.confirmProduct));case 6:a.$notify({title:"成功",message:"退貨成功",type:"success",duration:3500}),a.$router.push({name:"OrderFinish",params:{text:"退貨單"}});case 8:case"end":return e.stop()}}),e)})))()},sendData:function(){var t=this;t.concatProduct("tempProduct","confirmProduct"),t.$store.commit("SUREPRODUCT",t.confirmProduct),$("#aftersalemodal").modal("hide")},searchData:function(){var t=this,e=t.$refs.AfterSaleModal.searchBox,a=e.productSeries?e.productSeries.Code:"",r="".concat("https://api.yahome-test.com.tw/HiqbioApi","/Inventory/Return/GetReturnableProduct?customerId=").concat(t.customer.CustomerID,"&productSeries=").concat(a,"&productClass=").concat(e.productType,"&whseId=").concat(e.WhseName,"&keyword=").concat(e.keyword);t.$store.commit("ISLOADING",!0),t.$http.get(r).then((function(e){if(e.data.Status>=200&&e.data.Status<300){var a=[];e.data.Data.some((function(e){var r=!1;t.confirmProduct.some((function(t){if(e.ProductId===t.ProductId&&e.ProductName===t.ProductName)return r=!0,!0})),r||a.push(e)})),t.tempProduct=a}else t.$notify({title:"錯誤",message:e.data.ErrorMessage,type:"error",duration:3500});t.$store.commit("ISLOADING",!1)})).catch((function(){t.$store.commit("ISLOADING",!1)}))},removeProduct:function(){var t=this;t.tempProduct=[]},getReturnData:function(t){var e=this;e.returnData=Object(n["a"])({},t)},getUnitFormat:function(t){var e=this,a=[],r={};return t.forEach((function(t){var r={ProductId:t.ProductId.trim(),PayTermCode:e.returnData.PaymentTerms,Quantity:t.cardQuantity?t.cardQuantity:1};a.push(r)})),r={Products:a},r},getAllReturnQTY:function(){var t=this,e=0;t.confirmProduct.length>0?t.confirmProduct.forEach((function(t){e+=Number(t.cardQuantity)})):e=0,t.allReturnQTY=e},getUnitPrice:function(){var t=this;t.confirmProduct.forEach((function(t){t.UnitPrice=10}));var e=0;t.confirmProduct.forEach((function(t){e+=t.cardQuantity*t.UnitPrice})),t.totalPrice=e}},mounted:function(){var t=this;t.$store.commit("HEADER","退貨作業"),t.$store.commit("ISWELCOME",!1),t.$store.commit("ISGOBACK",!0),0===JSON.parse(localStorage.getItem("sureProduct")).length&&t.$router.back(),t.confirmProduct=t.$route.params.confirmProduct||t.localSureProduct,t.allReturnReason=R.Data,t.allPayTerm=_.Data,t.$store.commit("ISLOADING",!1)},watch:{confirmProduct:function(t){var e=this;e.keyData+=1,e.getAllReturnQTY(),0===t.length&&(e.totalPrice=0)},"returnData.PaymentTerms":function(t){var e=this;t&&e.getUnitPrice(e.getUnitFormat(e.confirmProduct))}},computed:Object(n["a"])({saleInfo:function(){return JSON.parse(localStorage.getItem("saleInfo"))},customerData:function(){return JSON.parse(localStorage.getItem("customer"))}},Object(y["b"])({localSureProduct:"confirmProduct"})),components:{ReturnTemplate:f,AfterSaleModal:b["a"],Table:D["a"],CheckModal:h["a"]},destroyed:function(){$(".modal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}},P=g,N=Object(u["a"])(P,r,s,!1,null,null,null);e["default"]=N.exports},"882c":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("table",{staticClass:"common-datatable datatable stripe order-column w-100"},[t._m(0),a("tbody",{staticClass:"line"},t._l(t.confirmProduct,(function(e){return a("tr",{key:e.ProductGuid},[a("td",[t._v(t._s(e.ProductId))]),a("td",{staticClass:"tdShort"},[t._v(" "+t._s(e.ProductName)+"/"+t._s(e.Specification)+" ")]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UOM))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.OrderQuantity))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.ReturnableQuantity))]),a("td",{staticClass:"text-center"},[a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.IsConfirm,expression:"product.IsConfirm"}],attrs:{disabled:"",type:"checkbox"},domProps:{checked:Array.isArray(e.IsConfirm)?t._i(e.IsConfirm,null)>-1:e.IsConfirm},on:{change:function(a){var r=e.IsConfirm,s=a.target,n=!!s.checked;if(Array.isArray(r)){var o=null,i=t._i(r,o);s.checked?i<0&&t.$set(e,"IsConfirm",r.concat([o])):i>-1&&t.$set(e,"IsConfirm",r.slice(0,i).concat(r.slice(i+1)))}else t.$set(e,"IsConfirm",n)}}}),a("i",{staticClass:"fas fa-check-square text-secondary"})])])])})),0),a("tbody",t._l(t.tempProduct,(function(e){return a("tr",{key:e.ProductGuid},[a("td",[t._v(t._s(e.ProductId))]),a("td",{staticClass:"tdShort"},[t._v(" "+t._s(e.ProductName)+"/"+t._s(e.Specification)+" ")]),a("td",{staticClass:"text-center"},[t._v(t._s(e.UOM))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.OrderQuantity))]),a("td",{staticClass:"text-center"},[t._v(t._s(e.ReturnableQuantity))]),a("td",{staticClass:"text-center"},[a("label",{staticClass:"y-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.IsConfirm,expression:"product.IsConfirm"}],attrs:{name:"IsConfirm",type:"checkbox"},domProps:{checked:Array.isArray(e.IsConfirm)?t._i(e.IsConfirm,null)>-1:e.IsConfirm},on:{change:function(a){var r=e.IsConfirm,s=a.target,n=!!s.checked;if(Array.isArray(r)){var o=null,i=t._i(r,o);s.checked?i<0&&t.$set(e,"IsConfirm",r.concat([o])):i>-1&&t.$set(e,"IsConfirm",r.slice(0,i).concat(r.slice(i+1)))}else t.$set(e,"IsConfirm",n)}}}),a("i",{staticClass:"fas fa-check-square"})])])])})),0)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("品號")]),a("th",[t._v("品名/規格")]),a("th",{staticClass:"text-center"},[t._v("單位")]),a("th",{staticClass:"text-center"},[t._v("銷售數量")]),a("th",{staticClass:"text-center"},[t._v("可退貨數量")]),a("th",{staticClass:"text-center"},[t._v("選擇產品")])])])}],n={name:"ReturnModalTemplate",props:{tempProduct:{type:Array,required:!0},confirmProduct:{type:Array}}},o=n,i=a("2877"),c=Object(i["a"])(o,r,s,!1,null,null,null);e["a"]=c.exports}}]);