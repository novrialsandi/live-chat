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

	editMessage: null, // <-- Tambahkan ini
	setEditMessage: (message) => set({ editMessage: message }),
	clearEditMessage: () => set({ editMessage: null }),
}));
