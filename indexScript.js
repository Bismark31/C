// Store references to draggable and droppable elements
const draggableElements = document.querySelectorAll('.box');
const droppableElements = document.querySelectorAll('.droppable');
let score = 0;
let initialPositions = {};

// Store the initial positions of draggable elements
draggableElements.forEach((element) => {
    initialPositions[element.id] = element.parentElement;
});

// Add dragstart event listener to draggable items
draggableElements.forEach(element => {
    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.id);
        e.target.classList.add('draggableFormat');
    });

    element.addEventListener('dragend', (e) => {
        e.target.classList.remove('draggableFormat');
    });
});

// Add drop event listener to droppable areas
droppableElements.forEach(element => {
    element.addEventListener('drop', (e) => {
        e.preventDefault();
        const droppedElementId = e.dataTransfer.getData('text');
        const dropZoneId = e.target.getAttribute('data-draggable-id');
        const draggableElement = document.getElementById(droppedElementId);

        // Append draggable element to the droppable area
        e.target.appendChild(draggableElement);

        // Check if the draggable item is dropped in the correct category
        if (droppedElementId === dropZoneId) {
            score += 1; // Increase score if correct
            document.getElementById('remarks').innerText = "Correct!"; // Show correct message
        } else {
            document.getElementById('remarks').innerText = "Incorrect!"; // Show incorrect message
        }

        // Update the score
        document.getElementById('score').innerText = "Score: " + score;
    });

    // Enable the drop functionality and add hover effects
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        element.classList.add('accepting'); // Show accepting style when draggable is over the droppable
    });

    // Remove the accepting style when the draggable item leaves the droppable area
    element.addEventListener('dragleave', () => {
        element.classList.remove('accepting');
    });
});

// Reset the game
document.getElementById('resetBtn').addEventListener('click', () => {
    // Reset the position of all draggable items
    draggableElements.forEach((element) => {
        const originalParent = initialPositions[element.id];
        originalParent.appendChild(element);
    });

    // Reset score and remarks
    score = 0;
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('remarks').innerText = "";
});
