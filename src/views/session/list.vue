<template>
  <div class="list">
    <div class="nav-menu">
      <div class="nav-logo">
        <!-- <img class="logo-img" src="../../assets/images/logo.png" alt="logo" width="24px">         -->
        <span>巡考系统</span>
      </div>
      <el-dropdown class="avatar-container hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar" class="user-avatar"> -->
          <img src="https://trello-members.s3.amazonaws.com/5e65bf9e2d1d277d0f474e56/a39e9b76cb386426b24e233d9dbe9798/170.png" class="user-avatar">
          <span class="ml10">李雨欣</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="exam-content mt10">
      <p class="txt-18 txt-bold">我的考试</p>
      <div v-for="(session, index) in sessions" :key="index" class="exam-list-item" :status="session.status">
        <div class="exam-title">
          <h3>{{ session.name }}</h3>
          <p class="exam-list-time">{{ session.start }} - {{ session.end }}</p>
          <div class="exam-config mt20">
            <i class="ez-icon">&#xe73b;</i>
            <i class="ez-icon">&#xe73e;</i>
            <i class="ez-icon">&#xe958;</i>
            <i class="ez-icon">&#xe813;</i>
            <i class="ez-icon">&#xe742;</i>
            <i class="ez-icon">&#xe741;</i>
          </div>
        </div>
        <div class="exam-count">
          <p class="exam-monitor pointer" @click="enterMonitor"><i class="ez-icon">&#xe67c;</i><span class="ml5 txt-14">实时监控</span></p>
          <div class="student-count">
            <span class="num">在线<br><span class="ongoing-num">{{ session.ongoing_entries }}</span></span>
            <span class="num">完成<br><span class="completed-num">{{ session.completed_entries }}</span></span>
            <span class="num">总数<br><span class="total-num">{{ session.entries_num }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      logoSrc: '',
      avatar: '',
      sessions: [
        {
          status: 'ongoing',
          name: '进行中的考试',
          start: '2021/07/01 13:24',
          end: '2022/02/14 13:24',
          ongoing_entries: '2',
          entries_num: '898',
          completed_entries: '56'
        },
        {
          status: 'incoming',
          name: '未开始的考试',
          start: '2021/07/01 13:24',
          end: '2022/02/14 13:24',
          ongoing_entries: '2',
          entries_num: '898',
          completed_entries: '56'
        },
        {
          status: 'expired',
          name: '已过期的考试',
          start: '2021/07/01 13:24',
          end: '2022/02/14 13:24',
          ongoing_entries: '28',
          entries_num: '7898',
          completed_entries: '565'
        }
      ]
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    enterMonitor() {
      this.$router.push(`/monitor`)
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  background: #F1F2F6;
  height: 100%;
  .nav-menu {
    background: #fff;
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    padding: 0px 120px;
    .nav-logo{
      background: url('../../assets/images/logo.png') no-repeat;
      background-size: 24px 24px;
      background-position: left;
      span{ padding-left: 30px; }
    }
    .user-avatar{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .exam-content{
    width: 1200px;
    margin: 10px auto;
    .exam-list-item{
      background: #fff;
      width: 100%;
      height: 200px;
      margin-top: 24px;
      padding: 10px 30px;
      border-radius: 4px;
      box-shadow: 1px 1px 4px 2px rgb(217 222 234 / 30%);
      display: flex;
      justify-content: space-between;
      .exam-list-time{
        font-size: 14px;
        color: #999;
        display: inline-block;
      }
      .exam-config{
        i{
          font-size: 18px;
          color: #999;
          margin-right: 16px;
        }
      }
      .exam-count{
        margin-top: 18px;
        text-align: right;
        .exam-monitor{
          color: #3884FF;
        }
        .student-count{
          display: flex;
          margin: 50px 0 30px;
          .num{
            color: #999;
            font-size: 14px;
            margin-left: 30px;
            .ongoing-num, .completed-num, .total-num{
              font-size: 24px;
              color: #000;
            }
          }
        }
      }
    }
    .exam-list-item[status="ongoing"]{border-left: 5px solid #66bb6a}
    .exam-list-item[status="ongoing"]:hover{ box-shadow: 0 0 10px rgba(102,187,106,0.5)}
    .exam-list-item[status="incoming"]{border-left: 5px solid #0195ff}
    .exam-list-item[status="incoming"]:hover{ box-shadow: 0 0 10px rgba(0,96,241,0.5)}
    .exam-list-item[status="expired"]{border-left: 5px solid #f1615e}
    .exam-list-item[status="expired"]:hover{ box-shadow: 0 0 10px rgba(241,97,94,0.5)}
  }
}
</style>
