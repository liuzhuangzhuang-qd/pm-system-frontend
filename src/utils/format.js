export function formatDate(time) {
  if (!time) return ''
  const date = new Date(time)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const mi = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${mi}`
}

export function formatTaskStatus(status) {
  const map = {
    todo: { text: '待开始', type: 'primary' },
    doing: { text: '进行中', type: 'warning' },
    done: { text: '已完成', type: 'success' }
  }
  return map[status] || { text: status, type: 'info' }
}

export function formatBugStatus(status) {
  const map = {
    open: { text: '待处理', type: 'danger' },
    processing: { text: '处理中', type: 'warning' },
    resolved: { text: '已解决', type: 'success' },
    closed: { text: '已关闭', type: 'info' }
  }
  return map[status] || { text: status, type: 'info' }
}

