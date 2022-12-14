//--Jenga animation--//
const isMobile = navigator.userAgentData.mobile;
if (isMobile) {
  console.log('mobite interface');
    const jenga = document.getElementById('jenga')
    const length = '20vh' // it has to be equal to $l SCSS var
    let i = 1
    let floor = 0
    let orientation = true
    
    const plankContainers = Array.from(jenga.children)
    
    plankContainers.forEach((plankContainer, index) => {
      let plank = plankContainer.firstElementChild
      let faces = Array.from(plank.children)
      plankContainer.id = `plankContainer-0${index}`
      setPlankPosition(plank)
      dragElement(faces, document.getElementById(`plankContainer-0${index}`))
    })
    
    jenga.style.top = `calc( 50vh + (1/5 * ${length} * ${floor} / 2) )`
    
    function setPlankPosition(plank) {
      orientation
        ? plank.classList.add('orientation-01')
        : plank.classList.add('orientation-02')
      plank.classList.add(`pos-0${i}`)
      plank.style.zIndex = `${floor}${i}`
      plank.style.top = `calc(-1/5 * ${length} * ${floor})`
      i === 3
        ? [i = 1,
        orientation = !orientation,
        floor = floor + 1]
        : i = i + 1
    }
    
    function dragElement(element, target) {
      let x = 0, _x = 0,
        y = 0, _y = 0
      element.forEach(el => {
        el.style.cursor = 'pointer'
        el.addEventListener('touchstart', dragMouseDown)
      })
      function dragMouseDown(event) {
        console.log('touch start');
        var touch = event.touches[0] || event.changedTouches[0];
            _x = touch.pageX;
            _y = touch.pageY;
        /*event = event || window.event
        //event.preventDefault()
        console.log(event.clientX);
        _x = event.clientX
        _y = event.clientY*/
        document.addEventListener('touchend', closeDragElement)
        document.addEventListener('touchmove', elementDrag)
      }
      function elementDrag(event) {
        console.log("dragging");
        var touch = event.touches[0] || event.changedTouches[0];
            x = _x - touch.pageX;
            y = _y - touch.pageY;
            _x = touch.pageX;
            _y = touch.pageY;
        /*event = event || window.event
        //event.preventDefault()
        x = _x - event.clientX
        y = _y - event.clientY
        _x = event.clientX
        _y = event.clientY*/
        target.style.top = (target.offsetTop - y) + "px"
        target.style.left = (target.offsetLeft - x) + "px"
      }
      function closeDragElement(event) {
        console.log("closing");
        document.removeEventListener('touchend', closeDragElement)
        document.removeEventListener('touchmove', elementDrag)
      }
    }
}
else
{
    const jenga = document.getElementById('jenga')
    const length = '20vh' // it has to be equal to $l SCSS var
    let i = 1
    let floor = 0
    let orientation = true
    
    const plankContainers = Array.from(jenga.children)
    
    plankContainers.forEach(( plankContainer, index ) => {
      let plank = plankContainer.firstElementChild
      let faces = Array.from( plank.children )
      plankContainer.id = `plankContainer-0${index}`
      setPlankPosition( plank )
      dragElement( faces, document.getElementById( `plankContainer-0${index}` ))
    })
    
    jenga.style.top = `calc( 50vh + (1/5 * ${length} * ${floor} / 2) )`
    
    function setPlankPosition( plank ) {
      orientation 
          ? plank.classList.add('orientation-01')
          : plank.classList.add('orientation-02')
      plank.classList.add(`pos-0${i}`)
      plank.style.zIndex = `${floor}${i}`
      plank.style.top = `calc(-1/5 * ${length} * ${floor})`
      i === 3 
        ? [ i = 1, 
            orientation = !orientation,
            floor = floor + 1 ] 
        : i = i + 1    
    }
    
    function dragElement( element, target ) {
      let x = 0, _x = 0,
          y = 0, _y = 0
      element.forEach( el => {
        el.style.cursor = 'pointer'
        el.onmousedown = dragMouseDown
      })
      function dragMouseDown( event ) {
        event = event || window.event
        event.preventDefault()
        _x = event.clientX
        _y = event.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
      }
      function elementDrag( event ) {
        event = event || window.event
        event.preventDefault()
        x = _x - event.clientX
        y = _y - event.clientY
        _x = event.clientX
        _y = event.clientY
        target.style.top = (target.offsetTop - y) + "px"
        target.style.left = (target.offsetLeft - x) + "px"
      }
      function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
      }
    }
}
