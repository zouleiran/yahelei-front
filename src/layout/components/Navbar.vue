<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {getCookie, removeToken, setCookie, setToken} from '@/utils/auth'
import { GetAllEnvs } from '@/api/envs/envs'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      form: {
        email: '',
        passWord: '',
        env: ''
      },
      person_name:localStorage.getItem("person_name"),
      options: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.initEnvs()
      this.form.email = getCookie('email') || ''
      this.form.passWord = getCookie('passWord') || ''
      this.form.env = getCookie('env') || ''
      if (!this.form.env) {
        this.form.env = this.options[0].value
      }
    },
    async initEnvs() {
      const res = await GetAllEnvs()
      this.options = res.data
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    confirm() {
      removeToken()
      this.axios.post("/user/loginOut",{
        }
      ).then((res) => {
        this.$router.push({ path:  '/login' })
      }).catch()
      {
        console.log('error submit!!')
      }
      // const email = this.form.email
      // const passwd = this.form.passWord
      // const env = this.form.env
      // setCookie('email', email)
      // setCookie('passWord', passwd)
      // setCookie('env', env)
      // if (email && passwd && env) {
      //   this.success_msg()
      // } else {
      //   this.warning_msg()
      // }
    },
    success_msg() {
      this.$notify({
        title: '成功',
        message: '设置成功!',
        type: 'success'
      })
    },
    warning_msg() {
      this.$notify({
        title: '警告',
        message: '请检查必输项!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 3%;
    &:focus {
      outline: none;
    }

    .avatarImg {
      margin-right: 10%;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
