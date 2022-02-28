<template>
  <div
    id="readonlypickupmodal"
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
      <section class="modal-content">
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
                <section>
                  <!-- 取貨資訊 -->
                  <div class="table-title">
                    <span>取貨明細 </span>
                  </div>
                  <div class="table-wrap">
                    <table
                      class="
                        common-datatable
                        datatable
                        stripe
                        order-column
                        w-100
                      "
                    >
                      <thead>
                        <tr>
                          <th>品號</th>
                          <th class="tdShort">品名/規格</th>
                          <th>取貨數量</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="row of pickupRows"
                          :key="row.WarehousePickupDetailId"
                        >
                          <td>{{ row.ItemNo }}</td>
                          <td class="tdShort">
                            {{ row.ItemName }}/{{ row.Variant }}
                          </td>
                          <td class="text-center">
                            {{ row.PickupQty }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <div class="field">
                        <div class="field-name">取貨總數量</div>
                        <input
                          type="text"
                          disabled
                          placeholder="客戶名稱"
                          v-model.trim="orderDetail.PickupTotalQty"
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
                        <div class="field-name">取貨人名稱</div>
                        <input
                          type="text"
                          placeholder="取貨人名稱"
                          v-model.trim="orderDetail.PickupContact"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-6">
                      <div class="field">
                        <div class="field-name">取貨人連絡電話</div>
                        <input
                          type="text"
                          placeholder="取貨人連絡電話"
                          v-model.trim="orderDetail.PickupContactTel"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12 col-md-12">
                      <div class="field">
                        <div class="field-name">取貨地址</div>
                        <input
                          disabled
                          type="text"
                          placeholder="取貨地址"
                          v-model.trim="orderDetail.PickupAddress"
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
                </section>
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
/* global $ */
export default {
  name: "ReadOnlyPickup",
  props: {
    orderDetail: {
      type: Object,
      required: true,
    },
    pickupRows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      keyData: 1,
    };
  },
  destroyed() {
    $(".modal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
  },
};
</script>
