<template>
  <div class="table-wrap" :key="keyData">
    <table class="w-100 common-datatable datatable stripe order-column">
      <thead>
        <tr class="text-center">
          <th>品號</th>
          <th><!-- 是否掛單、 --></th>
          <th>品名/規格</th>
          <th>庫存量</th>
          <th>訂購數量</th>
          <th>寄倉數量</th>
          <th>售價(含稅)</th>
          <th>小計(含稅)</th>
          <th><!-- 移除 --></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) of allProduct"
          :key="`${product.ProductGuid}-${product.IsPending}`"
        >
          <td>{{ product.ItemNo }}</td>
          <td>
            <span class="pendingOrder" v-show="product.IsPending">掛單</span>
          </td>
          <td>{{ product.ItemName }}/{{ product.Specification }}</td>
          <td class="text-center">{{ product.InvQty }}</td>

          <VP
            tag="td"
            name="訂購數量"
            rules="max_value:9999|min_value:1"
            v-slot="errors"
          >
            <!-- 傳入的值為: 此欄位的數量、訂購還寄倉判斷、索引值、該行的 Guid、分店資料 -->
            <!-- 數量不能用 lazy，會報錯... -->
            <input
              class="w-100"
              type="number"
              max="9999"
              placeholder="請輸入數量"
              :disabled="product.IsPending && product.InvQty > 0"
              v-model.number="product.orderQuantity"
              @keyup="checkQuantity(product, '訂購')"
              @change="checkQuantity(product, '訂購')"
            />
            <span v-if="errors" class="text-danger small font-weight-bold">{{
              errors[0]
            }}</span>
          </VP>
          <VP
            name="寄倉數量"
            v-slot="errors"
            tag="td"
            rules="max_value:9999|min_value:0"
          >
            <input
              class="w-100"
              type="number"
              placeholder="請輸入數量"
              :disabled="product.IsPending"
              v-model.number="product.warehousesNum"
              @keyup="checkQuantity(product, '寄倉')"
              @change="checkQuantity(product, '寄倉')"
            />
            <span v-if="errors" class="text-danger small font-weight-bold">{{
              errors[0]
            }}</span>
          </VP>
          <td class="text-center">
            {{ product.UnitPrice }}
          </td>
          <td class="text-center">
            {{ product.orderQuantity * product.UnitPrice || 0 }}
          </td>
          <td>
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

      <!-- ref 和 Guid 是判斷哪張選單要打開的依據 -->
      <!-- ref 不是傳入的值，而是使用 v-bind 綁定 ref 屬性。 -->
      <InventoryShortageModal
        :ref="currentObj.ProductGuid"
        :Guid="currentObj.ProductGuid"
        :InvQty="currentObj.InvQty"
        :screenTotal="Number(currentObj.orderQuantity)"
        :currentValue="Number(currentObj.orderQuantity)"
        :totalMinusScreen="Number(currentObj.orderQuantity - currentObj.InvQty)"
        @confirmQuantity="InventoryShortItem"
        @returnMax="returnMax"
      ></InventoryShortageModal>
    </table>
  </div>
</template>

<script>
/* global $ */
import InventoryShortageModal from "@/components/CommonModal/InventoryShortageModal.vue";

