<template>
  <div class="signin mt10">
    <p>分班监考情况</p>
    <div class="wrap-chart mt20">
      <!-- 签到率 -->
      <div class="chart-content">
        <div class="chart">
          <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}">
            <svg viewBox="0 0 100 100">
              <path
                class="el-progress-circle__track"
                :d="trackPath"
                stroke="transparent"
                :stroke-width="relativeStrokeWidth"
                fill="none"
                :style="trailPathStyle"
              />
              <path
                class="el-progress-circle__path"
                :d="trackPath"
                stroke="#02F6F9"
                fill="none"
                stroke-linecap="round"
                :stroke-width="percentage ? relativeStrokeWidth : 0"
                :style="circlePathStyle"
              />
            </svg>
          </div>
          <div class="el-progress__text">
            <p class="percentage">{{ percentage }}%</p>
            <p class="name">签到率</p>
          </div>
        </div>
        <div class="chart-tag mt20">
          <p class="percentage">50/100</p>
          <p class="name">监考已签到</p>
        </div>
      </div>
      <!-- 结束率 -->
      <div class="chart-content">
        <div class="chart">
          <div class="el-progress-circle" :style="{height: width + 'px', width: width + 'px'}">
            <svg viewBox="0 0 100 100">
              <path
                class="el-progress-circle__track"
                :d="trackPath"
                stroke="transparent"
                :stroke-width="relativeStrokeWidth"
                fill="none"
                :style="trailPathStyle"
              />
              <path
                class="el-progress-circle__path"
                :d="trackPath"
                stroke="#3682FF"
                fill="none"
                stroke-linecap="round"
                :stroke-width="endPercentage ? relativeStrokeWidth : 0"
                :style="endCirclePathStyle"
              />
            </svg>
          </div>
          <div class="el-progress__text">
            <p class="percentage">{{ endPercentage }}%</p>
            <p class="end-name">结束率</p>
          </div>
        </div>
        <div class="chart-tag mt20">
          <p class="percentage">50/100</p>
          <p class="name">监考已结束</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Statistic',
  data() {
    return {
      endPercentage: 10,
      percentage: 65,
      strokeWidth: 6,
      width: 126,
      rate: 1
    }
  },
  computed: {
    relativeStrokeWidth() {
      return (this.strokeWidth / this.width * 100).toFixed(1)
    },
    radius() {
      return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
    },
    trackPath() {
      const radius = this.radius
      const isDashboard = this.type === 'dashboard'
      return `
        M 50 50
        m 0 ${isDashboard ? '' : '-'}${radius}
        a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '-' : ''}${radius * 2}
        a ${radius} ${radius} 0 1 1 0 ${isDashboard ? '' : '-'}${radius * 2}
        `
    },
    perimeter() {
      return 2 * Math.PI * this.radius
    },
    strokeDashoffset() {
      const offset = -1 * this.perimeter * (1 - this.rate) / 2
      return `${offset}px`
    },
    trailPathStyle() {
      return {
        strokeDasharray: `${(this.perimeter * this.rate)}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset
      }
    },
    circlePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * this.rate * (this.percentage / 100)}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    endCirclePathStyle() {
      return {
        strokeDasharray: `${this.perimeter * this.rate * (this.endPercentage / 100)}px, ${this.perimeter}px`,
        strokeDashoffset: this.strokeDashoffset,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
$bg-color: #061748;
$tag-color: #3682FF;
p{ margin: 5px 0px; }

.el-progress__text {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  .percentage{ color: #fff; font-size: 20px; }
  .name{ color: #02F6F9; }
  .end-name{ color: $tag-color; }
}
.signin{
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #257098;
  box-shadow: inset 0px 0px 6px rgba(34, 124, 171, 0.8);
  background-color: $bg-color;
  .wrap-chart{
    display: flex;
    justify-content: center;
    .chart{
      position: relative;
      margin: 0px 10px;
      padding: 5px;
      background: url('../../../assets/images/signin.png') no-repeat 0px 0px;
      background-size: cover;
    }
    .chart-tag{
      text-align: center;
      .name{ color: #255ABB; }
    }
  }

}
</style>
