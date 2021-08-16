<template>
  <div class="list">
    <div class="nav-menu">
      <div class="nav-logo">
        <span>巡考系统</span>
      </div>
      <el-dropdown class="avatar-container hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img src="" class="user-avatar"> -->
          <span class="ml10">退出系统</span>
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
          <h3 v-html="session.name" />
          <div class="exam-time">
            <span class="exam-list-time">{{ formatTime(session.start) }} - {{ formatTime(session.end) }}</span>
            <span v-if="session.early !== -1" class="exam-login-time">提前登录{{ session.early }}分钟</span>
            <span v-if="session.later !== -1" class="exam-login-time">限制迟到{{ session.later }}分钟</span>
          </div>
          <div class="exam-config mt20">
            <!-- 在线客服 -->
            <i v-if="session.customer_service" class="ez-icon">&#xe647;</i>
            <!-- 即报既考 -->
            <i v-if="session.allow_anonymous" class="ez-icon">&#xe73b;</i>
            <!-- 限定登录 -->
            <i v-if="session.ip_white_list" class="ez-icon">&#xe944;</i>
            <!-- 练习模式 -->
            <i v-if="session.practice_mode" class="ez-icon">&#xe7ab;</i>
            <!-- 考试承诺书 -->
            <i v-if="session.nda" class="ez-icon">&#xe81b;</i>
            <!-- 资料审核 -->
            <i v-if="session.entry_review" class="ez-icon">&#xe95f;</i>
            <!-- 视频监控 -->
            <i v-if="session.monitor" class="ez-icon">&#xe73e;</i>
            <!-- 声音监控 -->
            <i v-if="session.audio_monitor" class="ez-icon">&#xe958;</i>
            <!-- 视频录制 -->
            <i v-if="session.save_video" class="ez-icon">&#xe64a;</i>
            <!-- 登录验证 -->
            <i v-if="session.face_detection" class="ez-icon">&#xe7e0;</i>
            <!-- 人脸侦测 -->
            <i v-if="session.face_detection_dur" class="ez-icon">&#xe7e2;</i>
            <!-- 鹰眼监控 -->
            <i v-if="session.eagle_eye" class="ez-icon">&#xe813;</i>
            <!-- 人脸识别 -->
            <!-- <i class="ez-icon">&#xe742;</i> -->
            <!-- 锁定考试 -->
            <i v-if="session.lock_screen" class="ez-icon">&#xe741;</i>
            <!-- 客户端考试 -->
            <!-- <i class="ez-icon">&#xe942;</i> -->
            <!-- 网页考试 -->
            <!-- <i class="ez-icon">&#xe941;</i> -->
            <!-- 人工判分 -->
            <i v-if="session.manual_score" class="ez-icon">&#xe750;</i>
            <!-- 查看成绩 -->
            <i v-if="session.public_score" class="ez-icon">&#xe744;</i>
            <!-- 查看得分详情 -->
            <i v-if="session.show_score_detail" class="ez-icon">&#xe948;</i>
            <!-- 不满意重做 -->
            <i v-if="session.re_answer" class="ez-icon">&#xe949;</i>
            <!-- 重做保留最高分 -->
            <i v-if="session.answer_save_high" class="ez-icon">&#xe94a;</i>
            <!-- 成绩通知 -->
            <i v-if="session.send_result_email" class="ez-icon">&#xe753;</i>
            <!-- 分数线 -->
            <i v-if="session.datum_line" class="ez-icon">&#xe74f;</i>
            <!-- 答题水印 -->
            <!-- <i class="ez-icon">&#xe955;</i> -->

          </div>
        </div>
        <div class="exam-count">
          <p :id="session.id" class="exam-monitor pointer" @click="enterMonitor(session.id)"><i class="ez-icon">&#xe67c;</i><span class="ml5 txt-14">实时监控</span></p>
          <div class="student-count">
            <span class="num">在线<br><span class="ongoing-num">{{ session.online }}</span></span>
            <span class="num">完成<br><span class="completed-num">{{ session.completed }}</span></span>
            <span class="num">总数<br><span class="total-num">{{ session.all }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSessions } from '@/utils/api'
import { parseTime } from '@/utils/index'

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
  mounted() {
    this.getSessions()
  },
  methods: {
    async getSessions() {
      const res = await getSessions()
      if (res.result.length !== 0) {
        this.sessions = res.result
        console.log(parseTime(this.sessions[0].start, '{y}-{m}-{d} {h}:{i}'), '****')
      }
    },
    formatTime(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/`)
    },
    enterMonitor(id) {
      const sessionId = id
      this.$store.commit('SET_SESSIONID', id)
      this.$router.push(`/monitor?sid=` + sessionId)
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  background: #F1F2F6;
  height: 100%;
  overflow-y: auto;
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
      .exam-time{
        font-size: 14px;
        .exam-list-time{
          color: #999;
          display: inline-block;
        }
        .exam-login-time{
          border-radius: 6px;
          padding: 4px 6px;
          margin-left: 16px;
          background-color: #E7F0FF;
          color: #166EFF;
        }
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
