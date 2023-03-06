<template>
  <v-data-table-server
    :headers="headers"
    :items-length="totalItems"
    :items="items"
    :loading="loading"
    :page="page"
    :items-per-page="itemsPerPage"
    :sort-by="sortBy"
    class="elevation-1"
    @update:options="load"
  ></v-data-table-server>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps } from 'vue';
  import { ITableHeader } from '@/models/table.types';
  import { ITableFilter } from '@/models/table-filter.interface';

  defineProps<{
    headers: ITableHeader[],
    totalItems: number,
    items: any[],
    loading: boolean,
    itemsPerPage: number,
    page: number,
    sortBy: Array<{ key: string, value: string }>,
  }>()

  const emit = defineEmits({
    loadItems: null
  });

  function load(data: ITableFilter) {
    emit('loadItems', data)
  }
</script>
