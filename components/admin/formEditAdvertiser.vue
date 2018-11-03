<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h1>Редактировать рекламодателя: <label v-text="advertiser.username"></label></h1>
    </div>
    <el-form :model="advertiser" :rules="rules" ref="advertiser" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Название" prop="username">
        <el-input v-model="advertiser.username"></el-input>
      </el-form-item>
      <el-form-item label="Логин (email)" prop="email">
        <el-input v-model="advertiser.email"></el-input>
      </el-form-item>
      <el-form-item label="Включен" prop="isActive">
        <el-switch v-model="advertiser.isActive" active-color="#13ce66"></el-switch>
      </el-form-item>
      <el-form-item label="Контактная информация" prop="contactInfo">
        <el-input type="textarea" v-model="advertiser.contactInfo"></el-input>
      </el-form-item>
      <el-form-item label="Заметки" prop="notes">
        <el-input type="textarea" v-model="advertiser.notes"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('advertiser')">Обновить</el-button>
        <el-button @click="back">Назад</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "formEditAdvertiser",
    data() {
      return {
        initialUsername: this.advertiser.username,
        rules: {
          username: [
            {required: true, message: 'Пожалуйста, введите название нового рекламодателя', trigger: 'blur'},
            {min: 3, message: 'Длина имени должна быть больше 3 символов', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Пожалуйста, введите пароль для рекламодателя', trigger: 'blur'},
            {min: 3, message: 'Длина должна быть больше 3 символов', trigger: 'blur'}
          ],
          email: [
            {required: true, message: 'Пожалуйста, введите адрес электронной почты', trigger: 'change'},
            {type: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты', trigger: 'blur'}
          ],
        }
      }
    },
    props: {
      advertiser: {
        id: '',
        email: '',
        username: 'Неизвестно',
        isActive: true,
        contactInfo: '',
        notes: '',
      },
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('update_advertiser_total', this.advertiser)
              .then(this.notify())
              .then(this.$router.back(1))
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      back() {
        this.$router.push('/secure/admin')
      },
      notify() {
        this.$notify({
          title: `Обновлено`,
          message: `Данные рекламодателя ${this.advertiser.username} успешно обновлены`,
          position: 'bottom-right'
        });
      }
    }
  }
</script>

<style scoped>

</style>
