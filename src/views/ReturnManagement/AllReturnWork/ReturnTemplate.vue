<template>
  <article>
    <div class="table-wrap mb-3">
      <table class="w-100 common-datatable datatable stripe order-column">
        <thead>
          <tr class="text-center">
            <th>品號</th>
            <th>品名/規格</th>
            <th>銷貨數量</th>
            <th>可退貨的數量</th>
            <th>退貨數量</th>
            <th v-if="!isDisabled"><!-- 刪除 --></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) of allReturn" :key="product.Guid">
            <td>{{ product.ProductId }}</td>
            <td>{{ product.ProductName }}/{{ product.Specification }}</td>
            <td class="text-center">{{ product.OrderQuantity }}</td>
            <td class="text-center">{{ product.ReturnableQuantity }}</td>
            <VP
              tag="td"
              name="退貨數量"
              :rules="`max_value:${product.ReturnableQuantity}|min_value:1`"
            >
              <input
                :disabled="isDisabled"
                class="w-100"
                type="number"
                max="999"
                min="1"
                placeholder="請輸入數量"
                v-model.number="product.cardQuantity"
                @keyup="checkQuantity(product)"
                @change="checkQuantity(product)"
              />
            </VP>
            <td v-if="!isDisabled">
              <button
                type="button"
                class="btn btn_danger"
                @click="delItem(index)"
              >
                移除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 退貨資訊 -->
    <section
      class="modal-content border-0"
      style="background-color: transparent"
    >
      <div
        class="modal-body p-0 mh-100"
        style="background-color: transparent; overflow: unset"
      >
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="field">
              <div class="field-name">客戶名稱</div>
              <input
                type="text"
                disabled
                placeholder="客戶名稱"
                v-model.trim="sendData.CustomerFullName"
                @change="sendReturnData"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="field">
              <div class="field-name">客戶代號</div>
              <input
                type="text"
                disabled
                placeholder="客戶代號"
                v-model.trim="sendData.CustomerID"
                @change="sendReturnData"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="field">
              <div class="field-name">統一編號</div>
              <input
                type="text"
                disabled
                placeholder="統一編號"
                v-model.trim="sendData.TaxID"
                @change="sendReturnData"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="field">
              <div class="field-name">聯絡人</div>
              <input
                type="text"
                disabled
                placeholder="聯絡人"
                v-model.trim="sendData.Contact"
                @change="sendReturnData"
              />
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="field">
              <div class="field-name">聯絡人電話</div>
              <input
                type="text"
                disabled
                placeholder="聯絡人電話"
                v-model.trim="sendData.TEL_NO"
                @change="sendReturnData"
              />
            </div>
          </div>

          <VP
            class="col-sm-12 col-md-6"
            rules="required"
            name="退換貨原因"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">退換貨原因</div>
              <VSelect
                :disabled="isDisabled"
                :getOptionLabel="(opt) => opt.ReasonDesc"
                placeholder="請選擇"
                valueFormat="object"
                :options="allReturnReason"
                v-model="sendData.RtnReasons"
                :reduce="(opt) => opt.ReasonCode"
                @input="sendReturnData"
              >
                <span slot="no-options">暫無資料</span>
              </VSelect>
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <VP
            class="col-sm-12 col-md-6"
            rules="required"
            name="退貨人"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">退貨人名稱</div>
              <input
                type="text"
                :disabled="isDisabled"
                placeholder="退貨人名稱"
                v-model.trim="sendData.ReceiveName"
                @change="sendReturnData"
              />
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <VP
            class="col-sm-12 col-md-6"
            rules="required"
            name="連絡電話"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">退貨人連絡電話</div>
              <input
                type="text"
                :disabled="isDisabled"
                placeholder="退貨人連絡電話"
                v-model.trim="sendData.ReceiveContact"
                @change="sendReturnData"
              />
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <VP
            class="col-sm-12 col-md-6"
            rules="required"
            name="付款方式"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">付款方式</div>
              <VSelect
                :disabled="isDisabled"
                :getOptionLabel="(opt) => opt.NF003"
                placeholder="請選擇"
                valueFormat="object"
                :options="allPayTerm"
                v-model="sendData.PaymentTerms"
                @input="sendReturnData"
                :reduce="(opt) => opt.NF002"
              >
                <span slot="no-options">暫無資料</span>
              </VSelect>
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <VP
            class="col-sm-12 col-md-12"
            rules="required"
            name="退貨地址"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">退貨地址</div>
              <input
                :disabled="isDisabled"
                type="text"
                placeholder="退貨地址"
                v-model.trim="sendData.ReceiveAddress"
                @change="sendReturnData"
              />
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <div class="col-sm-12 col-md-12">
            <div class="field">
              <div class="field-name">備註</div>
              <textarea
                :readonly="isDisabled"
                placeholder="備註"
                class="pl-2"
                v-model.trim="sendData.Memo"
                @change="sendReturnData"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
