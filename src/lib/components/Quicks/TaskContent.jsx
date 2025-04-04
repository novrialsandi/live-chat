import { useState, useEffect } from "react";
import TextInput from "../TextInput";
import Image from "next/image";
import Button from "../Button";
import Dropdown from "../Dropdown";
import fetchApi from "../../api/fetchApi";
import AccordionItem from "../AccordionItem";

const TaskContent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [todos, setTodos] = useState([]);

	const dropdownItem = [
		{ id: 1, label: "Personal Errands", value: "personal" },
		{ id: 2, label: "Urgent To-Do", value: "urgent" },
	];

	const getTodos = async () => {
		try {
			const res = await fetchApi.get("/todos");

			setTodos(res.data);
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
			});

			setTodos((prev) => [...prev, res.data]);
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

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="p-6 h-full flex flex-col ">
			<div className="flex w-full justify-between">
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
			) : (
				<div className="flex flex-col w-full h-full">
					{todos.map((item, index) => {
						return (
							<AccordionItem data={item} key={index} onDelete={deleteTodo}>
								<div>{item.date}</div>
							</AccordionItem>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default TaskContent;
