<template>
  <div class="search-wrap">
    <el-form :model="model" class="search-form" @keyup.enter="onSearch">
      <div
        ref="fieldsRef"
        class="fields"
        :class="{ collapsed: isCollapsed && canToggle }"
        :style="collapsedStyle"
      >
        <slot />
      </div>

      <div class="footer">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <slot name="actions" />

        <el-button
          v-if="canToggle"
          link
          type="primary"
          class="toggle"
          @click="toggleCollapse"
        >
          {{ isCollapsed ? '展开' : '收起' }}
          <el-icon class="toggle-icon">
            <ArrowDown v-if="isCollapsed" />
            <ArrowUp v-else />
          </el-icon>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  model: {
    type: Object,
    required: true
  },
  columns: {
    type: Number,
    default: 3
  },
  defaultRows: {
    type: Number,
    default: 3
  },
  collapsedByDefault: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['search', 'reset'])

const onSearch = () => {
  emit('search')
}

const onReset = () => {
  emit('reset')
}

const fieldsRef = ref()
const canToggle = ref(false)
const collapsedHeight = ref(0)
const isCollapsed = ref(props.collapsedByDefault)

const collapsedStyle = computed(() => {
  if (!canToggle.value || !isCollapsed.value) return { '--cols': props.columns }
  return { '--cols': props.columns, maxHeight: `${collapsedHeight.value}px` }
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function computeCollapsedHeight() {
  const root = fieldsRef.value
  if (!root) return

  const items = Array.from(root.querySelectorAll('.el-form-item'))
  if (!items.length) {
    canToggle.value = false
    collapsedHeight.value = 0
    return
  }

  // 以 offsetTop 分组行，取前 N 行的最大 bottom 作为折叠高度
  const tops = Array.from(new Set(items.map((el) => el.offsetTop))).sort((a, b) => a - b)
  const rows = tops.length
  if (rows <= props.defaultRows) {
    canToggle.value = false
    collapsedHeight.value = 0
    isCollapsed.value = false
    return
  }

  const allowedTop = tops[props.defaultRows - 1]
  let maxBottom = 0
  items.forEach((el) => {
    if (el.offsetTop <= allowedTop) {
      const bottom = el.offsetTop + el.offsetHeight
      if (bottom > maxBottom) maxBottom = bottom
    }
  })

  canToggle.value = true
  collapsedHeight.value = maxBottom
}

let ro
onMounted(async () => {
  await nextTick()
  computeCollapsedHeight()
  ro = new ResizeObserver(() => computeCollapsedHeight())
  if (fieldsRef.value) ro.observe(fieldsRef.value)
  window.addEventListener('resize', computeCollapsedHeight)
})

onBeforeUnmount(() => {
  if (ro && fieldsRef.value) ro.unobserve(fieldsRef.value)
  window.removeEventListener('resize', computeCollapsedHeight)
})
</script>

<style scoped>
.search-wrap {
  margin-bottom: 16px;
  padding: 24px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 6px;
}

.search-form {
  width: 100%;
}

.fields {
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), minmax(220px, 1fr));
  column-gap: 24px;
  row-gap: 8px;
  overflow: hidden;
  transition: max-height 0.2s ease;
}

.fields :deep(.el-form-item) {
  margin-right: 0;
  margin-bottom: 0;
}

.fields :deep(.el-form-item__content) {
  width: 100%;
}

.fields :deep(.el-input),
.fields :deep(.el-select),
.fields :deep(.el-date-editor) {
  width: 100%;
}

.footer {
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.toggle {
  margin-left: 6px;
}

.toggle-icon {
  margin-left: 4px;
}

@media (max-width: 1100px) {
  .fields {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 720px) {
  .fields {
    grid-template-columns: 1fr;
  }
}
</style>

