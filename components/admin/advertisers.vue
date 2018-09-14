<template>
  <div>
    <div>
      <span ></span>
    <el-input v-model="searchQuery" prefix-icon="el-icon-search" type="text" label="Поиск" placeholder="Поисковая строка"></el-input>
    </div>
    <el-table :data="searchResult" :default-sort="{order: 'ascending'}">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>Название: {{scope.row.name}}</p>
          <p>Договор: {{scope.row.agreement}}</p>
          <p>Состояние: <span v-if="scope.row.enabled">Активен</span>
            <span v-else>Выключен</span></p>
          <p>Доход за текущий месяц: {{scope.row.income}}</p>
          <p>Кумулятивный доход: {{scope.row.totalIncome}}</p>
        </template>
      </el-table-column>

      <el-table-column label="Идентификатор" prop="id" sortable></el-table-column>

      <el-table-column label="Название" prop="name" sortable></el-table-column>

      <el-table-column label="Договор" prop="agreement" sortable></el-table-column>

      <el-table-column label="Состояние" prop="enabled" sortable>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enabled" active-color="#13ce66"></el-switch>
          <span v-if="scope.row.enabled"> Активен</span>
          <span v-else> Выключен</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- мир пока к этому не готов
    <el-pagination-->
      <!--layout="prev, pager, next"-->
      <!--:total="searchResult.length">-->
    <!--</el-pagination>-->
  </div>
</template>

<script>

  export default {
    name: "advertisers",
    data() {
      return {
        advertiserList: [
          {
            id: 0,
            name: "Иван-банк",
            agreement: "Подписан",
            enabled: true,
            income: "1 423.58 ₽",
            totalIncome: "20 535.44 ₽"
          },
          {
            id: 1,
            name: "Деньгобанк",
            agreement: "Подписан",
            enabled: true,
            income: "1 423.58 ₽",
            totalIncome: "20 535.44 ₽"
          },
          {
            id: 2,
            name: "Просто чувак",
            agreement: "Подписан",
            enabled: true,
            income: "114.34 ₽",
            totalIncome: "4 675.44 ₽"
          },
          {
            id: 3,
            name: "Аферисты",
            agreement: "Расторгнут",
            enabled: false,
            income: "0 ₽",
            totalIncome: "0 ₽"
          }
        ],
        searchQuery: "",
        prev: 0,
        next: 0,
        pager: 0
      };
    },
    computed: {
      searchResult: function () {
        if (this.searchQuery === undefined || this.searchQuery === "") {
          return this.advertiserList
        }
        return this.advertiserList.filter((advertiser) => {
          const preparedQuery = this.searchQuery.toLowerCase().trim()
          const preparedName = advertiser.name.toLowerCase().trim()
          return preparedName.includes(preparedQuery) ||
            (advertiser.id.toString()).includes(preparedQuery)
        })
      },
      pageResult: function () {

        return this.searchResult()
      }
    }
  };
</script>

<style>
</style>
