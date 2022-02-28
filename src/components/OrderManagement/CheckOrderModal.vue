<template>
  <div
    id="check"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered"
    >
      <VO tag="section" v-slot="{ handleSubmit }" class="modal-content">
        <div class="modal-body p-0 overflow-hidden">
          <div class="order-detail row">
            <!-- 左區塊，客戶資訊 -->
            <div class="info col-sm-12 col-md-3 col-lg-3">
              <h3>{{ customerData.CustomerFullName }}</h3>
              <div>{{ customerData.CustomerID }}</div>

              <table>
                <tr>
                  <td><i class="fas fa-barcode"></i></td>
                  <td>{{ customerData.TaxID }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-phone-volume"></i></td>
                  <td>{{ customerData.Contact }}</td>
                </tr>
                <tr>
                  <td><i class="fas fa-headset"></i></td>
                  <td>{{ customerData.TEL_NO }}</td>
                </tr>
              </table>
            </div>
            <div class="list col-md-9 col-lg-9 col-sm-12">
              <div class="p-3">
                <!-- 表頭 -->
                <section class="invoice-block line">
                  <div class="row" v-if="IsMainStore">
                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">發票資訊</div>
                        <label>
                          <input
                            type="radio"
                            name="in-info"
                            :value="true"
                            v-model="sendData.IsHeadquarterInvoice"
                          />
                          <span>1.總店號發票合併</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="in-info"
                            :value="false"
                            v-model="sendData.IsHeadquarterInvoice"
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
                            v-model="sendData.CustomerId"
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
                            v-model="sendData.CustomerName"
                          />
                        </div>
                      </div>

                      <!-- 總店號發票合併才會顯示 -->
                      <template v-if="sendData.IsHeadquarterInvoice">
                        <VP
                          tag="div"
                          rules="required"
                          v-slot="{ errors }"
                          name="付款方式"
                          class="col-sm -12 col-md-6"
                        >
                          <div class="field">
                            <div class="field-name">付款方式</div>
                            <VSelect
                              :getOptionLabel="(opt) => opt.NF003"
                              placeholder="請選擇"
                              valueFormat="object"
                              :options="allPayTerm"
                              v-model="sendData.PayTermCode"
                              :reduce="(opt) => opt.NF002"
                              @input="getUnitPrice(sendData.PayTermCode, 'all')"
                            >
                              <span slot="no-options">暫無資料</span>
                            </VSelect>
                            <span
                              v-if="errors[0]"
                              class="small font-weight-bold text-danger"
                              >{{ errors[0] }}</span
                            >
                          </div>
                        </VP>
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
                                    name="NotTaxId"
                                    :value="true"
                                    v-model="sendData.NotTaxId"
                                    :disabled="IsTaxIdDisabled"
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
                                    name="NotTaxId"
                                    :value="false"
                                    v-model="sendData.NotTaxId"
                                    :disabled="IsTaxIdDisabled"
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
                            />
                            <span
                              class="text-danger font-weight-bold small"
                              v-if="errors"
                              >{{ errors[0] }}</span
                            >
                          </div>
                        </VP>

                        <div class="col-sm-12 col-md-6">
                          <div class="field">
                            <div class="field-name">隨貨附發票</div>
                            <div class="switchBox">
                              <div class="switchBox_content">
                                <label class="switchBox_content_box">
                                  <input
                                    class="switchBox_content_box_input"
                                    type="radio"
                                    id="AttachInvoice_Y"
                                    name="AttachInvoice"
                                    :value="true"
                                    v-model="sendData.AttachInvoice"
                                  />
                                  <span class="switchBox_content_box_text"
                                    >是</span
                                  >
                                </label>
                                <label class="switchBox_content_box">
                                  <input
                                    class="switchBox_content_box_input"
                                    type="radio"
                                    id="AttachInvoice_N"
                                    name="AttachInvoice"
                                    :value="false"
                                    v-model="sendData.AttachInvoice"
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
                              v-model.trim="sendData.InvoiceName"
                              :disabled="!sendData.AttachInvoice"
                            />
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                          <div class="field">
                            <div class="field-name">發票收件人電話</div>
                            <input
                              type="text"
                              placeholder="發票收件人電話"
                              v-model.trim="sendData.InvoiceContact"
                              :disabled="!sendData.AttachInvoice"
                            />
                          </div>
                        </div>
                        <VP
                          tag="div"
                          name="發票地址"
                          :rules="sendData.AttachInvoice ? 'required' : ''"
                          class="col-sm-12 col-md-12"
                          v-slot="{ errors }"
                        >
                          <div class="field">
                            <div class="field-name">發票地址</div>
                            <input
                              type="text"
                              placeholder="發票地址"
                              v-model.trim="sendData.InvoiceAddress"
                              :disabled="!sendData.AttachInvoice"
                            />
                            <span
                              v-if="errors"
                              class="mb-2 font-weight-bold text-danger small"
                            >
                              {{ errors[0] }}
                            </span>
                          </div>
                        </VP>
                      </template>

                      <div class="col-sm-12 col-md-12">
                        <div class="field">
                          <div class="field-name">備註</div>
                          <textarea
                            class="pl-2"
                            maxlength="400"
                            v-model.trim="sendData.Memo"
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
                  v-for="(branch, index) of branchStore"
                  :key="branch.Guid"
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
                          :key="`${product.ProductGuid}-${product.IsPending}-${product.orderQuantity}`"
                        >
                          <td>{{ product.ItemNo }}</td>
                          <td>
                            <span>
                              <!-- 掛單和寄倉不能同時出現 -->
                              <span
                                class="pendingOrder d-block mb-1"
                                v-if="
                                  product.IsPending &&
                                  product.warehousesNum === 0
                                "
                                >掛單
                              </span>
                              <span
                                class="pendingOrder d-block"
                                v-if="
                                  product.warehousesNum > 0 &&
                                  !product.IsPending
                                "
                                >寄倉
                              </span>
                            </span>
                          </td>
                          <td>
                            {{ product.ItemName }}
                          </td>
                          <td class="text-center">
                            {{ product.orderQuantity }}
                          </td>
                          <td class="text-center">
                            {{ product.warehousesNum }}
                          </td>
                          <td v-if="product.IsOrder">訂購</td>
                          <td v-else>公關品項</td>
                          <td class="text-center" v-if="product.IsOrder">
                            {{ product.UnitPrice }}
                          </td>
                          <td class="text-center" v-else>0</td>
                          <td class="text-center" v-if="product.IsOrder">
                            {{ product.UnitPrice * product.orderQuantity }}
                          </td>
                          <td class="text-center" v-else>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="row mt-2">
                    <VP
                      class="col-sm-12 col-md-6"
                      rules="required"
                      :name="`送貨日期${index + 1}`"
                      v-slot="{ errors }"
                    >
                      <div class="field">
                        <div class="field-name">送貨日期</div>
                        <DatePicker
                          :disabled-date="notDeliveryDate"
                          class="w-100 sameOtherField"
                          value-type="format"
                          format="YYYY-MM-DD"
                          v-model="branch.DeliveryDate"
                          placeholder="送貨日期"
                        >
                        </DatePicker>
                        <span
                          v-if="errors"
                          class="font-weight-bold text-danger small"
                        >
                          {{ errors[0] }}
                        </span>
                      </div>
                    </VP>
                    <VP
                      class="col-sm-12 col-md-6"
                      rules="required"
                      :name="`送貨時段${index + 1}`"
                      v-slot="{ errors }"
                    >
                      <div class="field" :class="errors[0] ? ' mb-0' : ''">
                        <div class="field-name">送貨時段</div>
                        <VSelect
                          :getOptionLabel="(opt) => opt.Name"
                          placeholder="請選擇"
                          valueFormat="object"
                          :options="allDeliveryTime"
                          v-model="branch.DeliveryTime"
                        >
                          <span slot="no-options">暫無資料</span>
                        </VSelect>
                      </div>
                      <span
                        v-if="errors"
                        class="mb-2 font-weight-bold text-danger small"
                      >
                        {{ errors[0] }}
                      </span>
                    </VP>
                    <VP
                      class="col-sm-12 col-md-6"
                      rules="required"
                      :name="`收貨人名稱${index + 1}`"
                      v-slot="{ errors }"
                    >
                      <div class="field" :class="errors[0] ? ' mb-0' : ''">
                        <div class="field-name">收貨人名稱</div>
                        <input
                          type="text"
                          placeholder="收貨人名稱"
                          v-model.trim="branch.ReceiveName"
                        />
                      </div>
                      <span
                        v-if="errors"
                        class="mb-2 font-weight-bold text-danger small"
                      >
                        {{ errors[0] }}
                      </span>
                    </VP>
                    <VP
                      class="col-sm-12 col-md-6"
                      rules="required"
                      :name="`連絡電話${index + 1}`"
                      v-slot="{ errors }"
                    >
                      <div class="field" :class="errors[0] ? ' mb-0' : ''">
                        <div class="field-name">收貨人連絡電話</div>
                        <input
                          type="text"
                          placeholder="收貨人連絡電話"
                          v-model.trim="branch.ReceiveContact"
                        />
                      </div>
                      <span
                        v-if="errors"
                        class="mb-2 font-weight-bold text-danger small"
                      >
                        {{ errors[0] }}
                      </span>
                    </VP>

                    <!-- 分店發票欄位 -->
                    <template v-if="!sendData.IsHeadquarterInvoice">
                      <VP
                        tag="div"
                        rules="required"
                        v-slot="{ errors }"
                        :name="`付款方式${index + 1}`"
                        class="col-sm -12 col-md-6"
                      >
                        <div class="field">
                          <div class="field-name">付款方式</div>
                          <VSelect
                            :getOptionLabel="(opt) => opt.NF003"
                            placeholder="請選擇"
                            valueFormat="object"
                            :options="allPayTerm"
                            v-model="branch.PayTermCode"
                            @input="getUnitPrice(branch.PayTermCode, index)"
                            :reduce="(opt) => opt.NF002"
                          >
                            <span slot="no-options">暫無資料</span>
                          </VSelect>
                          <span
                            v-if="errors[0]"
                            class="small font-weight-bold text-danger"
                            >{{ errors[0] }}</span
                          >
                        </div>
                      </VP>
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
                                  :name="`NotTaxId${index + 1}`"
                                  :value="true"
                                  v-model="branch.NotTaxId"
                                  :disabled="IsTaxIdDisabled"
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
                                  :name="`NotTaxId${index + 1}`"
                                  :value="false"
                                  v-model="branch.NotTaxId"
                                  :disabled="IsTaxIdDisabled"
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
                      <VP
                        :rules="branch.NotTaxId ? '' : 'required'"
                        :name="`統一編號${index + 1}`"
                        class="col-sm-12 col-md-6"
                        v-slot="{ errors }"
                      >
                        <div class="field">
                          <div class="field-name">統一編號</div>

                          <input
                            :disabled="IsTaxIdDisabled"
                            type="text"
                            placeholder="統一編號"
                            v-model.trim="branch.TaxId"
                          />
                          <span
                            class="text-danger font-weight-bold small"
                            v-if="errors"
                            >{{ errors[0] }}</span
                          >
                        </div>
                      </VP>

                      <div class="col-sm-12 col-md-6">
                        <div class="field">
                          <div class="field-name">隨貨附發票</div>
                          <div class="switchBox">
                            <div class="switchBox_content">
                              <label class="switchBox_content_box">
                                <input
                                  class="switchBox_content_box_input"
                                  type="radio"
                                  :id="`AttachInvoice_Y${index + 1}`"
                                  :name="`AttachInvoice${index + 1}`"
                                  :value="true"
                                  v-model="branch.AttachInvoice"
                                />
                                <span class="switchBox_content_box_text"
                                  >是</span
                                >
                              </label>
                              <label class="switchBox_content_box">
                                <input
                                  class="switchBox_content_box_input"
                                  type="radio"
                                  :id="`AttachInvoice_N${index + 1}`"
                                  :name="`AttachInvoice${index + 1}`"
                                  :value="false"
                                  v-model="branch.AttachInvoice"
                                />
                                <span class="switchBox_content_box_text"
                                  >否</span
                                >
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <VP
                        tag="div"
                        :rules="branch.AttachInvoice ? 'required' : ''"
                        :name="`發票收件人名稱${index + 1}`"
                        v-slot="{ errors }"
                        class="col-sm-12 col-md-6"
                      >
                        <div class="field">
                          <div class="field-name">發票收件人名稱</div>
                          <input
                            type="text"
                            placeholder="發票收件人名稱"
                            :disabled="!branch.AttachInvoice"
                            v-model.trim="branch.InvoiceName"
                          />
                          <span
                            class="text-danger font-weight-bold small"
                            v-if="errors"
                            >{{ errors[0] }}</span
                          >
                        </div>
                      </VP>

                      <VP
                        tag="div"
                        :rules="branch.AttachInvoice ? 'required' : ''"
                        :name="`發票收件人電話${index + 1}`"
                        v-slot="{ errors }"
                        class="col-sm-12 col-md-6"
                      >
                        <div class="field">
                          <div class="field-name">發票收件人電話</div>
                          <input
                            type="text"
                            placeholder="發票收件人電話"
                            :disabled="!branch.AttachInvoice"
                            v-model.trim="branch.InvoiceContact"
                          />
                          <span
                            class="text-danger font-weight-bold small"
                            v-if="errors"
                            >{{ errors[0] }}</span
                          >
                        </div>
                      </VP>
                      <VP
                        tag="div"
                        :name="`發票地址${index + 1}`"
                        :rules="branch.AttachInvoice ? 'required' : ''"
                        class="col-sm-12 col-md-12"
                        v-slot="{ errors }"
                      >
                        <div class="field">
                          <div class="field-name">發票地址</div>
                          <input
                            type="text"
                            placeholder="發票地址"
                            :disabled="!branch.AttachInvoice"
                            v-model.trim="branch.InvoiceAddress"
                          />
                          <span
                            v-if="errors"
                            class="mb-2 font-weight-bold text-danger small"
                          >
                            {{ errors[0] }}
                          </span>
                        </div>
                      </VP>
                    </template>

                    <div class="col-sm-12 col-md-4">
                      <div class="field">
                        <div class="field-name">手續費</div>
                        <input
                          type="text"
                          v-model="Charge.Sales_Fees.Costs"
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
                          v-model="Freight.Sales_Fees.Costs"
                          placeholder="運費"
                          disabled
                        />
                      </div>
                    </div>
                    <!-- 畫面渲染用，因為在 Modal 裡面用會讓 Modal 被關閉，只留下黑色背景 -->
                    <span v-if="keyData === 0">{{ keyData }}</span>
                    <div class="col-sm-12 col-md-4">
                      <div class="field">
                        <div class="field-name">分店總計</div>
                        <input
                          type="text"
                          placeholder="分店總計"
                          disabled
                          v-model="branch.Subtotal"
                        />
                      </div>
                    </div>

                    <VP
                      class="col-sm-12 col-md-12"
                      rules="required"
                      :name="`收貨地址${index + 1}`"
                      v-slot="{ errors }"
                    >
                      <div class="field" :class="errors[0] ? ' mb-0' : ''">
                        <div class="field-name">收貨地址</div>
                        <input
                          type="text"
                          placeholder="收貨地址"
                          v-model.trim="branch.ReceiveAddress"
                        />
                      </div>
                      <span
                        v-if="errors"
                        class="mb-2 font-weight-bold text-danger small"
                      >
                        {{ errors[0] }}
                      </span>
                    </VP>

                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">備註</div>
                        <textarea
                          placeholder="備註"
                          class="pl-2"
                          v-model.trim="branch.Memo"
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
                  取消
                </button>
                <button
                  @click="handleSubmit(doubleCheck)"
                  class="btn btn_primary"
                  type="button"
                >
                  儲存
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
import { OrderProcessing } from "@/mixins/orderProcessing.js";
// import { getPayTerm } from "@/commonAPI/api.js";

// 未串接 API 所以直接引入 JSON。
import payTermData from "@/data/Other/PayTerm.json";

/* global $ */
export default {
  name: "CheckOrder",
  mixins: [OrderProcessing],
  props: {
    IsMainStore: {
      type: Boolean,
      required: true,
    },
    DeliveryTime: {
      type: Array,
      required: true,
    },
    Freight: {
      type: Object,
      required: true,
    },
    Charge: {
      type: Object,
      required: true,
    },
    DeliveryDate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      startDate: "",
      allPayTerm: [],
      // Payment: null, // 付款方式，帶選取後會傳入 sendData。這裡使用額外的屬性來接是因為可能會多次變更值，所以畫面上要保持物件的格式
      sendData: {
        // 業務資訊
        SalesId: JSON.parse(localStorage.getItem("saleInfo")).EmpID, // 業務ID
        SalesName: JSON.parse(localStorage.getItem("saleInfo")).EmpCName, // 業務名稱
        SalesDept: JSON.parse(localStorage.getItem("saleInfo")).DeptCode, // 業務部門

        // 表頭
        IsHeadquarterInvoice: true,
        CustomerName: JSON.parse(localStorage.getItem("customer"))
          .CustomerFullName, // 客戶名稱
        CustomerId: JSON.parse(localStorage.getItem("customer")).CustomerID, // 客戶代號(總店)
        TaxId: JSON.parse(localStorage.getItem("customer")).TaxID, // 統編
        PayTermCode: "", // 付款方式 代號
        NotTaxId: false, // 不開統編
        AttachInvoice: true, // 隨貨附發票

        InvoiceName: JSON.parse(localStorage.getItem("customer")).Contact, // 發票收貨人名稱
        InvoiceContact: JSON.parse(localStorage.getItem("customer")).TEL_NO, // 發票收貨人聯絡方式
        InvoiceAddress: JSON.parse(localStorage.getItem("customer"))
          .InvoiceAddress, // 發票收貨人地址
        Memo: "", // 備註

        // 分店
        Customers: JSON.parse(localStorage.getItem("pendingOrderConcat")),

        // 建立者
        CreateUser: localStorage.getItem("uofUserGuid"),
      },

      allDeliveryTime: [], // 取得送貨時段 // 未串接 API 故寫死

      // 總金額
      total: 0,

      keyData: 1,
    };
  },
  methods: {
    // 取得產品單價，在選完付款方式時觸發
    getUnitPrice(code, index) {
      const vm = this;
      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/GetProductUnitPrice`;

      if (!code) return false;
      let params = {
        Products: [],
      };

      // 如果是總店發票合併就全部一起取得金額，否則只取出其中一間店的商品金額
      let flatProductArr =
        index === "all"
          ? vm.branchStore.map((item) => item.productData).flat(Infinity)
          : vm.branchStore[index].productData;
      flatProductArr.forEach((item) => {
        params.Products.push({
          ProductId: item.ItemNo.trim(),
          Quantity: item.orderQuantity,
          PayTermCode: code, // NF002 為付款代號
        });
      });

      /*--------------------------------------------------------*/
      if (index === "all") {
        vm.branchStore.forEach((product) => {
          product.productData.forEach((item) => {
            item.UnitPrice = 10;
          });
        });
      } else {
        vm.branchStore[index].productData.forEach((item) => {
          item.UnitPrice = 10;
        });
      }

      vm.$nextTick(() => {
        // 每次都歸零
        vm.total = 0;
        // 取完價格再去做加總

        this.print("branchStore", vm.branchStore);
        vm.branchStore.forEach((product) => {
          product.productData.forEach((item) => {
            if (!item.IsPR) {
              product.Subtotal =
                item.UnitPrice * item.orderQuantity +
                vm.Charge.Sales_Fees.Costs +
                vm.Freight.Sales_Fees.Costs; // 分店總計
            }
          });

          // 如果該商店只有公關品項，那就為 0
          if (!Object.prototype.hasOwnProperty.call(product, "Subtotal")) {
            product.Subtotal =
              vm.Charge.Sales_Fees.Costs + vm.Freight.Sales_Fees.Costs;
          }
          vm.keyData += 3;
          vm.total += product.Subtotal;
        });

        if (!vm.total) {
          vm.total = 0;
        }

        /*--------------------------------------------------------*/

        // this.print("取得價格格式", params);
        // vm.$store.commit("ISLOADING", true);
        // vm.$http
        //   .post(url, params)
        //   .then((res) => {
        //     // 賦予該品項正確的價格

        //     if (index === "all") {
        //       vm.branchStore.forEach((product) => {
        //         product.productData.forEach((item) => {
        //           res.data.Data.forEach((price) => {
        //             if (item.ItemNo.trim() === price.ItemNo) {
        //               item.UnitPrice = price.UnitPrice;
        //             }
        //           });
        //         });
        //       });
        //     } else {
        //       vm.branchStore[index].productData.forEach((item) => {
        //         res.data.Data.forEach((price) => {
        //           if (item.ItemNo.trim() === price.ItemNo) {
        //             item.UnitPrice = price.UnitPrice;
        //           }
        //         });
        //       });
        //     }

        //     vm.$nextTick(() => {
        //       // 每次都歸零
        //       vm.total = 0;
        //       // 取完價格再去做加總

        //       this.print("branchStore", vm.branchStore);
        //       vm.branchStore.forEach((product) => {
        //         product.productData.forEach((item) => {
        //           if (!item.IsPR) {
        //             product.Subtotal =
        //               item.UnitPrice * item.orderQuantity +
        //               vm.Charge.Sales_Fees.Costs +
        //               vm.Freight.Sales_Fees.Costs; // 分店總計
        //           }
        //         });

        //         // 如果該商店只有公關品項，那就為 0
        //         if (!Object.prototype.hasOwnProperty.call(product, "Subtotal")) {
        //           product.Subtotal =
        //             vm.Charge.Sales_Fees.Costs + vm.Freight.Sales_Fees.Costs;
        //         }
        //         vm.keyData += 3;
        //         vm.total += product.Subtotal;
        //       });

        //       if (!vm.total) {
        //         vm.total = 0;
        //       }
        //       vm.$store.commit("ISLOADING", false);
        //     });
        //   })
        //   .catch(() => {
        //     vm.$store.commit("ISLOADING", false);
      });
    },
    // 第二次檢查是否有庫存量
    doubleCheck() {
      const vm = this;
      vm.sendCheckData();

      // let newCustomerData = vm.sendData.Customers;
      // let url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/CheckProductInventory`;
      // vm.checkInventory();

      // vm.$store.commit("ISLOADING", true); // 一定要在檢查庫存量邏輯跑完才能送 true，否則 vm.filterContented 會無資料
      // vm.$nextTick(() => {
      //   vm.$http
      //     .post(url, vm.filterContented)
      //     .then((res) => {
      //       if (res.data.Status >= 200 && res.data.Status < 300) {
      //         vm.$store.commit("PENDINGORDERCONCAT", vm.branchData);

      //         // 將畫面顯示的資料傳到送出資料中
      //         newCustomerData.forEach((custom, key) => {
      //           let newCustom = null;
      //           newCustom = vm.branchStore.find((item, index) => {
      //             return key === index;
      //           });
      //           // 各分店的資訊(不包含商品明細)
      //           if (newCustom) {
      //             newCustomerData[key].DeliveryDate = newCustom.DeliveryDate; // 送貨日期
      //             newCustomerData[key].DeliveryTime =
      //               newCustom.DeliveryTime.Code; // 送貨時段
      //             newCustomerData[key].ReceiveAddress =
      //               newCustom.ReceiveAddress; // 收貨地址
      //             newCustomerData[key].ReceiveContact =
      //               newCustom.ReceiveContact; // 收貨人聯絡電話
      //             newCustomerData[key].ReceiveName = newCustom.ReceiveName; // 收貨人名稱
      //             newCustomerData[key].InvoiceAttached = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.InvoiceAttached; // 隨貨附發票
      //             newCustomerData[key].InvoiceName = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.InvoiceName; // 發票收件人名稱
      //             newCustomerData[key].InvoiceContact = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.InvoiceContact; // 發票收件人電話
      //             newCustomerData[key].InvoiceAddress = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.InvoiceAddress; // 發票地址
      //             newCustomerData[key].AttachInvoice = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.AttachInvoice; // 隨貨附發票
      //             newCustomerData[key].NotTaxId = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.NotTaxId; // 不開統編
      //             newCustomerData[key].PayTermCode = vm.sendData
      //               .IsHeadquarterInvoice
      //               ? null
      //               : newCustom.PayTermCode; // 付款方式
      //             newCustomerData[key].TaxId = vm.sendData.IsHeadquarterInvoice
      //               ? null
      //               : newCustom.TaxId; // 統一編號
      //             newCustomerData[key].Memo = newCustom.Memo || null; // 備註
      //           }
      //         });
      //         this.print("newCustomerData", newCustomerData);
      //         vm.$nextTick(() => {
      //           vm.sendData.Customers = newCustomerData;
      //           vm.sendCheckData();
      //         });
      //       }
      //     })
      //     .catch((error) => {
      //       vm.$store.commit("ISLOADING", false);
      //       console.log(error);
      //       if (error?.response?.status === 400) {
      //         vm.$message.error({
      //           message: `<span>${error.response.data}<span>`,
      //           dangerouslyUseHTMLString: true,
      //           showClose: true,
      //           duration: 10000,
      //         });
      //       }
      //     });
      // });
    },
    sendCheckData() {
      const vm = this;

      vm.$notify({
        title: "成功",
        message: "訂單已送出",
        type: "success",
        duration: 3500,
      });
      vm.$router.push({ name: "OrderFinish", params: { text: "訂單" } });

      // const url = `${process.env.VUE_APP_APIPATH}/Inventory/Product/PurchaseOrder`;
      // // Customers 結構篩選
      // vm.sendData.IsHeadquartersOrder = JSON.parse(
      //   localStorage.getItem("IsHeadquarterStorder")
      // );

      // vm.sendData.Customers = vm.sendData.Customers.map((customer) => {
      //   return {
      //     CustomerId: customer.CustomerId,
      //     CustomerName: customer.Store.CustomerShtName,
      //     DeliveryDate: customer.DeliveryDate,
      //     DeliveryTime: customer.DeliveryTime,
      //     ReceiveName: customer.ReceiveName,
      //     ReceiveContact: customer.ReceiveContact,
      //     ReceiveAddress: customer.ReceiveAddress,
      //     InvoiceAttached: customer.InvoiceAttached,
      //     InvoiceName: customer.InvoiceName,
      //     InvoiceContact: customer.InvoiceContact,
      //     InvoiceAddress: customer.InvoiceAddress,
      //     NotTaxId: customer.NotTaxId,
      //     TaxId: customer.TaxId,
      //     PayTermCode: customer.PayTermCode,
      //     AttachInvoice: customer.AttachInvoice,
      //     Memo: customer.Memo || "",
      //     Fee: vm.Charge.Sales_Fees.Costs,
      //     Freight: vm.Freight.Sales_Fees.Costs,
      //     Products: customer.Products,
      //     IsHeadquarterInvoice: vm.sendData.IsHeadquarterInvoice, // 是否為總店寄送，會跟外層的值一樣，主要是後端無法驗證上層資料，因此多送此屬性表示相同類型。
      //   };
      // });

      // // this.print("送出前的資料檢查", vm.sendData);
      // // Customers 內的 Products 結構篩選
      // vm.sendData.Customers.forEach((item) => {
      //   item.Products = item.Products.map((product) => {
      //     return {
      //       ProductId: product.ProductId,
      //       WhseID: product.WhseID,
      //       IsPending: product.IsPending,
      //       PendingQuantity: product.PendingQuantity,
      //       PurchaseQuantity: product.PurchaseQuantity,
      //       ProductName: product.ProductName,
      //       IsFree: product.IsFree,
      //       FreeQuantity: product.FreeQuantity,
      //       IsPartialDelivery: product.IsPartialDelivery,
      //       PartialDeliveryQuantity: product.PartialDeliveryQuantity,
      //       UnitPrice: product.UnitPrice,
      //       Subtotal: product.Subtotal,
      //       Specification: product.Specification,
      //       DepositQuantity: product.DepositQuantity,
      //       UOM: product.UOM,
      //     };
      //   });
      // });
      // this.print("vm.sendData", vm.sendData);
      // vm.$store.commit("ISLOADING", true);
      // vm.$http
      //   .post(url, vm.sendData)
      //   .then(() => {
      //     vm.$notify({
      //       title: "成功",
      //       message: "訂單已送出",
      //       type: "success",
      //       duration: 3500,
      //     });
      //     vm.$store.commit("ISLOADING", false);
      //     vm.$router.push({ name: "OrderFinish", params: { text: "訂單" } });
      //   })
      //   .catch((error) => {
      //     vm.$store.commit("ISLOADING", false);
      //     if (error.response.status === 400) {
      //       vm.$notify({
      //         title: "錯誤",
      //         message: Object.values(error.response.data.errors),
      //         type: "error",
      //         duration: 3500,
      //       });
      //     }
      //   });
    },
    notDeliveryDate(date) {
      const vm = this;
      const today = new Date();
      return (
        date <
        new Date(today.getTime() + vm.DeliveryDate.DateDIF * 24 * 3600 * 1000)
      );
    },
  },
  watch: {
    DeliveryTime(n) {
      if (n) {
        this.allDeliveryTime = [...n];
      }
    },
    pendingOrderConcat(n) {
      const vm = this;
      vm.sendData.Customers = [...n];
    },
    branchStore(n) {
      const vm = this;
      if (n.length > 0) {
        // 把訂單查詢的資料傳到分店裡。
        vm.keyData += 3;
        if (localStorage.getItem("routerFrom") === "OrderSearch") {
          n.forEach((branch, index) => {
            let tempData = vm.$route.params.checkModalBranchData.find(
              (data) => {
                return branch.store.CustomerID === data.CustomerId;
              }
            );
            if (tempData.DeliveryTime) {
              vm.DeliveryTime.some((time) => {
                if (time.Code === tempData.DeliveryTime) {
                  tempData.DeliveryTime = time;
                }
              });
            }
            n[index] = {
              ...branch,
              ...tempData,
            };
          });
        }
      }
    },
    // 讓使用者重新選取付款方式
    "sendData.IsHeadquarterInvoice"(n) {
      const vm = this;
      if (n) {
        vm.sendData.PayTermCode = null;
      } else {
        vm.branchStore.forEach((item) => {
          item.PayTermCode = null;
          item.AttachInvoice = true;
          item.NotTaxId = false;
        });
      }
    },
  },
  computed: {
    customerData() {
      return JSON.parse(localStorage.getItem("customer"));
    },
    // 畫面上的分店資料，主要使用 productData。
    branchStore() {
      return (
        this.$store.state.branchStore ||
        JSON.parse(localStorage.getItem("branchStore"))
      );
    },
    pendingOrderConcat() {
      return (
        this.$store.state.pendingOrderConcat ||
        JSON.parse(localStorage.getItem("pendingOrderConcat"))
      );
    },
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
    vm.$store.commit("ISLOADING", true);

    vm.allPayTerm = payTermData.Data;
    // vm.axios.all([getPayTerm()]).then(
    //   vm.axios.spread((allPayTerm) => {
    //     vm.allPayTerm = allPayTerm.data.Data;
    //   })
    // );

    // 假如有發票資訊的屬性就替換
    if (
      Object.prototype.hasOwnProperty.call(
        vm.customerData,
        "IsHeadquarterInvoice"
      )
    ) {
      vm.sendData.IsHeadquarterInvoice = vm.customerData.IsHeadquarterInvoice; // 發票資訊，不是複製進來的話就不會有前面那個值，
    }

    vm.$store.commit("ISLOADING", false);
  },

  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
