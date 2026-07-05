import Picker from "emoji-picker-react";

function EmojiPickerComponent({
  show,
  onEmojiClick,
}) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "70px",
        right: "20px",
        zIndex: 999,
      }}
    >
      <Picker
        onEmojiClick={(emojiData) =>
          onEmojiClick(emojiData.emoji)
        }
      />
    </div>
  );
}

export default EmojiPickerComponent;