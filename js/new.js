// Get data from API
const getDataFromApi = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        showData(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

// Show Category in web-page
const categorySection = document.getElementById('news-category');
const showData = categories => {
    for (const category of categories) {
        const div = document.createElement('div');
        div.innerHTML = `
        <span onclick=getAllNews(${category.category_id}) class="px-2 py-1 rounded-lg hover:text-white hover:cursor-pointer">${category.category_name}</span>
        `;
        categorySection.appendChild(div);
    }
}

// Get array of all the news of a category
function getAllNews(id) {
    const link = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(link)
        .then(res => res.json())
        .then(data => showAllNews(data.data))
}

// Show News Length and news in row
const resultAmount = document.getElementById('result-amount');
const showAllNews = (array) => {
    resultAmount.innerHTML = `
    <p class="">${array.length} results found.</p>
    `;
    console.log(array)
}


getAllNews(1)

getDataFromApi();