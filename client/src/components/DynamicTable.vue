<!-- src/components/DynamicTable.vue -->
<template>
  <div>
    <button @click="$emit('add')" class="btn-create" >Добавить запись</button>

    <table>
      <thead>
        <tr>
          <th v-for="(value, columnIndex) in columns" :key="columnIndex"> {{ value }}</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="(value, index) in row" :key="index">
              {{ value }}
          </td>
          <td>
            <button @click="$emit('edit', row)">Редактировать</button>
            <button @click="$emit('delete', row)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props: {
      columns: Array,
      rows: Array,
    }
  }
</script>

<style scoped>
.btn-create {
    margin-bottom: 10px;
    display: inline-block;
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
