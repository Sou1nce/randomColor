

const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space'){
        setRandomColors()
    }

})

document.addEventListener('click', (event) =>{
    const type = event.target.dataset.type

    if (type === 'lock'){
        const node =
            event.target.tagName.toLowerCase() === 'i'
            ? event.target
            : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy'){ 
        copyToClickBoard(event.target.textContent)
    }
})


function copyToClickBoard(text){
    return navigator.clipboard.writeText(text)
}

function generateRandomColor(){
    const hexCods = "0123456789ABCDEF"
    let color = ''

    for (let i = 0; i < 6; i++){
        color += hexCods[Math.floor(Math.random() * hexCods.length)]
    }
    return '#' + color;
}

function setRandomColors(isInitial){
    const colors = isInitial ? getColorsFromHash   () : []
    cols.forEach((col, index)=> {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const textColor = col.querySelector('h2')
        const button = col.querySelector('button')
        const color =  isInitial
         ? colors[index] 
            ? colors[index] 
            : generateRandomColor()
         : generateRandomColor()

        if (isLocked){
            colors.push(textColor.textContent)
            return
        }

        if (!isInitial){
            colors.push(color)
        }
        textColor.textContent = color
        col.style.background = color
     
        setTextColor(textColor, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}


function setTextColor (textColor, color){
    const luminanne = chroma(color).luminance()
    textColor.style.color = luminanne > 0.5 ? 'black' : 'white'

}

function updateColorsHash(colors = []) {
    document.location.hash = colors
      .map((col) => {
        return col.toString().substring(1)
      })
      .join('-')
  }
  
  function getColorsFromHash() {
    if (document.location.hash.length > 1) {
      return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color)
    }
    return []
  }
setRandomColors(true)
