import { Todo } from "../models/todo.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTodo = asyncHandler(async (req, res) => {
  
  const {text}=req.body
   

//   // Check if `todoText` is provided
  if (!text) {
    throw new ApiError(400, "Todo text is required");
  }

//   // Create the Todo
   const newtodo = await Todo.create({ text });

  // If the `todo` couldn't be saved, throw an error
  if (!newtodo) {
    throw new ApiError(400, "Unable to save Todo");
  }
  
  // Send the success response
  return res.status(200).json(new ApiResponse(200,newtodo,"Todo added"))
});

const getAllTodo = asyncHandler(async (req, res, next) => {
 const todo=await Todo.find()

 if(!todo){
  throw new ApiError(400,"No todos Found")
 }
 

 return res.status(200).json(new ApiResponse(200,todo,"All todos"))
});

const updateTodo = asyncHandler(async (req, res) => {
  const { newText } = req.body;
  const { todoid } = req.params;

  if (!todoid) {
    throw new ApiError(404, "Please provide the todo id");
  }

  if (!newText) {
    // If there's no newText provided, just return the original todo
    const todo = await Todo.findById(todoid);
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }
    return res.status(200).json(new ApiResponse(200, todo, "No edit made"));
  }

  // Update the todo in the database
  const todo = await Todo.findByIdAndUpdate(
    todoid,
    { $set: { text: newText } },
    { new: true }
  );

  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }

  return res.status(200).json(new ApiResponse(200, todo, "Edit successful"));
});

const deleteTodo=asyncHandler(async(req,res)=>{
  const {todoId}=req.params;
  if (!todoId) {
    throw new ApiError(404, "Please provide the todo id");
  }
   let todo=await Todo.findByIdAndDelete(todoId)

   if(!todo){
    throw new ApiError(400,"There is an error tofo")
   }
    todo=await Todo.find()

   return res.status(200).json(new ApiResponse(200, todo, "delete successful"));

})

const toggleComplete=asyncHandler(async(req,res)=>{
   
  const {todoId}=req.params;
  if (!todoId) {
    throw new ApiError(404, "Please provide the todo id");
  }
  let todo=await Todo.findById(todoId)
    todo=await Todo.findByIdAndUpdate(todoId,{
    $set:
    {
      completed:(todo.completed==true)? false : true}
   },{new:true})

   if(!todo){
    throw new ApiError(400,"There is an error tofo")
   }

  return res.status(200).json(new ApiResponse(200,todo,"Toggle of completed done"))
  
})



export { addTodo,getAllTodo,updateTodo,deleteTodo,toggleComplete};
