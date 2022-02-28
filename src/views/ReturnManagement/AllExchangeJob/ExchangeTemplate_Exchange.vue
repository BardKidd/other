<template>
  <div class="table-wrap mb-3" :key="keyData">
    <table class="w-100 common-datatable datatable stripe order-column">
      <thead>
        <tr class="text-center">
          <th>品號</th>
          <th class="tdShort">品名/規格</th>
          <th>庫存量</th>
          <th>換購數量</th>
          <th>單價(含稅)</th>
          <th>小計(含稅)</th>
          <th v-if="!isDisabled"><!-- 移除 --></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) of allProduct" :key="`${product.Guid}`">
          <td>{{ product.ItemNo }}</td>
          <td class="tdShort">
            {{ product.ItemName }}/{{ product.Specification }}
          </td>
          <td class="text-center">{{ product.InvQty }}</td>
          <VP
            tag="td"
            name="換貨數量"
            rules="max_value:999|min_value:1|required"
            v-slot="errors"
          >
            <input
              class="w-100"
              type="number"
              max="999"
              :disabled="isDisabled"
              placeholder="請輸入數量"
              v-model.number="product.cardQuantity"
              @keyup="checkQuantity(product)"
              @change="checkQuantity(product)"
            />
            <span v-if="errors" class="text-danger small font-weight-bold">{{
              errors[0]
            }}</span>
          </VP>
          <td class="text-center">{{ product.UnitPrice }}</td>
          <td class="text-center">
            {{ product.cardQuantity * product.UnitPrice || 0 }}
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
</template>

<script>
/* global $ */

export default {
  name: "AllExchangeExchange",
  props: {
    exchangeRows: {
      type: Array,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    // 單店訂購採用淺層複製，子元件改變，父元件資料因為吃同個記憶體所以也會跟著改變，就不像總店訂購一樣用深層複製了。
    return {
      allProduct: [], // 傳進來的訂購品項
      currentObj: {}, // 正在操作的該項產品

      keyData: 1, // 偵測渲染用
    };
  },
  methods: {
    // 檢查數量，假如大於庫存就顯示 Modal
    checkQuantity(product) {
      const vm = this;

      // 因為 table 標籤裡面只能放相關的標籤，所已把單一項的資料傳到這個物件裡。
      vm.currentObj = { ...product };

      // 畫面總數 > 庫存量和相減數量小於 0 就跳出庫存不足
      if (vm.currentObj.cardQuantity > vm.currentObj.InvQty) {
        product.cardQuantity = vm.currentObj.InvQty;
        vm.$notify({
          title: "提示",
          message: "換購數量不得大於庫存量",
          type: "warning",
          duration: 3500,
        });
      }

      vm.$emit("getAllExchangeQTY");
    },

    // 刪除某間分店
    delItem(index) {
      const vm = this;

      vm.allProduct.splice(index, 1);
    },
  },
  watch: {
    exchangeRows(n) {
      const vm = this;
      vm.allProduct = n;
    },
  },

  mounted() {
    const vm = this;

    // 第一次進來取這裡的值，不是 watch
    vm.allProduct = vm.exchangeRows;
  },
  components: {
    // InventoryShortageModal,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
