<template>
  <div
    id="customerform"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <VO
        ref="customerform"
        class="modal-content"
        v-slot="{ handleSubmit }"
        tag="section"
      >
        <div class="modal-header">{{ formHead }}</div>
        <div class="modal-body p-5">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div class="field">
                <div class="field-name">客戶代號</div>
                <input
                  type="text"
                  disabled
                  v-model="sendData.CustomerCode"
                  placeholder="請輸入客戶代號"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <VP
              tag="div"
              name="客戶簡稱"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">客戶簡稱</div>
                <input
                  type="text"
                  v-model="sendData.CustomerShtName"
                  placeholder="請輸入客戶簡稱"
                  maxlength="10"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              name="客戶全名"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">客戶全名</div>
                <input
                  type="text"
                  v-model="sendData.CustomerFullName"
                  placeholder="請輸入客戶全名"
                  maxlength="72"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              name="負責人"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">負責人</div>
                <input
                  type="text"
                  v-model="sendData.Owner"
                  placeholder="請輸入負責人"
                  maxlength="30"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              name="連絡人"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">連絡人</div>
                <input
                  type="text"
                  v-model="sendData.Contact"
                  placeholder="請輸入連絡人"
                  maxlength="30"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              name="電話號碼"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">電話號碼</div>
                <input
                  type="text"
                  v-model="sendData.TelNo"
                  placeholder="請輸入電話號碼"
                  maxlength="20"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              name="電子郵件"
              rules="email"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">電子郵件(*非必填)</div>
                <input
                  type="text"
                  v-model="sendData.Email"
                  placeholder="請輸入電子郵件"
                  maxlength="36"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              :rules="isOff ? '' : `oneOf:${filterTypes}`"
              name="客戶分類"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">客戶分類</div>
                <div class="switchBox">
                  <div class="switchBox_content">
                    <label
                      class="switchBox_content_box"
                      v-for="type of allCustomerTypes"
                      :key="type.TypeCode"
                    >
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        :id="`CType_${type.TypeCode}`"
                        name="CType"
                        :value="type.TypeCode"
                        :disabled="isDisabled || isOff"
                        v-model="sendData.CType"
                      />
                      <span class="switchBox_content_box_text">{{
                        type.Type
                      }}</span>
                    </label>
                  </div>
                </div>
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 客戶分類為法人時必填 -->
            <VP
              tag="div"
              name="統一編號"
              :rules="
                sendData.CType === LegalPersonCode && !isOff ? 'required' : ''
              "
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">統一編號</div>
                <input
                  type="text"
                  :disabled="isDisabled || isOff"
                  v-model="sendData.TaxID"
                  placeholder="請輸入統一編號"
                  maxlength="8"
                />
                <span
                  v-if="errors[0] && sendData.CType === LegalPersonCode"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              :rules="isOff ? '' : 'required'"
              name="部門名稱"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">部門名稱</div>
                <VSelect
                  :getOptionLabel="(opt) => `${opt.DeptName}(${opt.DeptID})`"
                  placeholder="請選擇部門名稱"
                  valueFormat="object"
                  :options="allDepts"
                  v-model="sendData.DeptID"
                  :reduce="(opt) => opt.DeptID"
                  :disabled="isDisabled || isOff"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              :rules="isOff ? '' : 'required'"
              name="業務代碼"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">業務代碼</div>
                <VSelect
                  :getOptionLabel="
                    (opt) =>
                      `${opt.EmpCName}-${opt.ERP_SalesCode}(${opt.Sales_Zone})`
                  "
                  placeholder="請選擇業務代碼"
                  valueFormat="object"
                  :options="allSales"
                  v-model="sendData.SalesPersonCode"
                  :reduce="(opt) => opt.ERP_SalesCode"
                  :disabled="isDisabled || isOff"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              :rules="isOff ? '' : 'required'"
              name="通路別"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">通路別</div>
                <VSelect
                  :getOptionLabel="(opt) => `${opt.ShtName}(${opt.CodeID})`"
                  placeholder="請選擇通路別"
                  valueFormat="object"
                  :options="allWays"
                  v-model="sendData.ChannelCode"
                  :disabled="isDisabled || isOff"
                  :reduce="(opt) => opt.CodeID"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              :rules="isOff ? '' : 'required'"
              name="型態別"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">型態別</div>
                <VSelect
                  :getOptionLabel="(opt) => `${opt.ShtName}(${opt.CodeID})`"
                  placeholder="請選擇型態別"
                  valueFormat="object"
                  :options="allTypes"
                  v-model="sendData.TypeCode"
                  :disabled="isDisabled || isOff"
                  :reduce="(opt) => opt.CodeID"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <VP
              name="店家類型"
              tag="div"
              :rules="isOff ? '' : 'oneOf:Single,Headquarter'"
              v-slot="{ errors }"
              class="col-sm-12"
              :class="sendData.StoreType === 'Single' ? 'col-md-4' : 'col-md-6'"
            >
              <div class="field">
                <div class="field-name">店家類型</div>
                <div class="switchBox">
                  <div class="switchBox_content">
                    <label class="switchBox_content_box">
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        id="StoreType_Y"
                        name="StoreType"
                        value="Single"
                        v-model="sendData.StoreType"
                        :disabled="isDisabled || isOff"
                      />
                      <span class="switchBox_content_box_text">單店</span>
                    </label>
                    <label class="switchBox_content_box">
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        id="StoreType_N"
                        name="StoreType"
                        value="Headquarter"
                        v-model="sendData.StoreType"
                        :disabled="isDisabled || isOff"
                      />
                      <span class="switchBox_content_box_text">連鎖</span>
                    </label>
                  </div>
                </div>
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              name="總店店號"
              :rules="isOff ? '' : 'required'"
              v-if="sendData.StoreType === 'Headquarter'"
              class="col-sm-12 col-md-6"
              v-slot="{ errors }"
            >
              <div class="field">
                <div class="field-name">總店店號</div>
                <VSelect
                  :getOptionLabel="
                    (opt) => `${opt.CustomerShtName}(${opt.CustomerID})`
                  "
                  placeholder="請選擇總店店號"
                  valueFormat="object"
                  :options="allHeadquarter"
                  v-model="sendData.HQCode"
                  :reduce="(opt) => opt.CustomerID"
                  :disabled="isDisabled || isOff"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <VP
              :rules="isOff ? '' : `oneOf:${true},${false}`"
              name="總公司請款"
              v-slot="{ errors }"
              class="col-sm-12"
              :class="sendData.StoreType === 'Single' ? 'col-md-4' : 'col-md-6'"
            >
              <div class="field">
                <div class="field-name">總公司請款</div>
                <div class="switchBox">
                  <div class="switchBox_content">
                    <label class="switchBox_content_box">
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        id="IsHQPayment_Y"
                        name="IsHQPayment"
                        value="true"
                        :disabled="
                          sendData.StoreType === 'Headquarter' ||
                          isDisabled ||
                          isOff
                        "
                        v-model="sendData.IsHQPayment"
                      />
                      <span class="switchBox_content_box_text">是</span>
                    </label>
                    <label class="switchBox_content_box">
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        id="IsHQPayment_N"
                        name="IsHQPayment"
                        value="false"
                        :disabled="
                          sendData.StoreType === 'Headquarter' ||
                          isDisabled ||
                          isOff
                        "
                        v-model="sendData.IsHQPayment"
                      />
                      <span class="switchBox_content_box_text">否</span>
                    </label>
                  </div>
                </div>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <VP
              :rules="isOff ? '' : `oneOf:true,false`"
              name="發票號碼依總公司控管"
              v-slot="{ errors }"
              class="col-sm-12"
              :class="sendData.StoreType === 'Single' ? 'col-md-4' : 'col-md-6'"
            >
              <div class="field">
                <div class="field-name">發票號碼依總公司控管</div>
                <div class="switchBox">
                  <div class="switchBox_content">
                    <label class="switchBox_content_box">
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        id="IsHQInvoice_Y"
                        value="true"
                        :disabled="
                          sendData.StoreType === 'Headquarter' ||
                          isDisabled ||
                          isOff
                        "
                        name="IsHQInvoice"
                        v-model="sendData.IsHQInvoice"
                      />
                      <span class="switchBox_content_box_text">是</span>
                    </label>
                    <label class="switchBox_content_box">
                      <input
                        class="switchBox_content_box_input"
                        type="radio"
                        id="IsHQInvoice_N"
                        value="false"
                        name="IsHQInvoice"
                        :disabled="
                          sendData.StoreType === 'Headquarter' ||
                          isDisabled ||
                          isOff
                        "
                        v-model="sendData.IsHQInvoice"
                      />
                      <span class="switchBox_content_box_text">否</span>
                    </label>
                  </div>
                </div>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              name="登記地址郵遞區號"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">登記地址郵遞區號</div>
                <VSelect
                  :getOptionLabel="
                    (opt) => `${opt.CityName}${opt.District}(${opt.PostalCode})`
                  "
                  :options="allPostalCodes"
                  placeholder="請選擇郵遞區號"
                  valueFormat="object"
                  :disabled="isDisabled || isOff"
                  @input="getAddressTitle('ZipCode', 'Address')"
                  v-model="sendData.ZipCode"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors[0]"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              tag="div"
              v-slot="{ errors }"
              :rules="isOff ? '' : 'required'"
              name="登記地址"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">登記地址</div>
                <input
                  type="text"
                  v-model="sendData.Address"
                  placeholder="請輸入登記地址"
                  maxlength="72"
                  :disabled="isDisabled || isOff"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              :rules="isOff ? '' : 'required'"
              name="發票地址郵遞區號"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">發票地址郵遞區號</div>
                <VSelect
                  :getOptionLabel="
                    (opt) => `${opt.CityName}${opt.District}(${opt.PostalCode})`
                  "
                  :options="allPostalCodes"
                  @input="getAddressTitle('InvoiceZipCode', 'InvoiceAddress')"
                  placeholder="請選擇郵遞區號"
                  valueFormat="object"
                  :disabled="isDisabled || isOff"
                  v-model="sendData.InvoiceZipCode"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              :rules="isOff ? '' : 'required'"
              tag="div"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
              name="發票地址"
            >
              <div class="field">
                <div class="field-name">發票地址</div>
                <input
                  type="text"
                  v-model="sendData.InvoiceAddress"
                  maxlength="72"
                  :disabled="isDisabled || isOff"
                  placeholder="請輸入發票地址"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <!-- 必選，預設帶第一筆資料 -->
            <VP
              tag="div"
              name="送貨地址郵遞區號"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">送貨地址郵遞區號</div>
                <VSelect
                  :getOptionLabel="
                    (opt) => `${opt.CityName}${opt.District}(${opt.PostalCode})`
                  "
                  :options="allPostalCodes"
                  @input="getAddressTitle('ShippingZipCode', 'ShippingAddress')"
                  placeholder="請選擇郵遞區號"
                  valueFormat="object"
                  :disabled="isDisabled || isOff"
                  v-model="sendData.ShippingZipCode"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              :rules="isOff ? '' : 'required'"
              tag="div"
              v-slot="{ errors }"
              class="col-sm-12 col-md-6"
              name="送貨地址"
            >
              <div class="field">
                <div class="field-name">送貨地址</div>
                <input
                  type="text"
                  v-model="sendData.ShippingAddress"
                  maxlength="72"
                  :disabled="isDisabled || isOff"
                  placeholder="請輸入送貨地址"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <div class="col-sm-12 col-md-6">
              <div class="field">
                <div class="field-name">銀行代碼(*非必選)</div>

                <!-- :options="allBanks" -->
                <VSelect
                  :options="BankCodesPaginated"
                  :filterable="false"
                  @search="searchBank"
                  label="customerLabel"
                  placeholder="請選擇銀行代碼"
                  valueFormat="object"
                  :disabled="isDisabled || isOff"
                  v-model="sendData.BankCode"
                >
                  <li slot="list-footer" class="w-100">
                    <button
                      class="w-50"
                      :disabled="!hasPrevPage"
                      @click="bankOffSet -= perPage"
                    >
                      上一頁
                    </button>
                    <button
                      class="w-50"
                      :disabled="!hasNextPage"
                      @click="bankOffSet += perPage"
                    >
                      下一頁
                    </button>
                  </li>
                  <span slot="no-options">暫無資料</span>
                </VSelect>
              </div>
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="field">
                <div class="field-name">銀行帳號(*非必填)</div>
                <input
                  type="text"
                  v-model="sendData.BankAccount"
                  maxlength="20"
                  :disabled="isDisabled || isOff"
                  placeholder="請輸入銀行帳號"
                />
              </div>
            </div>

            <!-- 必填，預設帶入第一筆資料，付款條件描述帶入 NF003，所以不直接篩選出 ID -->
            <VP
              tag="div"
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              name="付款條件代號"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">付款條件代號</div>
                <VSelect
                  :getOptionLabel="(opt) => `${opt.NF003}(${opt.NF002})`"
                  placeholder="請選擇付款條件代號"
                  valueFormat="object"
                  :options="allPayTerm"
                  :disabled="isDisabled || isOff"
                  v-model="sendData.PaymentTermsCode"
                  @input="getPayTermContent"
                >
                  <span slot="no-options">暫無資料</span>
                </VSelect>
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <VP
              :rules="isOff ? '' : 'required'"
              v-slot="{ errors }"
              tag="div"
              name="付款條件描述"
              class="col-sm-12 col-md-6"
            >
              <div class="field">
                <div class="field-name">付款條件描述</div>
                <input
                  type="text"
                  disabled
                  v-model="sendData.PaymentTerms"
                  placeholder="請輸入付款條件描述"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
            <div class="col-sm-12 col-md-6">
              <div class="field">
                <div class="field-name">結帳日期(*非必填)</div>
                <DatePicker
                  class="w-100 sameOtherField"
                  value-type="format"
                  format="YYYY-MM-DD"
                  :disabled="isDisabled || isOff"
                  placeholder="請輸入結帳日期"
                  v-model="sendData.ClosingDate"
                >
                </DatePicker>
              </div>
            </div>
            <div class="col-sm-12 col-md-12">
              <div class="field">
                <div class="field-name">客戶描述(*非必填)</div>
                <textarea
                  class="pl-2"
                  maxlength="255"
                  rows="3"
                  v-model="sendData.CustomerDesc"
                  type="text"
                  :readonly="isDisabled || isOff"
                  placeholder="請輸入客戶描述"
                />
              </div>
            </div>

            <VP
              v-slot="{ errors }"
              tag="div"
              name="異動原因"
              :rules="isOff ? '' : 'required'"
              v-if="!isNew && !isOff"
              class="col-sm-12 col-md-12"
            >
              <div class="field">
                <div class="field-name">異動原因</div>
                <textarea
                  class="pl-2"
                  maxlength="255"
                  rows="3"
                  v-model="sendData.UpdateReason"
                  type="text"
                  :readonly="isDisabled || isOff"
                  placeholder="請輸入異動原因"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>

            <VP
              v-slot="{ errors }"
              tag="div"
              name="停用原因"
              rules="required"
              v-if="isOff"
              class="col-sm-12 col-md-12"
            >
              <div class="field">
                <div class="field-name">停用原因</div>
                <textarea
                  class="pl-2"
                  maxlength="255"
                  rows="3"
                  v-model="sendData.UpdateReason"
                  type="text"
                  :readonly="isDisabled"
                  placeholder="請輸入停用原因"
                />
                <span
                  v-if="errors"
                  class="text-danger small font-weight-bold"
                  >{{ errors[0] }}</span
                >
              </div>
            </VP>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn_cancel" @click="closeData">
            {{ closeBtnText }}
          </button>
          <button
            type="button"
            class="btn btn_primary"
            @click="handleSubmit(changeModal)"
          >
            {{ saveBtnText }}
          </button>
        </div>
      </VO>
    </div>
  </div>
