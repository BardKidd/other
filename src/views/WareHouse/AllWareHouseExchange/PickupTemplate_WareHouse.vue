<template>
  <div class="table-wrap mb-3" :key="keyData">
    <table class="w-100 common-datatable datatable stripe order-column">
      <thead>
        <tr class="text-center">
          <th>品號</th>
          <th>品名/規格</th>
          <th>寄倉數量</th>
          <th v-if="!isDisabled">可取貨數量</th>
          <th>取貨數量</th>
          <th v-if="!isDisabled"><!-- 移除 --></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) of allProduct" :key="`${product.Guid}`">
          <td>{{ product.ProductId }}</td>
          <td>{{ product.ProductName }}/{{ product.Specification }}</td>
          <td class="text-center">
            {{ product.OrderQuantity }}
          </td>
          <td class="text-center" v-if="!isDisabled">
            {{ product.PickableQuantity }}
          </td>
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
  name: "PickupTemplate_WareHouseExchange",
  props: {
    pickupRows: {
      type: Array,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  data() {
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

      vm.currentObj = { ...product };

      if (vm.currentObj.cardQuantity > vm.currentObj.PickableQuantity) {
        product.cardQuantity = vm.currentObj.PickableQuantity;
        vm.$notify({
          title: "提示",
          message: "取貨數量不得大於可取貨數量",
          type: "warning",
          duration: 3500,
        });
      }

      vm.$emit("getPickupData");
    },

    delItem(index) {
      const vm = this;
      vm.allProduct.splice(index, 1);
      vm.$store.commit("SUREPRODUCT", vm.allProduct);
    },
  },
  watch: {
    pickupRows(n) {
      const vm = this;
      vm.allProduct = n;
    },
  },
  mounted() {
    const vm = this;
    vm.allProduct = vm.pickupRows;
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