export default {
  name: "PRTemplate_Single",
  props: {
    prProduct: Array,
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
    checkQuantity(product, type) {
      const vm = this;

      if (type === "寄倉") {
        if (product.warehousesNum > product.orderQuantity) {
          vm.$notify({
            title: "提示",
            message: "寄倉數量不得大於訂購數量",
            type: "warning",
            duration: 5000,
          });
          vm.$nextTick(() => {
            product.warehousesNum = product.orderQuantity;
          });
          return;
        }
      }

      // 因為 table 標籤裡面只能放相關的標籤，所已把單一項的資料傳到這個物件裡。
      vm.currentObj = { ...product };

      // 如果不是掛單
      // 畫面總數 > 庫存量和相減數量小於 0 就跳出庫存不足
      if (!vm.currentObj.IsPending) {
        if (vm.currentObj.orderQuantity > vm.currentObj.InvQty) {
          vm.$nextTick(() => {
            let element = vm.$refs[vm.currentObj.ProductGuid].$el;
            $(element).modal("show");
          });
        }
      }

      vm.$nextTick(() => {
        // 把值傳出去
        vm.$emit("exportAllQuantity");
      });
    },

    // 庫存不足新增一筆資料
    // 從庫存不足 Modal 裡面把值傳出來
    InventoryShortItem(val, type, orderOrWare) {
      this.print("整批還分批", type);
      const vm = this;

      // 因為跟總店訂購共用元件的關係，傳出來的屬性要改變一下。
      let tempVal = {};
      vm.allProduct.some((item) => {
        if (item.ProductGuid === val.Guid) {
          tempVal = {
            ...item,
            IsPartialDelivery: val.IsPartialDelivery,
            orderQuantity: type
              ? val.PartialDeliveryQuantity
              : val.orderQuantity, // 如果是分批就接收 PartialDeliveryQuantity，整批則是 orderQuantity
            IsPending: true,
          };
        }
      });

      // 如果是分批才會新增一筆
      if (type) {
        vm.allProduct.some((order, index) => {
          if (order.ProductGuid === tempVal.ProductGuid && order.IsPending) {
            vm.delItem(index);
            return true;
          }
        });

        // 插入的位置在該筆相關聯的掛單底下，不是直接 push 到最下面，跟之後判斷有關。
        vm.allProduct.some((order, index) => {
          if (order.ProductGuid === tempVal.ProductGuid) {
            vm.allProduct.splice(index + 1, 0, tempVal);
            return true;
          }
        });

        // 兩個 ProductGuid 會一樣，所以取第一個
        // 目前的值 - 庫存不足 Modal 的值
        vm.allProduct.some((order) => {
          if (order.ProductGuid === tempVal.ProductGuid) {
            let isOrderOrWare =
              orderOrWare === "訂購" ? "orderQuantity" : "warehousesNum";
            order[isOrderOrWare] =
              order[isOrderOrWare] - tempVal[isOrderOrWare];
            return true;
          }
        });
      }
      // 整批不產生新的一筆，只有自己會產生掛單。
      else {
        vm.allProduct.some((order, index) => {
          if (order.ProductGuid === tempVal.ProductGuid && order.IsPending) {
            vm.delItem(index);
            return true;
          }
        });

        // 相同 ProductGuid 就顯示掛單
        vm.allProduct.some((order) => {
          this.print("庫存不足 Modal 傳出來的資料", tempVal);
          if (order.ProductGuid === tempVal.ProductGuid && !order.IsPending) {
            order.IsPending = true;
            order.orderQuantity = tempVal.orderQuantity;

            vm.keyData += 1;
            return true;
          }
        });
      }
    },

    // 點擊關閉庫存不足 Modal，不做任何操作，會把原先超過的值改為庫存量。
    returnMax(Guid) {
      const vm = this;
      vm.currentObj.orderQuantity = vm.currentObj.InvQty;

      vm.allProduct.some((order) => {
        if (order.ProductGuid === Guid) {
          order.orderQuantity = vm.currentObj.InvQty;
          vm.$emit("exportAllQuantity");
          return true;
        }
      });
    },

    // 刪除某間分店
    delItem(key) {
      const vm = this;
      vm.allProduct.some((item, index) => {
        if (key === index) {
          return true;
        }
      });

      vm.allProduct.splice(key, 1);

      vm.$emit("removeTemplate", true);
    },
  },
  watch: {
    // 只有第一次進來會改變到
    allQuantity() {
      const vm = this;
      vm.$emit("exportAllQuantity");
    },
  },
  computed: {
    // 只有第一次近來會改變到
    allQuantity() {
      const vm = this;
      return vm.allProduct.map((item) => {
        return Number(item.orderQuantity);
      });
    },
  },
  mounted() {
    const vm = this;
    vm.allProduct = vm.prProduct;
  },
  components: {
    InventoryShortageModal,
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
