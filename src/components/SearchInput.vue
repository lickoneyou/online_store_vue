<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import InputText from 'primevue/inputtext'
import VirtualScroller from 'primevue/virtualscroller'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const inputValue = ref('')

const store = useProductsStore()
const router = useRouter()

const searchValue = computed(() => {
  if (!inputValue.value.trim()) {
    return []
  }
  const value = inputValue.value.trim().toLowerCase()

  return store.products.filter(
    (product) =>
      product.title.trim().toLowerCase().includes(value) ||
      product.description.trim().toLocaleLowerCase().includes(value) ||
      product.category.trim().toLowerCase().includes(value),
  )
})

const handleClick = function (id: number): void {
  router.push(`product/${id}`)
  inputValue.value = ''
}
</script>

<template>
  <div class="search">
    <InputText type="text" v-model="inputValue" class="search_input" />
    <VirtualScroller
      v-if="searchValue.length"
      :items="searchValue"
      :itemSize="100"
      class="result border border-surface-200 dark:border-surface-700 rounded"
      style="width: 300px; height: 200px"
    >
      <template v-slot:item="{ item }">
        <div @click="handleClick(item.id)" class="seach_item" style="height: 100px">
          <img class="image" :src="item.image" :alt="item.title" />
          <p class="title">{{ item.title }}</p>
        </div>
      </template>
    </VirtualScroller>
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;

  .search_input {
    width: 300px;
  }

  .result {
    position: absolute;
    background-color: #ffffff;
    top: calc(100% + 10px);

    .seach_item {
      padding: 5px 10px;
      display: flex;
      gap: 15px;
      align-items: flex-start;
      border-bottom: 1px solid #000000;
      cursor: pointer;

      .image {
        height: 100%;
        width: 30px;
        object-fit: contain;
      }

      .title {
        font-weight: 700;
        color: #000000;
      }
    }
  }
}
</style>
