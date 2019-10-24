import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteComment = document.getElementsByClassName("delete__comment");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment, videoId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const icon = document.createElement("i");
  button.setAttribute("class", "delete__comment");
  button.setAttribute("id", videoId);
  button.addEventListener("click", handleDelete);
  icon.setAttribute("class", "fas fa-backspace");
  button.appendChild(icon);
  span.innerHTML = comment;
  span.appendChild(button);
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const removeComment = id => {
  const comment = document.getElementById(id).parentElement;
  console.log(comment);
  const list = comment.parentElement;
  console.log(list);
  list.parentElement.removeChild(list);
  decreaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/addComment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment, videoId);
  }
};

const getComment = async commentId => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    removeComment(commentId);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleDelete = event => {
  event.preventDefault();
  const commentId = event.path[1].id;
  getComment(commentId);
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  Array.from(deleteComment).forEach(comment => {
    comment.addEventListener("click", handleDelete);
  });
}

if (addCommentForm) {
  init();
}
