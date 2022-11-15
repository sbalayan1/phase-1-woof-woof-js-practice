
fetchDogs()
document.getElementById('good-dog-filter').addEventListener('click', (e) => {
    filterDogs(e)
})

function fetchDogs(filterVal="OFF") {
    document.getElementById('dog-bar').textContent = ""
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        const filteredData = data.filter(dog => {
            if (filterVal.includes("OFF")) return dog
            return dog.isGoodDog === true
        })

        filteredData.forEach(dog => {renderDog(dog)})
    })
}

function renderDog(dog) {
    const container = document.getElementById('dog-bar')
    const span = document.createElement('span')
    span.textContent = dog.name
    span.addEventListener('click', () => {
        renderDogInfo(dog)
    })
    container.append(span)
}

function renderDogInfo(dog) {
    const container = document.getElementById('dog-info')
    container.textContent = ""
    const image = document.createElement('img')
    const header = document.createElement('h2')
    const button = document.createElement('button')
    image.src = dog.image
    header.textContent = dog.name
    button.textContent = dog.isGoodDog ? "Good Dog": "Bad Dog"
    button.addEventListener('click', () => {
        toggleGoodBadDog(dog, button)
    })
    container.append(image, header, button)
}

function toggleGoodBadDog(dog, button) {
    const input = button.textContent === "Good Dog" ? false : true

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
            "Content-type": "Application/json",
            "Accept": "Application/json"
        },
        body: JSON.stringify({
            isGoodDog: input
        })
    })
    .then(res => res.json())
    .then(data => {
        button.textContent = data.isGoodDog ? "Good Dog": "Bad Dog"
    })
}

function filterDogs(e) {
    const button = e.target
    const text = "Filter good dogs: "
    button.textContent = button.textContent.includes('ON') ? text + 'OFF' : text + 'ON'
    fetchDogs(button.textContent)
}