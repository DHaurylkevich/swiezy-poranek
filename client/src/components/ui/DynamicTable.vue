<template>
  <div class="container">
    <button @click="$emit('add')" class="btn-create" >Добавить запись</button>

    <table>
      <thead>
        <tr>
          <th v-for="(value, columnIndex) in columns" :key="columnIndex"> {{ value }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="(value, index) in row" :key="index">
              {{ value }}
          </td>
          <td>
            <button v-if="editBtn" @click="$emit('edit', row)" class="btn" >Редактировать</button>
            <button @click="$emit('delete', row)" class="btn">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    editBtn: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.container{
  padding: 20px;
}
button{
  background-color: #4CAF50;
  border: none;
  padding: 10px 20px;
  color: #fff;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10px;
}
.btn-create {
  margin-bottom: 15px;
}

.btn {
  margin: 5px;
  border-radius: 10px;
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
@media (max-width: 768px) {
  .btn-create {
    margin-bottom: 10px;
    padding: 8px 16px;
  }

  .btn {
    padding: 8px 16px;
  }
}
</style>
