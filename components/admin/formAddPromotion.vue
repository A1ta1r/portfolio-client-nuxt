<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h1>Новый реклама: <label v-text="advertiser.username"></label></h1>
    </div>
    <el-form :model="advertiser" :rules="rules" ref="advertiser" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Название" prop="username">
        <el-input v-model="advertiser.username"></el-input>
      </el-form-item>
      <el-form-item label="Логин (email)" prop="email">
        <el-input v-model="advertiser.email"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="advertiser.password"></el-input>
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
        <el-button type="primary" @click="submitForm('advertiser')">Добавить</el-button>
        <el-button @click="resetForm('advertiser')">Сбросить</el-button>
        <el-button @click="back">Назад</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        promotion: {
          name: '',
          username: '',
          password: '',
          isActive: true,
          contactInfo: '',
          notes: '',
        },
        rules: {
          username: [
            { required: true, message: 'Пожалуйста, введите название нового рекламодателя', trigger: 'blur' },
            { min: 3, message: 'Длина имени должна быть больше 3 символов', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Пожалуйста, введите пароль для рекламодателя', trigger: 'blur' },
            { min: 3, message: 'Длина должна быть больше 3 символов', trigger: 'blur'}
          ],
          email: [
            { required: true, message: 'Пожалуйста, введите адрес электронной почты', trigger: 'change' },
            { type: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('add_advertiser', this.advertiser)
              .then(() => {
                this.$router.back(1)
                this.notify()
              }).catch(() => {
              this.notifyFail()
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      back() {
        this.$router.push('/secure/admin')
      },
      notify() {
        this.$notify.success({
          title: `Рекламодатель ${this.advertiser.username} успешно добавлен`,
          message: `На адрес ${this.advertiser.email} будет выслано письмо с информацией для входа`,
          position: 'bottom-right'
        });
      },
      notifyFail() {
        this.$notify.error({
          title: `Рекламодатель ${this.advertiser.username} не был добавлен`,
          message: `При добавлении рекламодателя произошла ошибка. Проверьте, что введенные данные верны`,
          position: 'bottom-right'
        });
      }
    }
  }
</script>
