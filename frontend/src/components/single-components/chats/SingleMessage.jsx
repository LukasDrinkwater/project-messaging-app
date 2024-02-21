export default function SingleMessage({ message, userId }) {
  // set the message class if the message is from the user logged in or not

  let messageClass = "";
  if (message.sender.id === userId) {
    messageClass = "user";
  } else {
    messageClass = "receiver";
  }

  return (
    <>
      <div className={messageClass}>
        <p>{message.content}</p>
        <p>{message.createdAtFormatted}</p>
        <p>{message.sender.username}</p>
      </div>
    </>
  );
}
