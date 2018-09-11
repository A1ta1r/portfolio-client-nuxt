<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" class="el-icon-menu">
        <el-submenu index="1">
          <el-menu-item-group title="Финансы">
            <el-menu-item index="1"><nuxt-link to="/secure/admin">К админку</nuxt-link></el-menu-item>
            <el-menu-item index="2">Расходы</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>Navigator Three</template>
          <el-menu-item-group>
            <template slot="title">Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Василиса Павловна Коротун</span>
      </el-header>

      <el-main>
        Свободное место
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-family: "Helvetica Neue";
}

el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "Олег Тиньков лучший банкир",
      address: "Москва в москве",
      income: "100500",
      agreement: "Подписан",
      enabled: true,
      enabledText: this.enabled ? "Активен" : "Не активен"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>
