<template>
  <table class="common-datatable datatable stripe order-column w-100">
    <thead>
      <tr>
        <th>品號</th>
        <th>品名/規格</th>
        <th class="text-center">單位</th>
        <th class="text-center">寄倉數量</th>
        <th class="text-center">可取貨數量</th>
        <th class="text-center">選擇產品</th>
      </tr>
    </thead>
    <tbody class="line">
      <tr v-for="product of confirmProduct" :key="product.ProductId">
        <td>{{ product.ProductId }}</td>
        <td class="tdShort">
          {{ product.ProductName }}/{{ product.Specification }}
        </td>
        <td class="text-center">{{ product.UOM }}</td>
        <td class="text-center">{{ product.OrderQuantity }}</td>
        <td class="text-center">{{ product.PickableQuantity }}</td>
        <td class="text-center">
          <label class="y-checkbox">
            <input disabled v-model="product.IsConfirm" type="checkbox" />
            <i class="fas fa-check-square text-secondary"></i>
          </label>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr v-for="product of tempProduct" :key="product.ProductId">
        <td>{{ product.ProductId }}</td>
        <td>{{ product.ProductName }}/{{ product.Specification }}</td>
        <td class="text-center">{{ product.UOM }}</td>
        <td class="text-center">{{ product.OrderQuantity }}</td>
        <td class="text-center">{{ product.PickableQuantity }}</td>
        <td class="text-center">
          <label class="y-checkbox">
            <input
              name="IsConfirm"
              v-model="product.IsConfirm"
              type="checkbox"
            />
            <i class="fas fa-check-square"></i>
          </label>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "PickUpModalTemplate",
  props: {
    tempProduct: {
      type: Array,
      required: true,
    },
    confirmProduct: {
      type: Array,
    },
  },
};
</script>