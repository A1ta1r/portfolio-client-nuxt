<template>
  <div>
    <div>
      <span ></span>
    <el-input v-model="searchQuery" prefix-icon="el-icon-search" type="text" label="Поиск" placeholder="Поисковая строка"></el-input>
    </div>
    <el-table :data="searchResult" :default-sort="{order: 'ascending'}">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>Название: {{scope.row.username}}</p>
          <p>Голубиная почта: {{scope.row.email}}</p>
          <p>Состояние: <span v-if="scope.row.isActive">Активен</span>
            <span v-else>Выключен</span></p>
          <p>Доход за текущий месяц: {{scope.row.income}}</p>
          <p>Кумулятивный доход: {{scope.row.totalIncome}}</p>
        </template>
      </el-table-column>

      <el-table-column label="Идентификатор" prop="id" sortable></el-table-column>

      <el-table-column label="Название" prop="username" sortable></el-table-column>

      <el-table-column label="Договор" prop="email" sortable></el-table-column>
      <el-table-column label="Родился" prop="createdAt" sortable></el-table-column>
      <el-table-column label="Контакты" prop="contactInfo" sortable></el-table-column>
      <el-table-column label="Состояние" prop="isActive" sortable>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isActive" active-color="#13ce66"></el-switch>
          <span v-if="scope.row.isActive"> Активен</span>
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
  import { mapState } from 'vuex';

  export default {
    name: "advertisers",
    mounted () {
      this.$store.dispatch('load_advertisers')
    },
    data() {
      return {
        searchQuery: "",
        prev: 0,
        next: 0,
        pager: 0
      };
    },
    computed: {
      ...mapState(['advertisers']),
      searchResult: function () {
        if (this.searchQuery === undefined || this.searchQuery === "") {
          return this.advertisers
        }
        return this.advertisers.filter((advertiser) => {
          const preparedQuery = this.searchQuery.toLowerCase().trim()
          const preparedName = advertiser.username.toLowerCase().trim()
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
