<template>
  <div
    id="readonlycheck"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered"
    >
      <section class="modal-content">
        <div class="modal-body p-0 overflow-hidden">
          <div class="order-detail row">
            <!-- 左區塊，客戶資訊 -->
            <div class="info col-sm-12 col-md-3 col-lg-3">
              <h3>{{ customerData.HQName }}</h3>
              <div>{{ customerData.HQCode }}</div>

              <table>
                <tr>
                  <td><i class="fas fa-barcode"></i></td>
                  <td>{{ customerData.TaxID }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-phone-volume"></i></td>
                  <td>{{ customerData.InvoiceName }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-headset"></i></td>
                  <td>{{ customerData.InvoiceContact }}</td>
                </tr>
              </table>
            </div>
            <div class="list col-md-9 col-lg-9 col-sm-12">
              <div class="p-3">
                <!-- 表頭 -->
                <section class="invoice-block line">
                  <div class="row" v-if="detailData.isHeadquarters">
                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">發票資訊</div>
                        <label>
                          <input
                            type="radio"
                            name="in-info"
                            disabled
                            :value="true"
                            v-model="detailData.IsHeadquarterInvoice"
                          />
                          <span>1.總店號發票合併</span>
                        </label>
                        <label>
                          <input
                            disabled
                            type="radio"
                            name="in-info"
                            :value="false"
                            v-model="detailData.IsHeadquarterInvoice"
                          />
                          <span>2.分店分別寄送</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="invoice-detail">
                    <div class="row">
                      <div class="col-sm-12 col-md-6">
                        <div class="field">
                          <div class="field-name">客戶代碼(總店號)</div>
                          <input
                            type="text"
                            disabled
                            placeholder="客戶代碼(總店號)"
                            v-model="detailData.HQCode"
                          />
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-6">
                        <div class="field">
                          <div class="field-name">客戶名稱(總店號)</div>
                          <input
                            type="text"
                            disabled
                            placeholder="客戶名稱(總店號)"
                            v-model="detailData.HQName"
                          />
                        </div>
                      </div>

                      <template v-if="detailData.IsHeadquarterInvoice">
                        <div class="col-sm-12 col-md-6">
                          <div class="field">
                            <div class="field-name">付款方式</div>
                            <input
                              disabled
                              placeholder="付款方式"
                              v-model="detailData.Payment"
                            />
                          </div>
                        </div>

                        <!-- B2B 為 N，B2C 可變更 -->
                        <div class="col-sm-12 col-md-6">
                          <div class="field">
                            <div class="field-name">不開統編</div>
                            <div class="switchBox">
                              <div class="switchBox_content">
                                <label class="switchBox_content_box">
                                  <input
                                    class="switchBox_content_box_input"
                                    type="radio"
                                    disabled
                                    name="WithTaxID"
                                    :value="true"
                                    v-model="detailData.WithTaxID"
                                  />
                                  <span class="switchBox_content_box_text"
                                    >是</span
                                  >
                                </label>
                                <label class="switchBox_content_box">
                                  <input
                                    class="switchBox_content_box_input"
                                    type="radio"
                                    disabled
                                    name="WithTaxID"
                                    :value="false"
                                    v-model="detailData.WithTaxID"
                                  />
                                  <span class="switchBox_content_box_text"
                                    >否</span
                                  >
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- B2B 為 N，B2C 可變更，不開統編為 Y 才是必填。 -->
                        <div class="col-sm-12 col-md-6">
                          <div class="field">
                            <div class="field-name">統一編號</div>

                            <input
                              disabled
                              type="text"
                              placeholder="統一編號"
                              v-model.trim="detailData.TaxID"
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
                                    class="switchBox_content_box_input"
                                    type="radio"
                                    disabled
                                    name="InvoiceName"
                                    :value="true"
                                    v-model="detailData.InvoiceName"
                                  />
                                  <span class="switchBox_content_box_text"
                                    >是</span
                                  >
                                </label>
                                <label class="switchBox_content_box">
                                  <input
                                    class="switchBox_content_box_input"
                                    type="radio"
                                    disabled
                                    name="InvoiceName"
                                    :value="false"
                                    v-model="detailData.InvoiceName"
                                  />
                                  <span class="switchBox_content_box_text"
                                    >否</span
                                  >
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
                              v-model.trim="detailData.InvoiceName"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                          <div class="field">
                            <div class="field-name">發票收件人電話</div>
                            <input
                              type="text"
                              placeholder="發票收件人電話"
                              v-model.trim="detailData.InvoiceContact"
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
                              v-model.trim="detailData.InvoiceAddress"
                              disabled
                            />
                          </div>
                        </div>
                      </template>

                      <div class="col-sm-12 col-md-12">
                        <div class="field">
                          <div class="field-name">備註</div>
                          <textarea
                            class="pl-2"
                            maxlength="400"
                            readonly
                            v-model.trim="detailData.Remark"
                            placeholder="備註"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- 分店資訊 -->
                <section
                  class="line"
                  v-for="branch of store"
                  :key="branch.OrderId"
                >
                  <div class="table-title">
                    <span
                      >{{ branch.store.CustomerShtName
                      }}{{ branch.store.CustomerID }}-訂購品項
                    </span>
                  </div>
                  <div class="table-wrap">
                    <table
                      class="common-datatable datatable stripe order-column w-100"
                    >
                      <thead>
                        <tr>
                          <th>品號</th>
                          <th><!-- 掛單、寄倉 --></th>
                          <th>品名/規格</th>
                          <th>訂購數量</th>
                          <th>寄倉數量</th>
                          <th>性質</th>
                          <th>售價(含稅)</th>
                          <th>小計(含稅)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- 因為有可能是同個 Guid 所以 key 值多給一些變化，否則無法顯示 -->
                        <tr
                          v-for="product of branch.productData"
                          :key="`${product.OrderStoreProductId}${product.PendingTo}`"
                        >
                          <td>{{ product.ItemNo }}</td>
                          <td>
                            <span>
                              <span
                                class="pendingOrder d-block mb-1"
                                v-if="!product.PendingTo && product.IsPending"
                                >掛單
                              </span>
                              <span
                                class="pendingOrder d-block"
                                v-if="product.DepositQTY > 0"
                                >寄倉
                              </span>
                            </span>
                          </td>
                          <td>
                            {{ product.ItemName }}
                          </td>
                          <td class="text-center">
                            {{ product.OrderQTY }}
                          </td>
                          <td class="text-center">
                            {{ product.DepositQTY }}
                          </td>
                          <td v-if="!product.Free">訂購</td>
                          <td v-else>公關品項</td>
                          <td class="text-center">{{ product.UnitPrice }}</td>
                          <td class="text-center">
                            {{ product.UnitPrice * product.OrderQTY }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="row mt-3">
                    <div class="col-sm-12 col-md-6">
                      <div class="field">
                        <div class="field-name">送貨日期</div>
                        <input
                          disabled
                          type="text"
                          placeholder="送貨日期"
                          v-model.trim="branch.branchData.DeliveryDate"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6">
                      <div class="field">
                        <div class="field-name">送貨時段</div>
                        <input
                          disabled
                          type="text"
                          placeholder="送貨時段"
                          v-model="branch.branchData.DeliveryTimeCode"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6">
                      <div class="field">
                        <div class="field-name">收貨人名稱</div>
                        <input
                          disabled
                          type="text"
                          placeholder="收貨人名稱"
                          v-model.trim="branch.branchData.ReceiveName"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6">
                      <div class="field">
                        <div class="field-name">收貨人連絡電話</div>
                        <input
                          disabled
                          type="text"
                          placeholder="收貨人連絡電話"
                          v-model.trim="branch.branchData.ReceiveContact"
                        />
                      </div>
                    </div>

                    <!-- 分店發票欄位 -->
                    <template v-if="!detailData.IsHeadquarterInvoice">
                      <div class="col-sm -12 col-md-6">
                        <div class="field">
                          <div class="field-name">付款方式</div>
                          <input
                            v-model="branch.branchData.Payment"
                            disabled
                            placeholder="付款方式"
                            type="text"
                          />
                        </div>
                      </div>
                      <!-- B2B 為 N，B2C 可變更 -->
                      <div class="col-sm-12 col-md-6">
                        <div class="field">
                          <div class="field-name">不開統編</div>
                          <div class="switchBox">
                            <div class="switchBox_content">
                              <label class="switchBox_content_box">
                                <input
                                  class="switchBox_content_box_input"
                                  type="radio"
                                  id="NotTaxId_Y"
                                  :value="true"
                                  disabled
                                  v-model="branch.branchData.WithTaxID"
                                />
                                <span class="switchBox_content_box_text"
                                  >是</span
                                >
                              </label>
                              <label class="switchBox_content_box">
                                <input
                                  class="switchBox_content_box_input"
                                  type="radio"
                                  id="NotTaxId_N"
                                  :value="false"
                                  disabled
                                  v-model="branch.branchData.WithTaxID"
                                />
                                <span class="switchBox_content_box_text"
                                  >否</span
                                >
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
                            v-model="branch.branchData.TaxID"
                            type="text"
                            placeholder="統一編號"
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
                                  class="switchBox_content_box_input"
                                  type="radio"
                                  disabled
                                  :value="true"
                                  v-model="branch.branchData.InvoiceAttached"
                                />
                                <span class="switchBox_content_box_text"
                                  >是</span
                                >
                              </label>
                              <label class="switchBox_content_box">
                                <input
                                  class="switchBox_content_box_input"
                                  type="radio"
                                  disabled
                                  :value="false"
                                  v-model="branch.branchData.InvoiceAttached"
                                />
                                <span class="switchBox_content_box_text"
                                  >否</span
                                >
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
                            disabled
                            v-model="branch.branchData.InvoiceName"
                          />
                        </div>
                      </div>

                      <div class="col-sm-12 col-md-6">
                        <div class="field">
                          <div class="field-name">發票收件人電話</div>
                          <input
                            type="text"
                            placeholder="發票收件人電話"
                            disabled
                            v-model="branch.branchData.InvoiceContact"
                          />
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-12">
                        <div class="field">
                          <div class="field-name">發票地址</div>
                          <input
                            v-model="branch.branchData.InvoiceAddress"
                            type="text"
                            placeholder="發票地址"
                            disabled
                          />
                        </div>
                      </div>
                    </template>

                    <div class="col-sm-12 col-md-4">
                      <div class="field">
                        <div class="field-name">手續費</div>
                        <input
                          type="text"
                          v-model="branch.branchData.Charge"
                          placeholder="手續費"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-4">
                      <div class="field">
                        <div class="field-name">運費</div>
                        <input
                          type="text"
                          v-model="branch.branchData.Fare"
                          placeholder="運費"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-4">
                      <div class="field">
                        <div class="field-name">分店總計</div>
                        <input
                          type="text"
                          placeholder="分店總計"
                          disabled
                          v-model="branch.branchData.Subtotal"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">收貨地址</div>
                        <input
                          type="text"
                          placeholder="收貨地址"
                          disabled
                          v-model.trim="branch.branchData.ReceiveAddress"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">備註</div>
                        <textarea
                          placeholder="備註"
                          class="pl-2"
                          readonly
                          v-model.trim="branch.branchData.BranchRemark"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- 表尾 -->
                <div class="invoice-detail">
                  <div class="row">
                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">總金額</div>
                        <input
                          type="text"
                          placeholder="總金額"
                          disabled
                          v-model="total"
                        />
                      </div>
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
      </section>
    </div>
  </div>
</template>

<script>
import { OrderProcessing } from "@/mixins/orderProcessing.js";
// import { getPayTerm } from "@/commonAPI/api.js";
import { mapState } from "vuex";

// 未串接 API 所以直接引入 JSON 檔。
import payTerm from "@/data/Other/PayTerm.json";

/* global $ */
export default {
  name: "ReadOnlyCheckModal",
  mixins: [OrderProcessing],
  props: {
    DeliveryTime: {
      type: Array,
      required: true,
    },
    IsViewDetail: {
      type: Boolean,
      required: true,
    },
    branchStore: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      startDate: "",
      allPayTerm: [],
      Payment: false, // 付款方式，帶選取後會傳入 sendData。
      detailData: {}, // Row 那一列的資料

      store: [], // 分店的資料

      // 總金額
      total: 0,
    };
  },

  mounted() {
    const vm = this;
    vm.$store.commit("ISLOADING", true);
    vm.allPayTerm = payTerm.Data;
    // vm.axios.all([getPayTerm()]).then(
    //   vm.axios.spread((allPayTerm) => {
    //     vm.allPayTerm = allPayTerm.data.Data;
    //   })
    // );
    vm.$store.commit("ISLOADING", false);
  },
  watch: {
    customerData(n) {
      // Row 那一列的資料
      const vm = this;
      vm.detailData = n;
    },
    detailData(n) {
      const vm = this;

      // 左區塊為空的話
      if (!n.InvoiceContact) {
        n.InvoiceContact = vm.rows[0]?.TEL_NO;
      }
      if (!n.InvoiceName) {
        n.InvoiceName = vm.rows[0]?.Contact;
      }
      if (!n.TaxID) {
        n.TaxID = vm.rows[0]?.TaxID;
      }

      // 總店的付款方式中文
      if (n.Payment) {
        vm.detailData.Payment = vm.allPayTerm.find((item) => {
          return item.NF002 === n.Payment;
        });
        vm.detailData.Payment = vm.detailData.Payment.NF003;
      }
    },
    branchStore(n) {
      const vm = this;
      // 跟複製訂單共用 branchStore，所以要多加這個判斷，避免紅字
      if (vm.IsViewDetail) {
        vm.store = n;
      }
    },
    store(n) {
      const vm = this;
      n.forEach((branch) => {
        branch.productData.forEach((product) => {
          // 計算分店總計
          branch.branchData.Subtotal =
            branch.branchData.Charge +
            branch.branchData.Fare +
            product.UnitPrice * product.OrderQTY;
        });
        vm.total += branch.branchData.Subtotal;

        // 送貨日期
        branch.branchData.DeliveryDate = branch.branchData.DeliveryDate.split(
          "T"
        )[0];

        // 送貨時段中文
        branch.branchData.DeliveryTimeCode = vm.DeliveryTime.find((item) => {
          return item.Code === branch.branchData.DeliveryTimeCode;
        }).Name;

        // 付款方式中文
        branch.branchData.Payment = vm.allPayTerm.find((item) => {
          return item.NF002 === branch.branchData.Payment;
        }).NF003;
      });
    },
  },
  computed: {
    customerData() {
      return this.$store.state.customerData;
    },
    ...mapState({
      rows: "customerRows",
    }),
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
