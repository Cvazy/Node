let initTitle = ''

document.addEventListener('click', ({target}) => {
    if (target.dataset.type === 'remove') {
        const id = target.dataset.id

        remove(id).then(() => {
            target.closest('li').remove()
        })
    } else if (target.dataset.type === 'reload') {
        const noteElement = target.closest('li')
        const noteInput = noteElement.querySelector('input')
        visibleEditButtons('reload', noteElement)

        initTitle = noteInput.value
    } else if (target.dataset.type === 'cancel') {
        const noteElement = target.closest('li')
        const noteInput = noteElement.querySelector('input')
        visibleEditButtons('cancel', noteElement)

        noteInput.value = initTitle
    } else if (target.dataset.type === 'edit') {
        const noteElement = target.closest('li')
        visibleEditButtons('edit', noteElement)

        const id = target.dataset.id
        const title = target.closest('li').querySelector('input').value

        edit(id, title)
    }
})

function visibleEditButtons(action, noteElement) {
    const inputElement = noteElement.querySelector('input')
    const startButtons = noteElement.querySelector('.start_buttons')
    const editButtons = noteElement.querySelector('.edit_buttons')

    if (action === 'reload') {
        startButtons.classList.remove('d-flex')
        startButtons.classList.add('d-none')
        editButtons.classList.remove('d-none')
        editButtons.classList.add('d-flex')

        inputElement.readOnly = false
        inputElement.classList.remove('border-0')
    } else {
        startButtons.classList.remove('d-none')
        startButtons.classList.add('d-flex')
        editButtons.classList.remove('d-flex')
        editButtons.classList.add('d-none')

        inputElement.readOnly = true
        inputElement.classList.add('border-0')
    }
}

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