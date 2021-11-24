const modalCreateNew = document.getElementById('modal-create-new')
const createNew = document.getElementById('create-new')
const closeCreateNew = document.getElementById('close-create-new')

// Show modal create new
createNew.addEventListener('click', () => {
  modalCreateNew.classList.add('show-modal-create-new')
})

// Hide modal create new
closeCreateNew.addEventListener('click', () => {
  modalCreateNew.classList.remove('show-modal-create-new')
})

//Hide modal create new on outside click

window.addEventListener('click', e => e.target == modalCreateNew ? modalCreateNew.classList.remove('show-modal-create-new') : false)