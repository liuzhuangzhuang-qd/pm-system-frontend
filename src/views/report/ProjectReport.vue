<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="mb-16">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="query.range"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadData">查询</el-button>
        <el-button @click="exportExcel">导出Excel</el-button>
      </el-form-item>
    </el-form>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import { fetchProjectReport } from '@/api/report'
import { downloadBlob } from '@/utils/common'

const chartRef = ref()
let chartInstance

const query = reactive({
  range: []
})

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
  loadData()
})

const loadData = async () => {
  const res = await fetchProjectReport({})
  const x = res.data?.map((i) => i.date) || []
  const y = res.data?.map((i) => i.progress) || []
  chartInstance.setOption({
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: x },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
    series: [{ type: 'line', data: y, smooth: true }]
  })
}

const exportExcel = () => {
  const blob = new Blob(['项目进度报表'], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, 'project-report.xlsx')
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}

.mb-16 {
  margin-bottom: 16px;
}
</style>

