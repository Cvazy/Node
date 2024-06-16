document.addEventListener('click', ({target}) => {
    if (target.dataset.type === 'remove') {
        const id = target.dataset.id

        remove(id).then(() => {
            target.closest('li').remove()
        })
    } else if (target.dataset.type === 'edit') {
        const id = target.dataset.id
        const title = prompt('Введите новое название')

        console.log(title)

        edit(id, title).then(() => {
            const spanElement = target.closest('li').querySelector('span')

            spanElement.textContent = title
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

async function edit(id, title) {
    await fetch(`/${id}/${title}`, {
        method: "PUT",
        body: {
            id,
            title
        }
    })
}