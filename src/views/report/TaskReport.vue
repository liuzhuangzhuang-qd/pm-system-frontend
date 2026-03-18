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
        <el-button @click="exportExcel">导出Excel</el按钮>
      </el-form-item>
    </el-form>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import { fetchTaskReport } from '@/api/report'
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
  const res = await fetchTaskReport({})
  const data = res.data || []
  chartInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { top: '5%' },
    series: [
      {
        name: '任务完成率',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false, position: 'center' },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        data
      }
    ]
  })
}

const exportExcel = () => {
  const blob = new Blob(['任务完成率报表'], { type: 'text/plain;charset=utf-8' })
  downloadBlob(blob, 'task-report.xlsx')
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

