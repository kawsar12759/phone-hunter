// Fetching Data using the API
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

// Show Phones
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ``;
    const showAll = document.getElementById('show-all');
    // Check DataLimit and Slice array accordingly
    if (dataLimit && phones.length > dataLimit) {
        phones = phones.slice(0, dataLimit);

        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    const noPhone = document.getElementById('no-phone-msg');

    // Checks if the array is empty
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
        phones.forEach(phone => {
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>

                </div>
            </div>
        `
            phonesContainer.appendChild(phoneDiv);

        });
    }
    toggleSpinner(false);
}

// Carry forward the text from search field
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// Search Button event handler
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(9);

})

// Search field enter event
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(9);
    }
})

//Spinner Loading
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

// ShowAll Button event handler
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

// Fetch phone details using the API
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

// Display the phone details
const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No Storage Info Found"}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Info Found'}</p>`;
}