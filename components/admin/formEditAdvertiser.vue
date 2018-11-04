<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h1>Редактировать рекламодателя: <label v-text="initialUsername"></label></h1>
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
  import {mapState} from 'vuex'

  export default {
    name: "formEditAdvertiser",
    data() {
      return {
        initialUsername: this.advertiser.username,
        initialEmail: this.advertiser.email,
        rules: {
          username: [
            {required: true, message: 'Пожалуйста, введите название нового рекламодателя', trigger: 'blur'},
            {min: 3, message: 'Длина имени должна быть больше 3 символов', trigger: ['change', 'blur']},
            {validator: this.usernameValidator, trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Пожалуйста, введите пароль для рекламодателя', trigger: 'blur'},
            {min: 3, message: 'Длина должна быть больше 3 символов', trigger: 'change'}
          ],
          email: [
            {required: true, message: 'Пожалуйста, введите адрес электронной почты', trigger: 'blue'},
            {type: 'email', message: 'Пожалуйста, введите корректный адрес электронной почты', trigger: 'blur'},
            {validator: this.emailValidator, trigger: 'blur'}
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
    mounted() {
      if (this.$store.state.advertisers.length === 0) {
        this.$store.dispatch('load_advertisers')
      }
    },
    computed: {
      ...mapState(['advertisers'])
    },
    methods: {
      usernameValidator(rule, value, callback) {
        if (this.advertisers.findIndex(x => x.username === value && value !== this.initialUsername) !== -1) {
          callback(new Error('Рекламодатель с таким названием уже существует'));
        }
        callback()
      },
      emailValidator(rule, value, callback) {
        if (this.advertisers.findIndex(x => x.email === value && value !== this.initialEmail) !== -1) {
          callback(
            new Error('Рекламодатель с таким email уже существует'))
        }
        callback();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('update_advertiser_total', this.advertiser)
              .then(() => {
                this.$router.push('/secure/admin')
                this.notify()
              }).catch(() => {
              this.notifyFail()
            })
          }
        });
      },
      back() {
        this.$router.push('/secure/admin')
      },
      notify() {
        this.$notify.success({
          title: `Обновлено`,
          message: `Данные рекламодателя ${this.advertiser.username} успешно обновлены`,
          position: 'bottom-right'
        });
      },
      notifyFail() {
        this.$notify.error({
          title: `Рекламодатель ${this.advertiser.username} не был обновлен`,
          message: `При обновлении рекламодателя произошла ошибка. Проверьте, что введенные данные верны`,
          position: 'bottom-right'
        });
      }
    }
  }
</script>

<style scoped>

</style>
