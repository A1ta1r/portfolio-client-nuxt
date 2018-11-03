<template>
  <div>
    <div>
      <el-row :gutter="20" type="flex" class="row-bg" justify="space-between">
        <el-col ><div class="grid-content bg-purple">
          <el-input v-model="searchQuery" prefix-icon="el-icon-search" type="text" label="Поиск" placeholder="Поисковая строка"></el-input>
        </div>
        </el-col>
        <el-col ><div class="grid-content bg-purple">
          <nuxt-link to="/secure/advertiser/new" >
            <el-button class="el-icon-plus"> Добавить рекламодателя</el-button>
          </nuxt-link>
        </div>
        </el-col>
      </el-row>
    </div>
    <el-table element-loading-text="Загрузка..." v-loading="loading_show" :data="searchResult" :default-sort="{prop: 'id', order: 'ascending'}">
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
      <el-table-column label="Родился" prop="createdAt" sortable>
        <template slot-scope="scope">
          <span>{{formatDate(scope)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Контакты" prop="contactInfo" sortable></el-table-column>
      <el-table-column label="Состояние" prop="isActive" sortable>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isActive" @change="change_status(scope)" active-color="#13ce66"></el-switch>
          <span v-if="scope.row.isActive"> Активен</span>
          <span v-else> Выключен</span>
        </template>
      </el-table-column>
      <el-table-column
        label="Удалить">
        <template slot-scope="scope">
          <el-popover
            placement="top"
            width="160"
            v-model="scope.row.show_del">
            <p align="left">Удалить  {{scope.row.username}}?</p>
            <div style="text-align: center">
              <el-button size="mini" type="text" @click="scope.row.show_del = false">Не надо</el-button>
              <el-button
                         size="mini"
                         type="primary"
                         @click="delete_advertiser(scope)">Да</el-button>
            </div>
            <el-button size="mini" plain type="danger" class="el-icon-delete" slot="reference" @click="scope.row.show_del = true" ></el-button>
          </el-popover>
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
        delete_advertiser_popover: false,
        searchQuery: "",
        prev: 0,
        next: 0,
        pager: 0,
      };
    },
    methods: {
      change_status: function (el) {
        this.$store.dispatch(`update_advertiser_status`, el);
      },

      delete_advertiser: function(el) {
        this.$store.dispatch('delete_advertiser', el)
        this.advertisers.splice(this.advertisers.indexOf(el))
        el.row.show_del = false
      },

      formatDate: function(value) {
        let a = new Date(value.row.createdAt);
        return a.toLocaleDateString('ru');
      },
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

      loading_show: function () {
        return this.advertisers.length < 1
      },

      pageResult: function () {

        return this.searchResult()
      }
    }
  };
</script>

<style>
</style>
