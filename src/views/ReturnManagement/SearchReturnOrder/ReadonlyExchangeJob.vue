<template>
  <div
    id="readonlyexchangejob"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered
      "
    >
      <VO tag="section" class="modal-content">
        <div class="modal-body p-0 overflow-hidden">
          <div class="order-detail row">
            <!-- 左區塊，客戶資訊 -->
            <div class="info col-sm-12 col-md-3 col-lg-3">
              <h3>{{ orderDetail.CustomerFullName }}</h3>
              <div>{{ orderDetail.CustomerId }}</div>

              <table>
                <tr>
                  <td><i class="fas fa-barcode"></i></td>
                  <td>{{ orderDetail.TaxID }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-phone-volume"></i></td>
                  <td>{{ orderDetail.Contact }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-headset"></i></td>
                  <td>{{ orderDetail.ContactTel }}</td>
                </tr>
              </table>
            </div>

            <div class="list col-md-9 col-lg-9 col-sm-12">
              <div class="p-3">
                <!-- 退貨資訊 -->
                <div class="table-title">
                  <span>退貨明細 </span>
                </div>
                <div class="table-wrap">
                  <table
                    class="common-datatable datatable stripe order-column w-100"
                  >
                    <thead>
                      <tr>
                        <th>品號</th>
                        <th class="tdShort">品名/規格</th>
                        <th>退貨數量</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="row of returnRows"
                        :key="row.ProductReturnDetailId"
                      >
                        <td>{{ row.ItemNo }}</td>
                        <td class="tdShort">
                          {{ row.ItemName }}/{{ row.Variant }}
                        </td>
                        <td class="text-center">
                          {{ row.ReturnQty }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">退貨總數量</div>
                      <input
                        type="text"
                        disabled
                        placeholder="客戶名稱"
                        v-model.trim="orderDetail.ReturnTotalQty"
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">客戶名稱</div>
                      <input
                        type="text"
                        disabled
                        placeholder="客戶名稱"
                        v-model.trim="orderDetail.CustomerFullName"
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">客戶代號</div>
                      <input
                        type="text"
                        disabled
                        placeholder="客戶代號"
                        v-model.trim="orderDetail.CustomerId"
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
                        v-model.trim="orderDetail.TaxID"
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
                        v-model.trim="orderDetail.Contact"
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
                        v-model.trim="orderDetail.ContactTel"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">退換貨原因</div>
                      <input
                        type="text"
                        placeholder="退換貨原因"
                        v-model.trim="orderDetail.ReturnReasonCode"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">退貨人名稱</div>
                      <input
                        type="text"
                        placeholder="退貨人名稱"
                        v-model.trim="orderDetail.ReturnContact"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">退貨人連絡電話</div>
                      <input
                        type="text"
                        placeholder="退貨人連絡電話"
                        v-model.trim="orderDetail.ReturnContactTel"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">付款方式</div>
                      <input
                        disabled
                        type="text"
                        placeholder="付款方式"
                        v-model.trim="orderDetail.PaymentTermsCode"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-12">
                    <div class="field">
                      <div class="field-name">退貨地址</div>
                      <input
                        disabled
                        type="text"
                        placeholder="退貨地址"
                        v-model.trim="orderDetail.ReturnAddress"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-12">
                    <div class="field">
                      <div class="field-name">備註</div>
                      <textarea
                        readonly
                        placeholder="備註"
                        class="pl-2"
                        v-model.trim="orderDetail.Memo"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- 換貨明細 -->
                <div class="table-title">
                  <span>換貨明細 </span>
                </div>
                <div class="table-wrap">
                  <table
                    class="common-datatable datatable stripe order-column w-100"
                  >
                    <thead>
                      <tr>
                        <th>品號</th>
                        <th class="tdShort">品名/規格</th>
                        <th>換貨數量</th>
                        <th>小計(含稅)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="row of exchangeData.ExchangeProducts"
                        :key="row.ProductReturnExchangeId"
                      >
                        <td>{{ row.ItemNo }}</td>
                        <td class="tdShort">
                          {{ row.ItemName }}/{{ row.Variant }}
                        </td>
                        <td class="text-center">
                          {{ row.ExchangeQty }}
                        </td>
                        <td class="text-center">
                          {{ row.LineAmount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 換貨資訊 -->
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">總計差額</div>
                      <input
                        type="number"
                        placeholder="總計差額"
                        v-model.number="orderDetail.difference"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">換貨總數量</div>
                      <input
                        type="number"
                        placeholder="換貨總金額"
                        v-model.number="exchangeData.ExchangeTotalQty"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">換貨總金額</div>
                      <input
                        type="number"
                        placeholder="換貨總金額"
                        v-model.number="exchangeData.ExchangeTotalAmount"
                        disabled
                      />
                    </div>
                  </div>

                  <!-- 如果大於 0 才需要顯示 -->
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">不開統編</div>
                      <div class="switchBox">
                        <div class="switchBox_content">
                          <label class="switchBox_content_box">
                            <input
                              disabled
                              class="switchBox_content_box_input"
                              type="radio"
                              id="NotTaxId_Y"
                              name="NotTaxId"
                              :value="true"
                              v-model="exchangeData.NoTax"
                            />
                            <span class="switchBox_content_box_text">是</span>
                          </label>
                          <label class="switchBox_content_box">
                            <input
                              disabled
                              class="switchBox_content_box_input"
                              type="radio"
                              id="NotTaxId_N"
                              name="NotTaxId"
                              :value="false"
                              v-model="exchangeData.NoTax"
                            />
                            <span class="switchBox_content_box_text">否</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- B2B 為 N，B2C 可變更，不開統編為 Y 是選填。 -->
                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">統一編號</div>

                      <input
                        disabled
                        type="text"
                        placeholder="統一編號"
                        v-model.trim="exchangeData.Tax"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">隨貨附發票</div>
                      <div class="switchBox">
                        <div class="switchBox_content">
                          <label class="switchBox_content_box">
                            <input
                              disabled
                              class="switchBox_content_box_input"
                              type="radio"
                              id="AttachInvoice_Y"
                              name="AttachInvoice"
                              :value="true"
                              v-model="exchangeData.InvoiceAttached"
                            />
                            <span class="switchBox_content_box_text">是</span>
                          </label>
                          <label class="switchBox_content_box">
                            <input
                              disabled
                              class="switchBox_content_box_input"
                              type="radio"
                              id="AttachInvoice_N"
                              name="AttachInvoice"
                              :value="false"
                              v-model="exchangeData.InvoiceAttached"
                            />
                            <span class="switchBox_content_box_text">否</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-6">
                    <div class="field">
                      <div class="field-name">發票收件人名稱</div>
                      <input
                        type="text"
                        placeholder="發票收件人名稱"
                        v-model.trim="exchangeData.InvoiceName"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-12">
                    <div class="field">
                      <div class="field-name">發票收件人電話</div>
                      <input
                        type="text"
                        placeholder="發票收件人電話"
                        v-model.trim="exchangeData.InvoiceContact"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-12">
                    <div class="field">
                      <div class="field-name">發票地址</div>
                      <input
                        type="text"
                        placeholder="發票地址"
                        v-model.trim="exchangeData.InvoiceAddress"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="reset"
                  class="btn btn_cancel"
                  data-dismiss="modal"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      </VO>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: "ReadonlyExchangeJob",
  props: {
    orderDetail: {
      type: Object,
      required: true,
    },
    returnRows: {
      type: Array,
      required: true,
    },
    exchangeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sendData: {
        Memo: "", // 備註
        ReceiveAddress: "", // 收獲地址
        ReceiveContact: "", // 收獲人聯絡電話
        ReceiveName: "", // 收獲人名稱
        DeliveryDate: "", // 送貨日期
      },

      keyData: 1,
    };
  },
  methods: {},
  mounted() {
    const vm = this;
    vm.$store.commit("ISLOADING", false);
  },
  watch: {},
  computed: {},
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
