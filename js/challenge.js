let count = 0
let likes = {};
let isPaused = false;
let intervalId;

document.addEventListener("DOMContentLoaded",()=>{
    const counter = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const heartButton = document.getElementById("heart");
    const likesList = document.querySelector(".likes");
    const pauseButton = document.getElementById("pause");
    
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("list");

    counter.textContent = count;

    function startTimer() {
        intervalId = setInterval(() => {
            if (!isPaused) {
                count++;
                counter.textContent = count;
            }
        }, 1000);
    }

    // Start the timer initially
    startTimer();

    plusButton.addEventListener("click", () => {
        count++;
        counter.textContent = count;
    });

    minusButton.addEventListener("click", () => {
        count--;
        counter.textContent = count;
    });

    heartButton.addEventListener("click", () => {
        
        if (!likes[count]) {
            likes[count] = 1;
            const li = document.createElement("li");
            li.dataset.count = count;
            li.textContent = `${count} has been liked 1 time`;
            likesList.append(li);
        } else {
            likes[count]++;
            const existingLi = document.querySelector(`li[data-count='${count}']`);
            existingLi.textContent = `${count} has been liked ${likes[count]} times`;
        }
    });


    pauseButton.addEventListener("click", () => {
        if (isPaused) {
            isPaused = false;
            startTimer();
        } else {
            isPaused = true;
            pauseButton.textContent = "resume";
            clearInterval(intervalId);
        }

        plusButton.disabled = isPaused;
        minusButton.disabled = isPaused;
        heartButton.disabled = isPaused;
    });

      // Handle form submission
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const commentText = commentInput.value.trim();
    if (commentText) {
      const commentElement = document.createElement("p");
      commentElement.textContent = commentText;
      commentList.appendChild(commentElement);
      commentInput.value = "";
    }
  });

});

