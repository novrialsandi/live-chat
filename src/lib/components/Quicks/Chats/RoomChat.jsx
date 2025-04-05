import TextArea from "../../TextArea";
import Button from "../../Button";

const RoomChat = () => {
	return (
		<div className="h-full p-6 flex flex-col gap-4">
			<div className="max-h-[554px] h-full">halo</div>
			<div className="flex gap-4 items-end">
				<TextArea isChat={true} />
				<Button>Send</Button>
			</div>
		</div>
	);
};

export default RoomChat;