/* global $ */
export default {
  name: "ReturnTemplate",
  props: {
    confirmProduct: {
      type: Array,
      required: true,
    },
    allReturnReason: {
      type: Array,
      required: true,
    },
    allPayTerm: {
      type: Array,
      required: true,
    },
    customer: {
      type: Object,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
    // 因為畫面填寫跟唯獨共用元件，所以唯獨的話就需要使用 returnData
    returnData: {
      type: Object,
    },
  },
  data() {
    return {
      currentObj: {}, // 正在操作的該項產品
      allReturn: [], // 傳進來的退貨品項
      // keyData: 1, // 偵測渲染用

      sendData: {
        CustomerFullName: "",
        CustomerID: "",
        Contact: "",
        TEL_NO: "",
        TaxID: "",
        RtnReasons: "",
        ReceiveName: "",
        ReceiveContact: "",
        PaymentTerms: "",
        ReceiveAddress: "",
        Memo: "",
      },
    };
  },
  methods: {
    // 檢查數量，假如大於庫存就顯示 Modal
    checkQuantity(product) {
      const vm = this;

      // 因為 table 標籤裡面只能放相關的標籤，所已把單一項的資料傳到這個物件裡。
      vm.currentObj = { ...product };

      // 畫面總數 > 庫存量和相減數量小於 0 就跳出庫存不足
      if (vm.currentObj.cardQuantity > vm.currentObj.ReturnableQuantity) {
        product.cardQuantity = vm.currentObj.ReturnableQuantity;
        vm.$notify({
          title: "提示",
          message: "退貨數量不得大於可退貨數量",
          type: "warning",
          duration: 3500,
        });
      }

      vm.$emit("getAllReturnQTY");
    },
    sendReturnData() {
      const vm = this;
      vm.$emit("getReturnData", vm.sendData);
    },
    delItem(index) {
      const vm = this;
      vm.allReturn.splice(index, 1);
      vm.$store.commit("SUREPRODUCT", vm.allReturn);
    },
  },
  watch: {
    confirmProduct(n) {
      const vm = this;
      vm.allReturn = n;
    },
    returnData(n) {
      const vm = this;
      vm.sendData = n;
    },
  },
  mounted() {
    const vm = this;
    vm.allReturn = vm.confirmProduct;

    vm.sendData = {
      CustomerFullName: vm.customer.CustomerFullName,
      CustomerID: vm.customer.CustomerID,
      Contact: vm.customer.Contact,
      TEL_NO: vm.customer.TEL_NO,
      TaxID: vm.customer.TaxID,
      RtnReasons: "",
      ReceiveName: vm.customer.Owner,
      ReceiveContact: vm.customer.TEL_NO,
      PaymentTerms: "",
      ReceiveAddress: vm.customer.Address,
      Memo: "",
    };
    vm.$store.commit("ISLOADING", false);
  },
  components: {},
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
