import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, doc,
  getDocs, setDoc, deleteDoc, updateDoc,
  query, where
} from 'firebase/firestore'

import settings from './settings'
const app = initializeApp(settings);

export const db = getFirestore(app)

export default {
  getBoardsByUser(userId) {
    const q = query(collection(db, "boards"), where("user", "==", userId));
    const querySnapshot = getDocs(q)
    return querySnapshot
  },

  getListsFromBoard(boardId) {
    const q = query(collection(db, "lists"), where("board", "==", boardId));
    const querySnapshot = getDocs(q)
    return querySnapshot
  },

  getTasksFromList(listId) {
    const q = query(collection(db, "tasks"), where("list", "==", listId));
    const querySnapshot = getDocs(q)
    return querySnapshot
  },

  postBoard(name) {
    // Obtener la key
    const docRef = doc(collection(db, 'boards'))
    const user = 1
    const board = { id: docRef.id, name, user }
    return setDoc(docRef, board).then(() => board)
  },

  postList(board, name) {
    const docRef = doc(collection(db, 'lists'))
    const list = { id: docRef.id, name, board }
    return setDoc(docRef, list).then(() => list)
  },

  async postTask(list, title) {
    const docRef = doc(collection(db, 'tasks'))
    const task = { id: docRef.id, title, list, completed: false }
    await setDoc(docRef, task);
    return task;
  },
  deleteTask(taskId) {
    return deleteDoc(doc(db, 'tasks', taskId))
  },

  async completedTask({ id, completed }) {
    await updateDoc(doc(db, 'tasks', id), { completed: !completed });
    return id;
  },
  /* completedTask({id, completed}) {
    return updateDoc(doc(db, 'tasks', id), { completed: !completed }).then(() => id)
  }, */

  updateListIdTask( taskId, newListId ) {
    return updateDoc(doc(db, 'tasks', taskId), { list: newListId })
  },

  deleteList(listId) {
    return deleteDoc(doc(db, 'lists', listId))
  },
}
