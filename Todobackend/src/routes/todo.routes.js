import { Router } from "express";
import { addTodo, deleteTodo, getAllTodo, toggleComplete, updateTodo } from "../controllers/todo.controller.js";

const router=Router()

router.route('/').get(getAllTodo)
router.route('/upload').post(addTodo)
router.route('/u/:todoid').patch(updateTodo)
router.route('/d/:todoId').delete(deleteTodo)
router.route('/t/:todoId').patch(toggleComplete)


export default router