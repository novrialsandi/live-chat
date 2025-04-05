import { useState, useEffect } from "react";
import TextInput from "../TextInput";
import Image from "next/image";
import Button from "../Button";
import Dropdown from "../Dropdown";
import fetchApi from "../../api/fetchApi";
import AccordionItem from "../AccordionItem";
import TextArea from "../TextArea";
import Datepicker from "../Datepicker";
import Label from "../Label";

const TaskContent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [todos, setTodos] = useState([]);
	const [isFocused, setIsFocused] = useState(false);

	const dropdownItem = [
		{ id: 1, label: "Personal Errands", value: "personal" },
		{ id: 2, label: "Urgent To-Do", value: "urgent" },
	];

	const getTodos = async () => {
		try {
			const res = await fetchApi.get("/todos");

			const todosWithOpen = res.data.map((todo) => ({
				...todo,
				isOpen: true,
			}));

			setTodos(todosWithOpen);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const createTodo = async () => {
		setCreateLoading(true);
		try {
			const res = await fetchApi.post("/todos", {
				title: "",
				description: "",
				date: null,
			});

			setTodos((prev) => [...prev, { ...res.data, isOpen: true }]);
		} catch (error) {
			console.log(error);
		} finally {
			setCreateLoading(false);
		}
	};

	const deleteTodo = async (uuid) => {
		setCreateLoading(true);

		try {
			await fetchApi.delete(`/todos/${uuid}`);
			setTodos((prev) => prev.filter((item) => item.uuid !== uuid));
		} catch (error) {
			console.log(error);
		} finally {
			setCreateLoading(false);
		}
	};

	const editTodo = async (data) => {
		setCreateLoading(true);
		try {
			// const res = await fetchApi.put(`/todos/${data.uuid}`, data);
			setTodos((prev) =>
				prev.map((item) =>
					item.uuid === data.uuid ? { ...item, ...data } : item
				)
			);
		} catch (error) {
			console.log(error);
		} finally {
			setCreateLoading(false);
		}
	};

	const toggleAccordion = (uuid) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.uuid === uuid ? { ...todo, isOpen: !todo.isOpen } : todo
			)
		);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="p-6 h-full flex flex-col scroll-wrapper">
			<div className="flex w-full justify-between pr-4">
				<div className="w-[289px] flex justify-center ">
					<div className="w-fit">
						<Dropdown
							items={dropdownItem}
							defaultValue="My Tasks"
							type="single"
							popupTopPosition={50}
							popupPosition="right"
						/>
					</div>
				</div>
				<Button
					disabled={createLoading}
					isLoading={createLoading}
					onClick={() => createTodo()}
				>
					New Task
				</Button>
			</div>
			{isLoading ? (
				<div className="flex flex-col items-center gap-4 justify-center h-full">
					<div className="size-[85.40695190429688px] border-8 border-[#F8F8F8] border-t-[#c4c4c4] rounded-full animate-spin"></div>
					<div className="font-bold text-primary-darkGray">
						Loading Chats...
					</div>
				</div>
			) : todos.length < 1 ? (
				<div className="flex flex-col items-center gap-4 justify-center h-full">
					<div className="font-bold text-primary-darkGray">No Todos Yet</div>
				</div>
			) : (
				<div className="flex scroll-content flex-col w-full h-full ">
					{todos.map((item) => (
						<AccordionItem
							data={item}
							key={item.uuid}
							onDelete={deleteTodo}
							onEdit={editTodo}
							isOpen={item.isOpen}
							onToggleAccordion={() => toggleAccordion(item.uuid)}
						>
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-6">
									<Datepicker
										value={item.date}
										onChange={(newDate) =>
											setTodos((prev) =>
												prev.map((todo) =>
													todo.uuid === item.uuid
														? { ...todo, date: newDate }
														: todo
												)
											)
										}
									/>
								</div>
								<div className="flex gap-6 w-full">
									<TextArea
										isFocused={isFocused}
										setIsFocused={setIsFocused}
										isDescription={true}
										value={item.description}
										placeholder="No Description"
										onChange={(e) =>
											editTodo({ ...item, description: e.target.value })
										}
									/>
								</div>
								<div className="flex gap-6">
									<Label />
								</div>
							</div>
						</AccordionItem>
					))}
				</div>
			)}
		</div>
	);
};

export default TaskContent;
