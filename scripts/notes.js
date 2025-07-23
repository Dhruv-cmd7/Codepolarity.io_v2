document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const languageFilter = document.getElementById('languageFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const clearFilters = document.getElementById('clearFilters');
    const notesContainer = document.querySelector('.grid');

    const notes = Array.from(notesContainer.querySelectorAll('.card-dark'));

    const languages = [...new Set(notes.map(note => note.dataset.language))];
    const categories = [...new Set(notes.map(note => note.dataset.category))];

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        languageFilter.appendChild(option);
    });

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    function filterNotes() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLanguage = languageFilter.value;
        const selectedCategory = categoryFilter.value;

        notes.forEach(note => {
            const title = note.querySelector('.font-bold').textContent.toLowerCase();
            const language = note.dataset.language;
            const category = note.dataset.category;

            const matchesSearch = title.includes(searchTerm);
            const matchesLanguage = selectedLanguage === 'all' || language === selectedLanguage;
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesLanguage && matchesCategory) {
                note.style.display = 'flex';
            } else {
                note.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterNotes);
    languageFilter.addEventListener('change', filterNotes);
    categoryFilter.addEventListener('change', filterNotes);

    clearFilters.addEventListener('click', () => {
        searchInput.value = '';
        languageFilter.value = 'all';
        categoryFilter.value = 'all';
        filterNotes();
    });
}); 