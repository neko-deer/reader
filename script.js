let currentTitle = localStorage.getItem('currentTitle') || '';
let currentChapter = parseInt(localStorage.getItem('currentChapter')) || 1;
let titlesData = {};

// Fetch titles data
fetch('titles.json')
.then(response => response.json())
.then(data => {
    titlesData = data.titles;
    populateTitleSelect();
});

// Populate the title dropdown
function populateTitleSelect() {
    const titleSelect = document.getElementById('title-select');
    titleSelect.innerHTML = ''; // Clear previous options
    for (const title in titlesData) {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        titleSelect.appendChild(option);
    }

    // Set the selected title
    titleSelect.value = currentTitle;
    titleSelect.addEventListener('change', () => {
        currentTitle = titleSelect.value;
        currentChapter = 1;
        loadImages(currentChapter);
        updateTitle();
        updateChapterDisplay();
        saveState();
    });

    // Load images and update display
    if (currentTitle) {
        loadImages(currentChapter);
        updateTitle();
        updateChapterDisplay();
    }
}

// Helper function to load images for the current chapter
function loadImages(chapter) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Clear previous images
    const chapters = titlesData[currentTitle].chapters;
    const chapterKey = `Chapter ${chapter}`;
    if (chapters && chapters[chapterKey]) {
        chapters[chapterKey].forEach(page => {
            const img = document.createElement('img');
            img.src = `${currentTitle}/${chapterKey}/${page}`;
            img.alt = page;
            imageContainer.appendChild(img);
        });
    }

    // Scroll to top of the page
    window.scrollTo(0, 0);
}

// Update the displayed title
function updateTitle() {
    const titleElement = document.getElementById('title');
    if (titleElement) {
        titleElement.textContent = currentTitle;
    }
}

// Update the chapter display
function updateChapterDisplay() {
    const chapterDisplay = document.getElementById('chapter-display');
    chapterDisplay.textContent = `Chapter ${currentChapter}`;
}

// Save the current state to localStorage
function saveState() {
    localStorage.setItem('currentTitle', currentTitle);
    localStorage.setItem('currentChapter', currentChapter);
}

// Event listeners for navigation buttons
document.getElementById('prev-chapter').addEventListener('click', () => {
    if (currentChapter > 1) {
        currentChapter--;
        loadImages(currentChapter);
        updateChapterDisplay();
        saveState();
    }
});

document.getElementById('next-chapter').addEventListener('click', () => {
    const chapters = titlesData[currentTitle].chapters;
    if (chapters[`Chapter ${currentChapter + 1}`]) {
        currentChapter++;
        loadImages(currentChapter);
        updateChapterDisplay();
        saveState();
    }
});

// Event listener for arrow key navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        // Previous chapter
        if (currentChapter > 1) {
            currentChapter--;
            loadImages(currentChapter);
            updateChapterDisplay();
            saveState();
        }
    } else if (event.key === 'ArrowRight') {
        // Next chapter
        const chapters = titlesData[currentTitle].chapters;
        if (chapters[`Chapter ${currentChapter + 1}`]) {
            currentChapter++;
            loadImages(currentChapter);
            updateChapterDisplay();
            saveState();
        }
    }
});