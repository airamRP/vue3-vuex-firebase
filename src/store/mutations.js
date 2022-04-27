import * as types from './mutation-types'

export default {
  // Fetch the boards created by user
  [types.FETCH_BOARDS_REQUEST](state) {
    state.fetchingData = true
    state.error = null
  },

  [types.FETCH_BOARDS_SUCCESS](state, { boards }) {
    state.fetchingData = false
    state.error = null
    state.boards = { ...boards }
  },

  [types.FETCH_BOARDS_FAILURE](state, { error }) {
    state.fetchingData = false
    state.error = error
  },

  // Fetch the lists from a board
  [types.FETCH_LISTS_REQUEST](state) {
    state.fetchingData = true
    state.error = null
  },

  [types.FETCH_LISTS_SUCCESS](state, { lists }) {
    state.fetchingData = false
    state.error = null
    state.lists = { ...lists }
  },

  [types.FETCH_LISTS_FAILURE](state, { error }) {
    state.fetchingData = false
    state.error = error
  },

  // Fetch the tasks from a list
  [types.FETCH_TASKS_REQUEST](state) {
    state.fetchingData = true
    state.error = null
  },

  [types.FETCH_TASKS_SUCCESS](state, { tasks }) {
    state.fetchingData = false
    state.error = null

    const result = tasks.reduce((obj, cur) => {
      return ({ ...obj, [cur.id]: cur })
    }, {})
    state.tasks = { ...state.tasks, ...result }
    // state.tasks = Objetct.assign({}, state.tasks, result)

    // debugger
  },

  [types.FETCH_TASKS_FAILURE](state, { error }) {
    state.fetchingData = false
    state.error = error
  },

  // Create a new board
  [types.ADD_BOARD](state, { board }) {
    // Vue.set(state.boards, board.id, board)
    state.boards[board.id] = board
  },

  // Create a new task list
  [types.ADD_COLUMN](state, { column }) {
    // Vue.set(state.lists, column.id, column)
    state.lists[column.id] = column
  },

  // Add a new task to a task list
  [types.ADD_TASK](state, { task }) {
    state.tasks[task.id] = task
  },

  // Delete a task from a task list
  [types.DELETE_TASK](state, { taskId }) {
    state.tasks = Object.values(state.tasks)
      .filter(task => task.id !== taskId)
      .reduce((obj, cur) => {
        return ({ ...obj, [cur.id]: cur })
      }, {})
  },

  // Check a task as completed
  [types.MARK_AS_COMPLETED](state, { task }) {
    task.completed = !task.completed
  },

  [types.UPDATE_LIST_ID_TASK](state, { task, listId }) {
    // Ojo: No reactivo
    // task.list = listId

    Object.values(state.tasks)
      .find(item => {
        if (item.id === task.id) {
          item.list = listId
        }
      })

  },

  [types.DELETE_LIST](state, { listId }) {
    state.lists = Object.values(state.lists)
      .filter(list => list.id !== listId)
      .reduce((obj, cur) => {
        return ({ ...obj, [cur.id]: cur })
      }, {})
  },
  /* 
    resetTasks(state) {
      state.tasks = []
    } */
}
