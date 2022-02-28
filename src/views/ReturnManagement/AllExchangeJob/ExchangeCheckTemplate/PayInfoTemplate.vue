<template>
  <section class="line">
    <div class="row">
      <!-- ****************付款資訊區塊****************** -->
      <VP
        class="col-sm-12 col-md-6"
        rules="required"
        name="付款方式"
        v-slot="{ errors }"
      >
        <div class="field" :class="errors[0] ? ' mb-0' : ''">
          <div class="field-name">付款方式</div>
          <VSelect
            :getOptionLabel="(opt) => opt.NF003"
            placeholder="請選擇"
            valueFormat="object"
            :options="allPayTerm"
            v-model="sendData.PaymentTerms"
            :reduce="(opt) => opt.NF002"
            @input="sendExchangeData"
          >
            <span slot="no-options">暫無資料</span>
          </VSelect>
        </div>
        <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
          {{ errors[0] }}
        </span>
      </VP>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="field">
          <div class="field-name">換貨總金額</div>
          <input
            type="number"
            placeholder="換貨總金額"
            v-model.number="total"
            disabled
          />
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="field">
          <div class="field-name">總計差額</div>
          <input
            type="number"
            placeholder="總計差額"
            v-model.number="difference"
            disabled
          />
        </div>
      </div>
      <!-- 如果大於 0 才需要顯示 -->
      <template v-if="difference > 0">
        <VP
          class="col-sm-12 col-md-6"
          rules="required"
          name="不開統編"
          v-slot="{ errors }"
        >
          <div class="field">
            <div class="field-name">不開統編</div>
            <div class="switchBox">
              <div class="switchBox_content">
                <label class="switchBox_content_box">
                  <input
                    :disabled="IsTaxIdDisabled"
                    class="switchBox_content_box_input"
                    type="radio"
                    id="NotTaxId_Y"
                    name="NotTaxId"
                    :value="true"
                    v-model="sendData.NotTaxId"
                    @click="
                      sendData.NotTaxId = true;
                      sendExchangeData();
                    "
                  />
                  <span class="switchBox_content_box_text">是</span>
                </label>
                <label class="switchBox_content_box">
                  <input
                    :disabled="IsTaxIdDisabled"
                    class="switchBox_content_box_input"
                    type="radio"
                    id="NotTaxId_N"
                    name="NotTaxId"
                    :value="false"
                    v-model="sendData.NotTaxId"
                    @click="
                      sendData.NotTaxId = false;
                      sendExchangeData();
                    "
                  />
                  <span class="switchBox_content_box_text">否</span>
                </label>
              </div>
            </div>
          </div>
          <span v-if="errors[0]" class="text-danger font-weight-bold small">{{
            errors[0]
          }}</span>
        </VP>

        <!-- B2B 為 N，B2C 可變更，不開統編為 Y 是選填。 -->
        <VP
          :rules="sendData.NotTaxId ? '' : 'required'"
          name="統一編號"
          class="col-sm-12 col-md-6"
          v-slot="{ errors }"
        >
          <div class="field">
            <div class="field-name">統一編號</div>

            <input
              :disabled="IsTaxIdDisabled"
              type="text"
              placeholder="統一編號"
              v-model.trim="sendData.TaxId"
              @change="sendExchangeData"
            />
            <span class="text-danger font-weight-bold small" v-if="errors">{{
              errors[0]
            }}</span>
          </div>
        </VP>

        <VP
          class="col-sm-12 col-md-6"
          rules="required"
          name="隨貨附發票"
          v-slot="{ errors }"
        >
          <div class="field">
            <div class="field-name">隨貨附發票</div>
            <div class="switchBox">
              <div class="switchBox_content">
                <label class="switchBox_content_box">
                  <input
                    :disabled="IsTaxIdDisabled"
                    class="switchBox_content_box_input"
                    type="radio"
                    id="AttachInvoice_Y"
                    name="AttachInvoice"
                    :value="true"
                    v-model="sendData.AttachInvoice"
                    @click="
                      sendData.AttachInvoice = true;
                      sendExchangeData();
                    "
                  />
                  <span class="switchBox_content_box_text">是</span>
                </label>
                <label class="switchBox_content_box">
                  <input
                    :disabled="IsTaxIdDisabled"
                    class="switchBox_content_box_input"
                    type="radio"
                    id="AttachInvoice_N"
                    name="AttachInvoice"
                    :value="false"
                    v-model="sendData.AttachInvoice"
                    @click="
                      sendData.AttachInvoice = false;
                      sendExchangeData();
                    "
                  />
                  <span class="switchBox_content_box_text">否</span>
                </label>
              </div>
            </div>
          </div>
          <span v-if="errors" class="mb-2 font-weight-bold text-danger small">
            {{ errors[0] }}
          </span>
        </VP>

        <div class="col-sm-12 col-md-6">
          <div class="field">
            <div class="field-name">發票收件人名稱</div>
            <input
              type="text"
              placeholder="發票收件人名稱"
              v-model.trim="sendData.InvoiceName"
              :disabled="!sendData.AttachInvoice"
              @change="sendExchangeData"
            />
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="field">
            <div class="field-name">發票收件人電話</div>
            <input
              type="text"
              placeholder="發票收件人電話"
              v-model.trim="sendData.InvoiceContact"
              :disabled="!sendData.AttachInvoice"
              @change="sendExchangeData"
            />
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <div class="field">
            <div class="field-name">發票地址</div>
            <input
              type="text"
              placeholder="發票地址"
              v-model.trim="sendData.InvoiceAddress"
              :disabled="!sendData.AttachInvoice"
              @change="sendExchangeData"
            />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: "ExchangePayInfoTemplate",
  props: {
    allPayTerm: {
      type: Array,
      required: true,
    },
    allReturnReason: {
      type: Array,
      required: true,
    },
    difference: {
      type: Number,
      required: true,
    },
    allExchangePrice: {
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
        PaymentTerms: "",
        NotTaxId: false,
        TaxId: "",
        AttachInvoice: true,
        InvoiceName: "",
        InvoiceContact: "",
        InvoiceAddress: "",
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
    IsTaxIdDisabled(n) {
      const vm = this;
      if (n) {
        vm.sendData.NotTaxId = false; // B2B 為 N 且 disabled
      }
    },
    allExchangePrice(n) {
      const vm = this;
      vm.total = n;
    },
  },
  computed: {
    // 是否為 B2B
    // 如果 UTypeName 前三碼為"B2B"，則不允許統編編輯；若前三碼為"B2C"，則可以允許變更。
    IsTaxIdDisabled() {
      if (
        JSON.parse(localStorage.getItem("customer")).UTypeName.slice(0, 3) ===
        "B2B"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    const vm = this;
    vm.sendData = {
      PaymentTerms: "",
      NotTaxId: false,
      TaxId: vm.customer.TaxID,
      AttachInvoice: true,
      InvoiceName: vm.customer.Contact,
      InvoiceContact: vm.customer.TEL_NO,
      InvoiceAddress: vm.customer.InvoiceAddress,
    };
  },
};
</script>
