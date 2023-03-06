<template>
  <div class="pa-10">
    <h1 class="text-h3 mb-6">Lista de itens</h1>
    <Table
      :items="items"
      :headers="headers"
      :total-items="total"
      :loading="loading"
      @load-items="loadItems"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/store/app';
  import { storeToRefs } from 'pinia'
  import Table from '@/components/Table.vue';
  import { reactive, ref } from 'vue';
  import { ITableHeader } from '@/models/table.types';
  import { ITableFilter } from '@/models/table-filter.interface';

  const store = useAppStore()
  const { items, loading, total } = storeToRefs(store)
  const headers = reactive<ITableHeader[]>([
    {
      align: 'start',
      key: 'name',
      sortable: true,
      title: 'Nome do Produto'
    },
    {
      align: 'start',
      key: 'quantity',
      sortable: true,
      title: 'Quantidade em estoque'
    },
    {
      align: 'start',
      key: 'defectiveParts',
      sortable: true,
      title: 'Peças com defeitos'
    },
    {
      align: 'start',
      key: 'partsForSales',
      sortable: true,
      title: 'Peças para vendas'
    },
  ]);

  function loadItems(data: ITableFilter) {
    store.loadItems(data);
  }
</script>

<style lang="scss">
  
</style>
