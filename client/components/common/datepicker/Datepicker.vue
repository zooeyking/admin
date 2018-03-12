<template>
  <div class="tile">
    <p class="control">
      <datepicker placeholder="选择时间段" :config="{ mode: 'range', locale: l10n  }" @dateInput="getValue"></datepicker>
    </p>
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'

export default {
  components: {
    Datepicker
  },

  data () {
    return {
      value: '2016-12-12'
    }
  },

  methods: {
    getValue(value) {
      this.value = value;
    }
  },

  computed: {
    // https://github.com/chmln/flatpickr/blob/gh-pages/src/flatpickr.l10n.zh.js
    l10n () {
      return {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          longhand: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        months: {
          shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
      }
    }
  },

  watch: {
    value (newVal, oldVal) {
      this.$emit('sendValue', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.tile.is-parent {
  min-width: 50%;
}
.control {
  width: 100%;
}
</style>
