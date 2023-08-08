let prevLastRecord

async function main() {
    const nextPage = createPagination()

    onScrollEnd(async () => {
        renderRecords(await nextPage())
    })
    
    renderRecords(await nextPage())
}

function onScrollEnd(cb) {
    window.addEventListener('scrollend', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            cb()
        }
    })
}

function renderRecords(records, root=document.body, listEndMarker=document.querySelector('.end')) {
    const baseElem = document.createElement("div")
    baseElem.classList.add('record')

    for(const record of records) {
        const elem = baseElem.cloneNode()
        elem.textContent = record 

        root.appendChild(elem)
    }
    root.appendChild(listEndMarker)
}

function createPagination(skip=0, take=50) {
    return async () => {
        try {
            const records = await getRecords(skip, take)
            skip += take

            return records
        }
        catch(err) {
            return []
        }
    }
}

async function getRecords(skip=0, take=4) { 
    const url = `/records.php?skip=${skip}&take=${take}`
    const res = await fetch(url)
    const records = await res.json()

    return records
}

main()