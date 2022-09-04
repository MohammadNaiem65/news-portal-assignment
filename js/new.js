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
    toggleSpinner(true);
    const link = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    fetch(link)
        .then(res => res.json())
        .then(data => showAllNews(data.data))
}

// Show News Length and news in row
const resultAmount = document.getElementById('result-amount');
const newsColumn = document.getElementById('news-column');
const divClassList = ['p-3', 'bg-white', 'text-black', 'rounded', 'mt-2', 'flex', 'items-center'];
const modalResponse = document.getElementById('modal-response');
const showAllNews = (array) => {
    newsColumn.innerHTML = "";
    resultAmount.innerHTML = `
    <p class="">${array.length} results found.</p>
    `;
    for (const child of array) {
        const div = document.createElement('div');
        div.classList.add(...divClassList);
        div.innerHTML = `
        <div class="w-60 h-80">
            <img class="w-40 thumbnail" src="${child.thumbnail_url}" alt="">
        </div>
                <div class="ml-3">
                    <h1 class="text-3xl font-semibold mb-2">${child.title}</h1>
                    <p class="mb-2">${child.details}</p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <img class="h-10 w-10 mr-2 rounded-full" src="${child.author.img}" alt="">
                            <div>
                                <h4>${child.author ? child.author.name : "Data Unavailable"}</h4>
                                <p>${child.author ? child.author.published_date : "Data Unavailable"}</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <i class="fa-solid fa-eye"></i>
                            <h1 class="ml-2">${child.total_view ? child.total_view : "Data Unavailable"}</h1>
                        </div>
                        <div class="rating">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div>
                            <!-- The button to open modal -->
                            <label for="${child.category_id}" class="btn modal-button bg-white">Show More <i
                                    class="fa-solid fa-angles-right"></i></label>
                        </div>
                    </div>
                </div>
        `
        newsColumn.appendChild(div);
        const divForModal = document.createElement('div');
        divForModal.innerHTML = `
            <input type="checkbox" id="${child.category_id}" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label for="${child.category_id}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 class="text-lg font-bold">${child.title}</h3>
                <p class="py-4">${child.details}</p>
            </div>
        </div>
        `
        modalResponse.appendChild(divForModal);
        toggleSpinner(false);
    }
}

const toggleLoader = document.getElementById('loader');
const toggleSpinner = isLoading => {
    if (isLoading) {
        toggleLoader.classList.remove('hidden');
    }
    else {
        toggleLoader.classList.add('hidden');
    }
}


getDataFromApi();