import { useState, useEffect } from "react";
import TextInput from "../TextInput";
import Image from "next/image";
import Button from "../Button";
import Dropdown from "../Dropdown";
import fetchApi from "../../api/fetchApi";
import AccordionItem from "../AccordionItem";
import TextArea from "../TextArea";

const TaskContent = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [createLoading, setCreateLoading] = useState(false);
	const [todos, setTodos] = useState([]);
	const [openDeleteMenuId, setOpenDeleteMenuId] = useState(null);

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
			setOpenDeleteMenuId(null); // Close delete menu after deletion
		} catch (error) {
			console.log(error);
		} finally {
			setCreateLoading(false);
		}
	};

	const editTodo = async (data) => {
		setCreateLoading(true);
		try {
			const res = await fetchApi.put(`/todos/${data.uuid}`, data);
			setTodos((prev) =>
				prev.map((item) =>
					item.uuid === uuid ? { ...item, ...res.data } : item
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

	const handleDeleteMenuToggle = (uuid) => {
		setOpenDeleteMenuId(openDeleteMenuId === uuid ? null : uuid);
	};

	const closeDeleteMenu = () => {
		setOpenDeleteMenuId(null);
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
			) : todos.length < 1 ? (
				<div className="flex flex-col items-center gap-4 justify-center h-full">
					<div className="font-bold text-primary-darkGray">No Todos Yet</div>
				</div>
			) : (
				<div className="flex flex-col w-full h-full">
					{todos.map((item) => (
						<AccordionItem
							data={item}
							key={item.uuid}
							onDelete={deleteTodo}
							onEdit={editTodo}
							isOpen={item.isOpen}
							setOpenDeleteMenuId={setOpenDeleteMenuId}
							onToggleAccordion={() => toggleAccordion(item.uuid)}
							openDeleteMenu={openDeleteMenuId === item.uuid}
							onToggleDeleteMenu={() => handleDeleteMenuToggle(item.uuid)}
							onCloseDeleteMenu={closeDeleteMenu}
						>
							<div className="flex items-center gap-6">
								<svg
									width="20"
									height="20"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M14.0061 8.80121H15.8921V15.4021L21.55 18.7591L20.607 20.3056L14.0061 16.3451V8.80121ZM15.2508 2.51465C8.31048 2.51465 2.69031 8.1474 2.69031 15.0877C2.69031 22.0281 8.31048 27.6608 15.2508 27.6608C22.2038 27.6608 27.8365 22.0281 27.8365 15.0877C27.8365 8.1474 22.2038 2.51465 15.2508 2.51465ZM15.2637 25.1462C9.70636 25.1462 5.20519 20.6451 5.20519 15.0878C5.20519 9.53045 9.70636 5.02928 15.2637 5.02928C20.821 5.02928 25.3221 9.53045 25.3221 15.0878C25.3221 20.6451 20.821 25.1462 15.2637 25.1462Z"
										fill="#2F80ED"
									/>
								</svg>

								<div>halo</div>
							</div>
							<div className="flex items-center gap-6">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 23"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M19.3092 0C18.9949 0 18.668 0.125731 18.4291 0.36462L16.1282 2.6655L20.8431 7.38041L23.144 5.07953C23.6343 4.58918 23.6343 3.79708 23.144 3.30673L20.2019 0.36462C19.9504 0.113158 19.6361 0 19.3092 0ZM14.7831 7.569L15.9398 8.72573L4.54857 20.117H3.39185V18.9602L14.7831 7.569ZM0.877197 17.9167L14.783 4.01081L19.498 8.72572L5.59211 22.6316H0.877197V17.9167Z"
										fill="#2F80ED"
									/>
								</svg>
								<TextArea value={item.desciption} className={"w-543px"} />
							</div>
						</AccordionItem>
					))}
				</div>
			)}
		</div>
	);
};

export default TaskContent;
