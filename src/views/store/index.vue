<template>
  <div class="store-container">
    <el-row>
      <div><span>defaultSettings</span>：<span>{{ defaultSettings }}</span></div>
    </el-row>
    <el-row><span>getters.roles</span>：<span>{{ getters.roles }}</span></el-row>
    <el-row><span>getters.sidebar</span>：<span>{{ getters.sidebar }}</span></el-row>
    <el-row><span>getters.size</span>：<span>{{ getters.size }}</span></el-row>
    <el-row><span>getters.device</span>：<span>{{ getters.device }}</span></el-row>
    <el-row><span>getters.visitedViews</span>：<span>{{ getters.visitedViews }}</span></el-row>
    <el-row><span>getters.cachedViews</span>：<span>{{ getters.cachedViews }}</span></el-row>
    <el-row><span>getters.token</span>：<span>{{ getters.token }}</span></el-row>
    <el-row><span>getters.avatar</span>：<span>{{ getters.avatar }}</span></el-row>
    <el-row><span>getters.name</span>：<span>{{ getters.name }}</span></el-row>
    <el-row><span>getters.introduction</span>：<span>{{ getters.introduction }}</span></el-row>
    <el-row><span>getters.errorLogs</span>：<span>{{ getters.errorLogs }}</span></el-row>
    <el-row><span>getters.permission_routes.size</span>：<span>{{ getters.permission_routes.size }}</span></el-row>

  </div>
</template>

<script>
import defaultSettings from '@/settings'
export default {
  computed: {
    getters() {
      return this.$store.getters
    },
    defaultSettings() {
      return defaultSettings
    }
  }
}
</script>

<style lang="scss">
.store-container{
  margin: 20px;
  .el-row{
    margin-bottom: 10px;
    padding: 4px;
    line-height: 44px;
    background-color: bisque
  }
}
</style>
