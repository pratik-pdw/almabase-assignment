## Instructions to run the code

- Download zip or clone this repository.
- Do `npm start`  inside project directory to start the application. The application will start on [http://localhost:3000](http://localhost:3000)


## Layout of the application
The application is using flexbox as its layout. Canvas component has a position of relative this is because items which will be rendered on canvas and they will be positioned relative to the canvas.

## Comp.jsx

This is a dynamic component which takes couple of props.
`Props`
- elType - identifies what component to be rendered
- x - initial X value
- y - initial Y value
- fontWeight, fontSize are self explanatory

`State`
- initialX, initialY - where user clicked for first time to initiate mouse move event
- offsetX, offsetY - when mouse up occurs the final position of the element
- currentX, currentY - when mouse move happens currentX and currentY change

The component has `onFocus` (sets selectedElement state to id of component in Canvas Component) and `onBlur` (sets selectedElement to null ) event which signifies if the element is selected or not.

The component is positioned using 
`transform: translate3d(currentX,currentY,0)` CSS rule.

## Sidebar.jsx

- Sidebar Component contains a list of items that are rendered. 
- Each item has draggable property set on it. 
- When dragging is started to drag start event and we attach the inner text of dragged element as data onto this event. 
`e.dataTransfer.setData("text/plain",e.target.lastChild.innerText)`
- In this way we understand which component was dragged onto the canvas.

## Canvas.jsx

`State`
- elementsOnCanvas - is an array of element objects which will be rendered on canvas
- isModalOpen - to identify whether modal is opened or closed
- modalProps - properties to pass inside modal
- selectedElement - to signify which component is currently selected.


### When Item is dropped on Canvas for first time
- When items from sidebar are dropped onto Canvas Component, `handleOnDrop` function invokes,  we retrieve the type of element that was dropped on Canvas 
`const elType = e.dataTransfer.getData('text/plain').toLowerCase()`
We then open the modal by passing it initial props i.e element Type and also x and y coordinates where the drop event had occurred.

### When Modal is closed
When modal is closed we check the object returned by modal if it has an id of undefined that means component is rendered for first time and we add to `elementsOnCanvas` array. Else we update only the component that was changed.


## Modal.jsx
When modal is opened for the first time it is populated with x and y coordinates where drop event had occurred. 
Here user can change fontweight and fontsize and add text.
When modal is closed it constructs a object of elAttributes and it is returned to Canvas component