</template>

<script>
/* global $ */
import { mapGetters } from "vuex";

export default {
  name: "CustomerForm",
  props: {
    customer: {
      type: Object,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
    isOff: {
      type: Boolean,
      required: true,
    },
    allCustomerTypes: {
      type: Array,
      required: true,
    },
    allPostalCodes: {
      type: Array,
      required: true,
    },
    allPayTerm: {
      type: Array,
      required: true,
    },
    allDepts: {
      type: Array,
      required: true,
    },
    allSales: {
      type: Array,
      required: true,
    },
    allBanks: {
      type: Array,
      required: true,
    },
    allWays: {
      type: Array,
      required: true,
    },
    allTypes: {
      type: Array,
      required: true,
    },
    allHeadquarter: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // 新增沒有客戶代號、異動原因。
      sendData: {},
      // 法人的 Code
      LegalPersonCode: "",

      formHead: "新增客戶", // Modal 標題
      isDisabled: false, // 是否確認狀態
      closeBtnText: "關閉",
      saveBtnText: "確認",

      bankSearch: "",
      bankOffSet: 0,
      perPage: 10,
    };
  },
  methods: {
    changeModal() {
      const vm = this;

      if (vm.saveBtnText === "確認") {
        $("#customerform").modal("hide");
        vm.$refs.customerform.reset();
        vm.isDisabled = true;
        vm.closeBtnText = "取消";
        vm.saveBtnText = "儲存";
        setTimeout(() => {
          $("#customerform").modal("show");
        }, 500);
      } else {
        vm.closeBtnText = "關閉";
        vm.saveBtnText = "確認";
        vm.changeCustomerData();
        $("#customerform").modal("hide");
        vm.initSendData();

        vm.$refs.customerform.reset();
      }
    },
    changeCustomerData() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/User/Customer/SetCustomer`;
      vm.$store.commit("ISLOADING", true);

      let sendData = {
        ...vm.sendData,
        CreateUser: localStorage.getItem("uofUserGuid"),
        TypeCode: vm.sendData.TypeCode.trim(),
        Email: vm.sendData.Email ? vm.sendData.Email : null, // 沒填的話送 null
        IsHQPayment: Boolean(vm.sendData.IsHQPayment),
        IsHQInvoice: Boolean(vm.sendData.IsHQInvoice),
        BankCode: vm.sendData.BankCode ? vm.sendData.BankCode.BankID : "", // 銀行非必填，所以有可能為空
        InvoiceZipCode: vm.sendData.InvoiceZipCode.PostalCode,
        ShippingZipCode: vm.sendData.ShippingZipCode.PostalCode,
        ZipCode: vm.sendData.ZipCode.PostalCode,
        PaymentTermsCode: vm.sendData.PaymentTermsCode?.NF002,
        IsUpdate: !vm.isNew ? true : false,
        IsDeactivated: vm.isOff ? true : false,
      };

      vm.$http
        .post(url, sendData)
        .then(() => {
          if (vm.isNew) {
            vm.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 3500,
            });
          } else if (!vm.isNew && !vm.isOff) {
            vm.$notify({
              title: "成功",
              message: "異動成功",
              type: "success",
              duration: 3500,
            });
          } else if (!vm.isNew && vm.isOff) {
            vm.$notify({
              title: "成功",
              message: "客戶已停用",
              type: "success",
              duration: 3500,
            });
          }
          vm.isDisabled = false;
          vm.initSendData();
          vm.$emit("searchCustomer");
          vm.$store.commit("ISLOADING", false);
        })
        .catch((error) => {
          vm.$store.commit("ISLOADING", false);
          vm.initSendData();
          vm.isDisabled = false;
          if (error.response.status === 400) {
            vm.$notify({
              title: "錯誤",
              message: Object.values(error.response.data.errors),
              type: "error",
              duration: 3500,
            });
          }
        });
    },
    closeData() {
      const vm = this;
      if (vm.closeBtnText === "關閉") {
        $("#customerform").modal("hide");
        vm.initSendData();

        vm.$refs.customerform.reset();
      } else {
        $("#customerform").modal("hide");
        vm.isDisabled = false;
        vm.closeBtnText = "關閉";
        vm.saveBtnText = "確認";
        setTimeout(() => {
          $("#customerform").modal("show");
        }, 500);
      }
    },
    initSendData() {
      const vm = this;
      vm.sendData = {
        CustomerCode: "", // 客戶代號
        CustomerShtName: "", // 客戶簡稱
        CustomerFullName: "", // 客戶全名
        Owner: "", // 負責人
        Contact: "", // 聯絡人
        TelNo: "", // 電話號碼
        Email: "", // 電子郵件
        CType: vm.allCustomerTypes[0].TypeCode, // 客戶分類
        TaxID: "", // 統一編號
        DeptID: vm.saleInfo.DeptCode, // 部門名稱
        SalesPersonCode: vm.saleInfo.ERP_SalesCode, // 業務代碼
        ChannelCode: "", // 通路別
        TypeCode: "", // 型態別
        StoreType: "Single", // 店家類型
        HQCode: "", // 總店店號
        IsHQPayment: "false", // 總公司請款
        IsHQInvoice: "false", // 發票號碼依總公司控管
        ZipCode: "", // 登記地址郵遞區號
        Address: "", // 登記地址
        InvoiceZipCode: "", // 發票地址郵遞區號
        InvoiceAddress: "", // 發票地址
        ShippingZipCode: "", // 送貨地址郵遞區號
        ShippingAddress: "", // 送貨地址
        ClosingDate: "", // 結帳日期
        BankCode: "", // 銀行代碼
        BankAccount: "", // 銀行帳號
        PaymentTermsCode: "", // 付款條件代號
        PaymentTerms: "", // 付款條件描述
        CustomerDesc: "", // 客戶描述
        IsUpdate: false, // 是否為異動客戶(含停用)
        IsDeactivated: false, // 是否為停用
        UpdateReason: "", // 異動原因(停用原因)
        CreateUser: localStorage.getItem("uofUserGuid"),
      };
    },
    searchBank(val) {
      const vm = this;
      vm.bankSearch = val;
      vm.bankOffSet = 0;
    },
    getAddressTitle(zipCode, params) {
      const vm = this;

      if (vm.sendData[zipCode]) {
        vm.sendData[
          params
        ] = `${vm.sendData[zipCode].CityName}${vm.sendData[zipCode].District}`;
      } else {
        vm.sendData[params] = "";
      }
    },
    getPayTermContent() {
      const vm = this;
      if (vm.sendData.PaymentTermsCode) {
        vm.sendData.PaymentTerms = vm.sendData.PaymentTermsCode.NF003;
      }
    },
  },
  watch: {
    isNew(n) {
      const vm = this;
      if (n) {
        vm.formHead = "新增客戶";
        vm.initSendData();
      } else {
        vm.formHead = "異動客戶";
      }
    },
    isOff(n) {
      const vm = this;

      if (n) {
        vm.formHead = "停用客戶";
      } else {
        if (!vm.isNew) {
          vm.formHead = "異動客戶";
        }
      }
    },
    customer(n) {
      const vm = this;
      vm.sendData = {
        ...n,
        UpdateReason: "",
        ChannelCode: n.Channel, // 只有 Channel 屬性，所以添加
        IsHQPayment: n.HQPayment === "N" ? "false" : "true", // 只有 HQPayment 屬性，所以添加
        IsHQInvoice: n.HQInvoice === "N" ? "false" : "true", // 只有 HQInvoice 屬性，所以添加
        TelNo: n.TEL_NO, // 只有 TEL_NO 屬性，所以添加
        CustomerCode: n.CustomerID, // 只有 CustomerID 屬性，所以添加

        // 篩選出整包資料
        ZipCode: vm.allPostalCodes.find((code) => {
          return code.PostalCode === n.ZipCode;
        }),
        InvoiceZipCode: vm.allPostalCodes.find((code) => {
          return code.PostalCode === n.InvoiceZipCode;
        }),
        ShippingZipCode: vm.allPostalCodes.find((code) => {
          return code.PostalCode === n.ShippingZipCode;
        }),
        PaymentTermsCode: vm.allPayTerm.find((code) => {
          return code.NF002 === n.PaymentTermsCode;
        }),
        PaymentTerms: vm.allPayTerm.find((code) => {
          return code.NF002 === n.PaymentTermsCode;
        })?.NF003,
        SalesPersonCode: vm.allSales.find((code) => {
          return code.ERP_SalesCode === n.SalespersonID;
        })?.ERP_SalesCode,
        BankCode: vm.allBanks.find((code) => {
          return code.BankID === n.BankCode;
        }),
      };
    },
    allCustomerTypes(n) {
      const vm = this;
      vm.sendData.CType = n[0].TypeCode; // 一開始的預設值

      vm.LegalPersonCode = vm.allCustomerTypes.find((type) => {
        return type.Type === "法人";
      }).TypeCode;
    },
  },
  computed: {
    ...mapGetters(["saleInfo"]),
    // 篩選客戶分類，VeeValidate 參數用。
    filterTypes() {
      const vm = this;
      let str = "";
      let arr = vm.allCustomerTypes.map((item) => {
        return item.TypeCode;
      });
      str = arr.join(",");
      return str;
    },
    filtered() {
      const vm = this;
      return vm.allBanks.filter((bank) =>
        bank.customerLabel.includes(vm.bankSearch.trim())
      );
    },
    BankCodesPaginated() {
      const vm = this;
      return vm.filtered.slice(vm.bankOffSet, vm.perPage + vm.bankOffSet);
    },
    hasNextPage() {
      const vm = this;
      const nextOffset = vm.bankOffSet + vm.perPage;
      return Boolean(
        vm.filtered.slice(nextOffset, vm.perPage + nextOffset).length
      );
    },
    hasPrevPage() {
      const vm = this;
      const pervOffset = vm.bankOffSet - vm.perPage;
      return Boolean(
        vm.filtered.slice(pervOffset, vm.perPage + pervOffset).length
      );
    },
  },
  mounted() {
    const vm = this;
    vm.sendData = {
      CustomerCode: "", // 客戶代號
      CustomerShtName: "", // 客戶簡稱
      CustomerFullName: "", // 客戶全名
      Owner: "", // 負責人
      Contact: "", // 聯絡人
      TelNo: "", // 電話號碼
      Email: "", // 電子郵件
      CType: "", // 客戶分類
      TaxID: "", // 統一編號
      DeptID: vm.saleInfo.DeptCode, // 部門名稱
      SalesPersonCode: vm.saleInfo.ERP_SalesCode, // 業務代碼
      ChannelCode: "", // 通路別
      TypeCode: "", // 型態別
      StoreType: "Single", // 店家類型
      HQCode: "", // 總店店號
      IsHQPayment: "false", // 總公司請款
      IsHQInvoice: "false", // 發票號碼依總公司控管
      ZipCode: "", // 登記地址郵遞區號
      Address: "", // 登記地址
      InvoiceZipCode: "", // 發票地址郵遞區號
      InvoiceAddress: "", // 發票地址
      ShippingZipCode: "", // 送貨地址郵遞區號
      ShippingAddress: "", // 送貨地址
      ClosingDate: "", // 結帳日期
      BankCode: "", // 銀行代碼
      BankAccount: "", // 銀行帳號
      PaymentTermsCode: "", // 付款條件代號
      PaymentTerms: "", // 付款條件描述
      CustomerDesc: "", // 客戶描述
      IsUpdate: false, // 是否為異動客戶(含停用)
      IsDeactivated: false, // 是否為停用
      UpdateReason: "", // 異動原因(停用原因)
      CreateUser: localStorage.getItem("uofUserGuid"),
    };
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
