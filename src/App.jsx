import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { toast } from 'react-toastify'

import {
	useGetAllTasksQuery,
	useAddNewTaskMutation,
	useEditTaskMutation,
	useDeleteTaskMutation,
} from './api'

// icons
import { FaTrash } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'

const App = () => {
	const { data: todos, isLoading } = useGetAllTasksQuery()
	const [deleteTodo] = useDeleteTaskMutation()
	const [addTodo] = useAddNewTaskMutation()
	const [editTodo] = useEditTaskMutation()
	const [newTask, setNewTask] = useState('')
	const [editingTask, setEditingTask] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleDelete = async id => {
		try {
			await deleteTodo(id)
		} catch (error) {
			console.log(error)
		}
	}

	const handleAdd = async () => {
		if (!newTask.trim()) {
			toast.warning('Input is Required')
			return
		}

		try {
			await addTodo({ text: newTask })
			setNewTask('')
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = task => {
		setEditingTask(task)
		setNewTask(task.text)
		setIsModalOpen(true)
	}

	const handleCancelEdit = () => {
		setEditingTask(null)
		setNewTask('')
		setIsModalOpen(false)
	}

	const handleUpdate = async () => {
		if (!newTask.trim()) {
			toast.warning('Input is Required')
			return
		}

		try {
			await editTodo({ id: editingTask.id, text: newTask })
			setNewTask('')
			setEditingTask(null)
			setIsModalOpen(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col justify-center items-center h-screen bg-gray-50 text-gray-900 px-5'>
			<div className='flex flex-col gap-5 max-w-md w-full'>
				<div className='flex justify-between items-center gap-3 w-full'>
					<input
						maxLength={40}
						type='text'
						value={newTask}
						onChange={e => setNewTask(e.target.value)}
						placeholder='Add new task'
						className='w-full border p-2 rounded-md outline-none border-gray-400 text-sm text-gray-900 bg-white shadow-sm'
					/>

					<Button
						className='!h-full'
						type='primary'
						onClick={editingTask ? handleUpdate : handleAdd}
					>
						{editingTask ? 'Update' : <FaPlus />}
					</Button>
				</div>

				<div className='flex flex-col gap-3 pr-1 h-80 max-h-80 overflow-y-scroll'>
					{todos?.map(value => (
						<div
							key={value?.id}
							className='flex justify-between items-center gap-3 bg-white p-3 rounded-md border border-gray-300 shadow'
						>
							<p className='opacity-80 text-gray-900'>{value?.text}</p>

							<div className='flex justify-center items-center gap-3'>
								<Button variant='filled' onClick={() => handleEdit(value)}>
									<BiEdit />
								</Button>
								<Button
									type='primary'
									danger
									onClick={() => handleDelete(value.id)}
								>
									<FaTrash />
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>

			<Modal
				title='Edit Task'
				open={isModalOpen}
				onCancel={handleCancelEdit}
				footer={null}
			>
				<Input
					value={newTask}
					onChange={e => setNewTask(e.target.value)}
					placeholder='Edit task'
				/>
				<div className='flex justify-end gap-3 mt-3'>
					<Button onClick={handleCancelEdit}>Cancel</Button>
					<Button type='primary' onClick={handleUpdate}>
						Update
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default App
