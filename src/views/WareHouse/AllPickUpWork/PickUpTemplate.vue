<template>
  <article>
    <div class="table-wrap">
      <table class="w-100 common-datatable datatable stripe order-column">
        <thead>
          <tr class="text-center">
            <th>品號</th>
            <th>品名/規格</th>
            <th>寄倉數量</th>
            <th>可取貨數量</th>
            <th>取貨數量</th>
            <th>小計</th>
            <th v-if="!isDisabled"><!-- 移除 --></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) of allProduct" :key="product.Guid">
            <td>{{ product.ProductId }}</td>
            <td>{{ product.ProductName }}/{{ product.Specification }}</td>
            <td class="text-center">{{ product.OrderQuantity }}</td>
            <td class="text-center">{{ product.PickableQuantity }}</td>
            <VP
              tag="td"
              name="需兌換的數量"
              :rules="`max_value:${product.PickableQuantity}|min_value:1`"
            >
              <input
                class="w-100"
                type="number"
                max="999"
                min="1"
                placeholder="請輸入數量"
                :disabled="isDisabled"
                v-model.number="product.cardQuantity"
                @keyup="checkQuantity(product)"
                @change="checkQuantity(product)"
              />
            </VP>
            <td class="text-center">
              {{ product.cardQuantity * product.UnitPrice }}
            </td>
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
                @change="sendPickupData"
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
                @change="sendPickupData"
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
                @change="sendPickupData"
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
                @change="sendPickupData"
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
                @change="sendPickupData"
              />
            </div>
          </div>

          <VP
            tag="div"
            class="col-sm-12 col-md-6"
            rules="required"
            name="取貨人"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">取貨人名稱</div>
              <input
                type="text"
                :disabled="isDisabled"
                placeholder="取貨人名稱"
                v-model.trim="sendData.ReceiveName"
                @change="sendPickupData"
              />
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <VP
            tag="div"
            class="col-sm-12 col-md-6"
            rules="required"
            name="連絡電話"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">取貨人連絡電話</div>
              <input
                type="text"
                :disabled="isDisabled"
                placeholder="取貨人連絡電話"
                v-model.trim="sendData.ReceiveContact"
                @change="sendPickupData"
              />
            </div>
            <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
              {{ errors[0] }}
            </span>
          </VP>

          <VP
            tag="div"
            class="col-sm-12 col-md-12"
            rules="required"
            name="取貨地址"
            v-slot="{ errors }"
          >
            <div class="field" :class="errors[0] ? ' mb-0' : ''">
              <div class="field-name">取貨地址</div>
              <input
                :disabled="isDisabled"
                type="text"
                placeholder="取貨地址"
                v-model.trim="sendData.ReceiveAddress"
                @change="sendPickupData"
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
                @change="sendPickupData"
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
  name: "PickUpTemplate",
  props: {
    pickupRows: {
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
    // 因為畫面填寫跟唯獨共用元件，所以唯獨的話就需要使用 pickupData
    pickupData: {
      type: Object,
    },
  },
  data() {
    return {
      allProduct: [], // 傳進來的訂購品項
      currentObj: {}, // 正在操作的該項產品

      sendData: {
        CustomerFullName: "",
        CustomerID: "",
        Contact: "",
        TEL_NO: "",
        TaxID: "",
        ReceiveName: "",
        ReceiveContact: "",
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
      if (vm.currentObj.cardQuantity > vm.currentObj.PickableQuantity) {
        product.cardQuantity = vm.currentObj.PickableQuantity;
        vm.$notify({
          title: "提示",
          message: "取貨數量不得大於可取貨數量",
          type: "warning",
          duration: 3500,
        });
      }
      vm.$emit("getTotalData");
    },
    sendPickupData() {
      const vm = this;
      vm.$emit("getPickupData", vm.sendData);
    },
    delItem(index) {
      const vm = this;
      vm.allProduct.splice(index, 1);
      vm.$store.commit("SUREPRODUCT", vm.allProduct);
    },
  },
  watch: {
    pickupData(n) {
      const vm = this;
      vm.sendData = n;
    },
  },
  mounted() {
    const vm = this;
    vm.allProduct = vm.pickupRows;
    vm.sendData = {
      CustomerFullName: vm.customer.CustomerFullName,
      CustomerID: vm.customer.CustomerID,
      Contact: vm.customer.Contact,
      TEL_NO: vm.customer.TEL_NO,
      TaxID: vm.customer.TaxID,
      ReceiveName: vm.customer.Contact,
      ReceiveContact: vm.customer.TEL_NO,
      ReceiveAddress: vm.customer.Address,
      Memo: "",
    };
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
