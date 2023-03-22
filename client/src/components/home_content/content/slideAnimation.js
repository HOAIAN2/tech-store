function createStack(children) {
    let setMap = new Set()
    while (setMap.size !== children.length) {
        setMap.add(Math.floor(Math.random() * children.length))
    }
    return Array.from(setMap)
}
function initLoadAnimation(children, stack, direction) {
    let offset
    if (direction === 'X') offset = children[0].offsetWidth
    else offset = children[0].offsetHeight
    for (let i = 0; i < children.length; i++) {
        children[i].style.transform = `translate${direction}(${stack[i] * offset}px)`
    }
}
function randomSlide(imgContainer, options = { direction: 'X', delay: 2000 }) {
    console.log(imgContainer.children)
    if (!options.hasOwnProperty('direction')) options.direction = 'X'
    if (!options.hasOwnProperty('delay')) options.delay = 2000
    const children = Array.from(imgContainer.children)
    let stack = createStack(children)
    let offset
    console.log(children)
    if (options.direction === 'X') offset = children[0].offsetWidth
    else offset = children[0].offsetHeight
    initLoadAnimation(children, stack, options.direction)
    setInterval(() => {
        for (let i = 0; i < children.length; i++) {
            children[i].style.transform = `translate${options.direction}(${stack[i] * offset}px)`
        }
        stack = createStack(children)
    }, options.delay)
}
export default randomSlide