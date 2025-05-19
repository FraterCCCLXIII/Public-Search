document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    // Sample search data (in a real application, this would come from an API or database)
    const sampleData = [
        {
            title: 'Introduction to Web Development',
            description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
            url: 'https://example.com/web-development'
        },
        {
            title: 'JavaScript Fundamentals',
            description: 'Master the core concepts of JavaScript programming language.',
            url: 'https://example.com/javascript'
        },
        {
            title: 'CSS Styling Techniques',
            description: 'Advanced styling techniques to create beautiful and responsive websites.',
            url: 'https://example.com/css-techniques'
        },
        {
            title: 'Responsive Web Design',
            description: 'Learn how to create websites that work well on all devices and screen sizes.',
            url: 'https://example.com/responsive-design'
        },
        {
            title: 'Web Accessibility Guidelines',
            description: 'Make your websites accessible to all users, including those with disabilities.',
            url: 'https://example.com/accessibility'
        }
    ];

    // Handle search form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            resultsContainer.innerHTML = '<div class="no-results">Please enter a search query</div>';
            return;
        }
        
        // Filter the sample data based on the search query
        const results = sampleData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
        
        displayResults(results, query);
    });

    // Display search results
    function displayResults(results, query) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
            return;
        }
        
        let html = '';
        results.forEach(result => {
            html += `
                <div class="result-item">
                    <h2 class="result-title">${highlightText(result.title, query)}</h2>
                    <p class="result-description">${highlightText(result.description, query)}</p>
                    <a href="${result.url}" class="result-url" target="_blank">${result.url}</a>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = html;
    }

    // Highlight the search query in the text
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="background-color: yellow; font-weight: bold;">$1</span>');
    }
});