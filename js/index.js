document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    const siteName = document.getElementById('siteName');
    const siteUrl = document.getElementById('siteUrl');

    const nameRegex = /^[A-Za-z\s]+$/;
    const urlRegex = /^https?:\/\/.*\.com$/i;

    let isValid = true;

    if (!nameRegex.test(siteName.value)) {
        siteName.classList.add('is-invalid');
        siteName.classList.remove('is-valid');
        isValid = false;
    } else {
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
    }

    const formattedUrl = siteUrl.value.startsWith('http://') || siteUrl.value.startsWith('https://') ? siteUrl.value : http//${siteUrl.value};
    if (!formattedUrl.match(urlRegex)) {
        siteUrl.classList.add('is-invalid');
        siteUrl.classList.remove('is-valid');
        isValid = false;
    } else {
        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');
    }

    if (!isValid) {
        return;
    }

    const bookmark = {
        name: siteName.value,
        url: formattedUrl
    };

    let bookmarks = [];
    if (localStorage.getItem('bookmarks') !== null) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('bookmarkForm').reset();
    siteName.classList.remove('is-valid');
    siteUrl.classList.remove('is-valid');

    fetchBookmarks();
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarksTable = document.getElementById('bookmarksTable');
    bookmarksTable.innerHTML = ''; 
    bookmarks.forEach((bookmark, index) => {
        const rowHtml = `
            <tr>
                <td>${index + 1}</td>
                <td>${bookmark.name}</td>
                <td><button class="btn btn-outline-primary px-4"  onclick="visitSite('${bookmark.url}')">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit</button></td>
                <td><button class="btn btn-outline-danger px-4"  onclick="deleteBookmark('${bookmark.url}')">
                <i class="fa-solid fa-trash-can"></i>
                Delete</button></td>
            </tr>
        `;
        bookmarksTable.innerHTML += rowHtml;
    });
}

function visitSite(url) {
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', fetchBookmarks);