var siteNameInput = document.querySelector(`#siteName`);
var siteUrlInput = document.querySelector(`#siteUrl`);
var submitBtn = document.querySelector(`#mainBtn`)
var insertTarget = document.querySelector(`#insertTarget`);


var bookmarkedList = [];


var oldLocalData = JSON.parse(localStorage.getItem(`index`));
if (oldLocalData != null) {
    bookmarkedList = oldLocalData;
    displayBookmarks()
}


var nameRegex = /^[A-Z][a-z]{3,12}$/;

var urlRegex = /^www\.[a-z]{3,20}\.com$/;


submitBtn.addEventListener('click', function () {

        var nameExist = false;
        for (var i = 0; i < bookmarkedList.length; i++) {
            if (bookmarkedList[i].bName.toLowerCase().includes(siteNameInput.value.toLowerCase())) {
                nameExist = true;
                document.querySelector(`#siteNameExistAlert`).classList.replace(`d-none`, `d-block`)
            }
        }
        if (nameExist !== true) {
            var bookmark = {
                bName: siteNameInput.value,
                bUrl: siteUrlInput.value
            }
            
            bookmarkedList.push(bookmark);
        
            localStorage.setItem(`index`, JSON.stringify(bookmarkedList));
        
            clear()
        
            displayBookmarks()
        
            document.querySelector(`#siteNameExistAlert`).classList.replace(`d-block`, `d-none`)
        }
})

siteNameInput.addEventListener(`blur`, function () {
    if (nameRegex.test(siteNameInput.value) == false) {
        document.querySelector(`#siteNameAlert`).classList.replace(`d-none`, `d-block`);
        siteNameInput.classList.add(`is-invalid`)
    } else {
    document.querySelector(`#siteNameAlert`).classList.replace(`d-block`, `d-none`);
    siteNameInput.classList.add(`is-valid`)
    siteNameInput.classList.replace(`is-invalid`,`is-valid`)
    }
})

siteUrlInput.addEventListener(`blur`, function () {
    if (urlRegex.test(siteUrlInput.value) == false) {
        document.querySelector(`#siteUrlAlert`).classList.replace(`d-none`, `d-block`);
        siteUrlInput.classList.add(`is-invalid`)
    } else {
    document.querySelector(`#siteUrlAlert`).classList.replace(`d-block`, `d-none`);
    siteUrlInput.classList.add(`is-valid`)
    siteUrlInput.classList.replace(`is-invalid`,`is-valid`)
    }
})


function clear() {
    siteNameInput.value = null;
    siteNameInput.classList.remove(`is-valid`);
    siteUrlInput.value = null;
    siteUrlInput.classList.remove(`is-valid`);
}

function displayBookmarks() {
    var folder = ''
    for (var i = 0; i < bookmarkedList.length; i++) {
        folder += ` <tr>
                        <th class="rawData">${bookmarkedList[i].bName}</th>
                        <td class="rawData">${bookmarkedList[i].bUrl}</td>
                        <td>
                            <button onclick="visit(${i})" class="btn btn-warning">
                                <i class="fa-solid fa-eye"></i>
                                Visit
                            </button>
                        </td>
                        <td>
                            <button onclick="deletebookmark(${i})" class="btn btn-danger">
                                <i class="fa-solid fa-trash"></i>
                                Delete
                            </button>
                        </td>
                    </tr>`
    }
    insertTarget.innerHTML = folder;
}

function deletebookmark(selectedBookmarkIndex) {
    bookmarkedList.splice(selectedBookmarkIndex, 1);
    localStorage.setItem(`index`, JSON.stringify(bookmarkedList));
    displayBookmarks();
}

function visit(selectedBookmarkIndex) {
    var neededLocation = bookmarkedList[selectedBookmarkIndex].bUrl;
    window.open(neededLocation, '_blank');
}







