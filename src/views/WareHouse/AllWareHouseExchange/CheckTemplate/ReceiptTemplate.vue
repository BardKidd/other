<template>
  <section class="line">
    <div class="row"></div>
    <div class="row">
      <VP
        class="col-sm-12 col-md-6"
        rules="required"
        name="換貨原因"
        v-slot="{ errors }"
      >
        <div class="field" :class="errors[0] ? ' mb-0' : ''">
          <div class="field-name">換貨原因</div>
          <VSelect
            :getOptionLabel="(opt) => opt.ReasonDesc"
            placeholder="請選擇"
            valueFormat="object"
            :options="allReturnReason"
            v-model="sendData.RtnReasons"
            :reduce="(opt) => opt.ReasonCode"
            @input="sendExchangeData"
          >
            <span slot="no-options">暫無資料</span>
          </VSelect>
        </div>
        <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
          {{ errors[0] }}
        </span>
      </VP>
      <div class="col-sm-12 col-md-6">
        <div class="field">
          <div class="field-name">退貨總金額</div>
          <input
            type="number"
            placeholder="退貨總金額"
            v-model.number="total"
            disabled
          />
        </div>
      </div>

      <VP
        class="col-sm-12 col-md-6"
        rules="required"
        name="收貨人"
        v-slot="{ errors }"
      >
        <div class="field" :class="errors[0] ? ' mb-0' : ''">
          <div class="field-name">收貨人名稱</div>
          <input
            type="text"
            placeholder="退貨人名稱"
            v-model.trim="sendData.ReceiveName"
            @change="sendExchangeData"
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
          <div class="field-name">收貨人連絡電話</div>
          <input
            type="text"
            placeholder="收貨人連絡電話"
            v-model.trim="sendData.ReceiveContact"
            @change="sendExchangeData"
          />
        </div>
        <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
          {{ errors[0] }}
        </span>
      </VP>
      <VP
        class="col-sm-12 col-md-12"
        rules="required"
        name="收貨地址"
        v-slot="{ errors }"
      >
        <div class="field" :class="errors[0] ? ' mb-0' : ''">
          <div class="field-name">收貨地址</div>
          <input
            type="text"
            placeholder="收貨地址"
            v-model.trim="sendData.ReceiveAddress"
            @change="sendExchangeData"
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
            placeholder="備註"
            class="pl-2"
            v-model.trim="sendData.Memo"
            @change="sendExchangeData"
          ></textarea>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WareHouseReceiptTemplate",
  props: {
    allReturnReason: {
      type: Array,
      required: true,
    },
    allPickupPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sendData: {
        RtnReasons: "",
        ReceiveName: "",
        ReceiveContact: "",
        ReceiveAddress: "",
        Memo: "",
      },
      total: 0,
    };
  },
  methods: {
    sendExchangeData() {
      const vm = this;
      vm.$emit("getOther", vm.sendData);
    },
  },
  watch: {
    allPickupPrice(n) {
      const vm = this;
      vm.total = n;
    },
  },
  mounted() {
    const vm = this;
    vm.sendData = {
      RtnReasons: "",
      ReceiveName: vm.customer.Owner,
      ReceiveContact: vm.customer.TEL_NO,
      ReceiveAddress: vm.customer.Address,
      Memo: "",
    };
  },
};
</script>
