const images = [
    'images/image1.png', // Path to your first image
    'images/image2.png', // Path to your second image
];

// Function to show the relevant section based on navigation
function showSection(section) {
    document.getElementById('generate-section').style.display = section === 'generate' ? 'block' : 'none';
    document.getElementById('evaluate-section').style.display = section === 'evaluate' ? 'block' : 'none';
    
    document.getElementById('generate-patterns').classList.toggle('active', section === 'generate');
    document.getElementById('evaluate-patterns').classList.toggle('active', section === 'evaluate');
}

// Function to display the stored images
function displayStoredImages() {
    images.forEach(imageUrl => {
        addEvaluationCard(imageUrl); // Add each stored image to the evaluation section
    });
}

// Function to handle the generate button click
document.getElementById('generate-btn').addEventListener('click', function() {
    const prompt = document.getElementById('prompt-input').value;
    const model = document.getElementById('model-select').value;
    
    if (prompt) {
        const generatedImageUrl = 'images/image1.png'; // Use your static image path
        document.getElementById('output-display').innerHTML = `
            <h3>Generated Example:</h3>
            <img src="${generatedImageUrl}" alt="Generated" style="max-width: 400px; max-height: 400px;">
        `;
        // No need to add the generated image to evaluation as we are displaying stored images
    } else {
        document.getElementById('output-display').innerHTML = `
            <p style="color: red;">Error: Please enter a prompt.</p>
        `;
    }
});
let cardCount = 0; // Counter to create unique IDs

function addEvaluationCard(imageUrl) {
    const cardId = `card-${cardCount++}`; // Create a unique ID for each card

    const cardHtml = `
        <div class="card">
            <img src="${imageUrl}" alt="Pattern" class="card-image">
            <div class="feedback-area"> <!-- New feedback area -->
                <div class="star-rating" id="${cardId}-stars">
                    <span class="star" data-value="1">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" data-value="4">&#9733;</span>
                    <span class="star" data-value="5">&#9733;</span>
                    <input type="hidden" class="rating-value" value="0" id="${cardId}-rating">
                </div>
                <textarea class="comment" placeholder="Leave your feedback..." id="${cardId}-comment"></textarea>
                <button class="submit-feedback" id="${cardId}-submit">Submit</button>
            </div>
        </div>
    `;
    document.getElementById('evaluation-display').innerHTML += cardHtml;

    // Add event listeners to the stars for rating
    const stars = document.querySelectorAll(`#${cardId}-stars .star`);
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const ratingValue = this.getAttribute('data-value');
            const ratingInput = document.getElementById(`${cardId}-rating`);
            ratingInput.value = ratingValue;

            // Update star appearance based on the rating
            stars.forEach(s => {
                s.style.color = s.getAttribute('data-value') <= ratingValue ? '#FFD700' : '#ccc'; // Gold for selected stars
            });
        });
    });

    // Add event listener for submit button
    document.getElementById(`${cardId}-submit`).addEventListener('click', function() {
        const comment = document.getElementById(`${cardId}-comment`).value;
        const rating = document.getElementById(`${cardId}-rating`).value;
        if (rating > 0 && comment.trim() !== '') {
            alert(`Rating: ${rating} Stars\nComment: ${comment}`);
            // Here you can implement functionality to save the feedback
        } else {
            alert('Please select a rating and provide feedback.');
        }
    });
}



// Functions for saving and sharing images (temporary for demonstration)
function saveImage() {
    alert('Image saved!');
}

function shareImage() {
    alert('Image shared!');
}

// Initialize to show the Generate Patterns section by default and display stored images
showSection('generate');
displayStoredImages();
