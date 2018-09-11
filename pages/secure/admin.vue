<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu :router="true">
          <el-menu-item index="/">
            <span class="el-icon-d-arrow-left"> На главную</span>
          </el-menu-item>
          <el-menu-item index="/secure/profile">
            <span class="el-icon-edit"> Профиль</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span> . . .</span>
          </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-card>Коротун Василиса Павловна</el-card>
      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane><span slot="label" class="el-icon-view"> Финансы</span><finance></finance></el-tab-pane>
          <el-tab-pane><span slot="label" class="el-icon-document"> Рекламодатели</span>
            <advertisers></advertisers>
          </el-tab-pane>
          <el-tab-pane><span slot="label" class="el-icon-setting"> Система</span><el-card>Система</el-card></el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import advertisers from "@/components/admin/advertisers.vue";
  import Finance from "../../components/admin/finance";

  export default {
    components: {Finance, advertisers}
  };
</script>

<style>
</style>
