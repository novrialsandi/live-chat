import { create } from "zustand";

export const useRoomStore = create((set) => ({
	rooms: [],
	setRooms: (roomsDataOrUpdater) =>
		set((state) => ({
			rooms:
				typeof roomsDataOrUpdater === "function"
					? roomsDataOrUpdater(state.rooms)
					: roomsDataOrUpdater,
		})),
}));

export const useChatsStore = create((set) => ({
	selectedChat: null,
	setSelectedChat: (chatDataOrUpdater) =>
		set((state) => ({
			selectedChat:
				typeof chatDataOrUpdater === "function"
					? chatDataOrUpdater(state.selectedChat)
					: chatDataOrUpdater,
		})),

	editMessage: null,
	setEditMessage: (message) => set({ editMessage: message }),

	replyMessage: null,
	setReplyMessage: (message) => set({ replyMessage: message }),

	markMessageAsRead: (messageId, userId) =>
		set((state) => {
			const updatedMessages = state.selectedChat.chat_messages.map((msg) => {
				if (msg.id === messageId && !msg.read_by.includes(userId)) {
					return {
						...msg,
						read_by: [...msg.read_by, userId],
					};
				}
				return msg;
			});

			return {
				selectedChat: {
					...state.selectedChat,
					chat_messages: updatedMessages,
				},
			};
		}),
}));
