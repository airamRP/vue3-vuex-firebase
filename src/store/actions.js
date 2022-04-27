import * as types from './mutation-types'
import API from '@/api/firebase.js'

export default {
  // Fetch via AJAX the boards from user
  fetchBoards({ commit }, { user }) {
    commit(types.FETCH_BOARDS_REQUEST)

    API.getBoardsByUser(user)
      .then(snap => {
        const boards = snap.docs.map(doc => doc.data())
        commit(types.FETCH_BOARDS_SUCCESS, { boards })
      })
      .catch(error => commit(types.FETCH_BOARDS_FAILURE, { error }))
  },
  // Fetch via AJAX the lists from a board
  fetchLists({ commit }, { board }) {
    commit(types.FETCH_LISTS_REQUEST)

    API.getListsFromBoard(board)
      .then(snap => {
        const lists = snap.docs.map(doc => doc.data())
        commit(types.FETCH_LISTS_SUCCESS, { lists })
      })
      .catch(error => commit(types.FETCH_LISTS_FAILURE, { error }))
  },
  // Fetch via AJAX the tasks from a list
  fetchTasks({ commit }, { list }) {
    commit(types.FETCH_TASKS_REQUEST)

    API.getTasksFromList(list)
      .then(snap => {
        const tasks = snap.docs.map(doc => doc.data())
        commit(types.FETCH_TASKS_SUCCESS, { tasks })
      })
      .catch(error => commit(types.FETCH_TASKS_FAILURE, { error }))
  },

  // Add a new board via AJAX
  addBoard({ commit }, { name }) {
    API.postBoard(name)
      .then(board => commit(types.ADD_BOARD, { board }))
  },

  // Add a new column/list to a board via AJAX
  addColumn({ commit }, { board, name }) {
    API.postList(board, name)
      .then((column) => commit(types.ADD_COLUMN, { column }))
  },

  // Add a new tasks to a list/column via AJAX
  addTask({ commit }, { list, title }) {
    API.postTask(list, title)
      .then((task) => commit(types.ADD_TASK, { task }))
  },

  // Delete a task from a list/AJAX via AJAX
  deleteTask({ commit }, { taskId }) {
    API.deleteTask(taskId)
      .then(() => commit(types.DELETE_TASK, { taskId }))
  },

  // Mark as completed a task via AJAX
  markAsCompleted({ commit }, { task }) {
    API.completedTask(task)
      .then(() => commit(types.MARK_AS_COMPLETED, { task }))
  },

  // Move a task from a list to another
  moveTask({ commit, getters }, { task, listId }) {
    // console.log('actions', task, listId)
    API.updateListIdTask(task.id, listId)
      .then(() => commit(types.UPDATE_LIST_ID_TASK, { task, listId }))
  },

  // Delete a list and sub task from a board via AJAX
  deleteList({ commit }, { listId }) {
    API.deleteList(listId)
      .then(() => commit(types.DELETE_LIST, { listId }))
  }
}
