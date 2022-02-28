<template>
  <div
    :id="Guid"
    :ref="Guid"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered">
      <VO class="modal-content" tag="section" v-slot="{ handleSubmit }">
        <div class="modal-header">庫存不足</div>

        <div class="modal-body">
          <div class="table-wrap mt-5">
            <div class="alert-check">
              商品庫存量為:
              <span class="font-weight-bold">{{ InvQty }}</span>
              ，現已訂購量:
              <span class="font-weight-bold">{{ screenTotal }}</span>
              ，剩餘數量:
              <span class="font-weight-bold">{{ totalMinusScreen }}</span
              >。
              <div>
                請選擇出貨方式:
                <label class="y-checkbox mr-2">
                  <input
                    type="radio"
                    name="sendtype"
                    :value="true"
                    v-model="InventoryOrder.Type"
                  />
                  <i class="fas fa-check-square"></i>
                  分批
                </label>

                <label class="y-checkbox">
                  <input
                    type="radio"
                    name="sendtype"
                    :value="false"
                    v-model="InventoryOrder.Type"
                  />
                  <i class="fas fa-check-square"></i>
                  整批
                </label>
              </div>
            </div>
            <VP
              v-if="InventoryOrder.Type"
              name="出貨數量"
              :rules="`required|integer|min_value:${Math.abs(
                totalMinusScreen
              )}|max_value:${currentValue}`"
              v-slot="{ errors }"
            >
              <input
                type="number"
                class="commonInput ml-2 d-block"
                placeholder="請輸入出貨數量"
                checked
                v-model.number="InventoryOrder.exportQuantity"
              />
              <span
                v-if="errors"
                class="ml-2 text-danger font-weight-bold small"
              >
                {{ errors[0] }}
              </span>
            </VP>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="reset"
            class="btn btn_cancel"
            data-dismiss="modal"
            @click="clearContent(false)"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn_primary"
            @click="handleSubmit(confirmQuantity)"
          >
            確定
          </button>
        </div>
      </VO>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: "InventoryShortageModal",
  props: {
    InvQty: Number, // 總庫存量
    inputType: String, // 寄倉還是訂購
    Guid: String, // 該行 DetailRow 的 Guid
    Store: Object, // 該行 DetailRow 所選的商店
    screenTotal: Number, // 畫面上目前的總訂購量(在分店訂購這兩個值會一樣)
    totalMinusScreen: Number, // 庫存減畫面上的量
    currentValue: Number, // 目前輸入框正在輸入的值(在分店訂購這兩個值會一樣)
  },
  data() {
    return {
      InventoryOrder: {
        Type: true, // true 為分批
        exportQuantity: 0,
      },
      // 用來接收傳入的 Type 是訂購還是寄倉
      currentType: "訂購",
      // 用來接收傳入的 index 是多少，保持跟呼叫這個 Modal 一樣的 index。
      currentIndex: 0,
    };
  },
  methods: {
    // 商品不足，選擇分批或整批後把新的訂購數量送出
    confirmQuantity() {
      const vm = this;
      let sendData = {};

      // 如果是整批就直接帶畫面輸入的值，否則就帶輸入框的值
      let tempQuantity = vm.InventoryOrder.Type
        ? vm.InventoryOrder.exportQuantity
        : vm.currentValue;
      sendData = {
        IsPartialDelivery: vm.InventoryOrder.Type, // 是否分批
        PartialDeliveryQuantity: Number(vm.InventoryOrder.exportQuantity), // 分批出貨數量
        Guid: vm.Guid,
        IsPending: true,
        orderQuantity: tempQuantity,
        store: vm.Store,
        warehousesNum: 0,
      };
      // 如果是訂購就是 orderQuantity 欄位有值
      // if (vm.currentType === "訂購") {

      // }
      // 反之寄倉。寄倉欄位不會有庫存不足 Modal。
      // else {
      //   sendData = {
      //     IsPartialDelivery: vm.InventoryOrder.Type, // 是否分批
      //     PartialDeliveryQuantity: Number(vm.InventoryOrder.exportQuantity), // 分批出貨數量
      //     Guid: vm.Guid,
      //     IsPending: true,
      //     orderQuantity: 1,
      //     store: vm.Store,
      //     warehousesNum: vm.InventoryOrder.exportQuantity,
      //   };
      // }
      // 傳出去整行新資料、整批還是分批、寄倉還是訂購
      // this.print("confirmQuantity", sendData);
      vm.$emit(
        "confirmQuantity",
        sendData,
        vm.InventoryOrder.Type,
        vm.currentType
      );

      // 返回預設值
      vm.clearContent(true);
    },
    clearContent(hasChange) {
      const vm = this;
      vm.InventoryOrder = {
        Type: true,
        exportQuantity: 0,
      };

      // 如果有變更就不觸發該事件，該事件用於不填任何數值直接關閉庫存不足 Modal 時。
      if (!hasChange) {
        vm.$emit("returnMax", vm.Guid); // 關閉 Modal 的話把超出的值改為庫存量
      }
      vm.$nextTick(() => {
        let element = vm.$refs[vm.Guid];
        $(element).modal("hide");
      });
    },
  },
  watch: {
    inputType(n) {
      if (n) {
        this.currentType = n;
      }
    },
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
