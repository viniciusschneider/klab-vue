<template>
  <div class="pa-10">
    <h1 class="text-h3 mb-6">Lista de itens</h1>
    <v-container class="pa-0 ma-0">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            dense
            label="Nome do produto"
            v-model.trim="form.search"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="mb-5">
          <v-select
            label="Quantidade"
            :items="options"
            item-title="name"
            item-value="value"
            v-model="form.quantity"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <Table
      :items="items"
      :headers="headers"
      :total-items="total"
      :loading="loading"
      :itemsPerPage="itemsPerPage"
      :page="page"
      :sortBy="sortBy"
      @load-items="loadItems"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/store/app';
  import { storeToRefs } from 'pinia'
  import Table from '@/components/Table.vue';
  import { reactive, ref, watch } from 'vue';
  import { ITableHeader } from '@/models/table.types';
  import { ITableFilter } from '@/models/table-filter.interface';

  const store = useAppStore()
  const { items, itemsPerPage, loading, page, sortBy, total } = storeToRefs(store)
  const form = reactive({ search: '', quantity: null })
  const options = reactive([
    { name: 'Todas', value: null },
    { name: 'Mais de 50', value: 50 },
    { name: 'Mais de 75', value: 75 },
  ]);
  const headers = reactive<ITableHeader[]>([
    { align: 'start', key: 'name', sortable: true, title: 'Nome do Produto' },
    { align: 'start', key: 'quantity', sortable: true, title: 'Quantidade em estoque' },
    { align: 'start', key: 'defectiveParts', sortable: true, title: 'Peças com defeitos' },
    { align: 'start', key: 'partsForSales', sortable: true, title: 'Peças para vendas' },
  ]);

  watch(form, () => filter())

  function loadItems(data: ITableFilter) {
    store.loadItems(data, { name: form.search, quantity: form.quantity });
  }

  function filter() {
    if (page.value > 1) store.setPage(1)
    else loadItems({ itemsPerPage: itemsPerPage.value, page: 1, sortBy: sortBy.value })
  }
</script>
