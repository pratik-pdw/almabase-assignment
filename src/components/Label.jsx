import React, { useState, useRef, useEffect } from 'react'

function Label({ id, setSelectedElement, text = "Label", x, y, fontSize = 16, fontWeight = 400 }) {


    const [active, setActive] = useState(false)
    const [initialX, setInitialX] = useState()
    const [initialY, setInitialY] = useState()
    const [currentX, setCurrentX] = useState()
    const [currentY, setCurrentY] = useState()
    const [offsetX, setOffsetX] = useState(x)
    const [offsetY, setOffsetY] = useState(y)

    const [isFocused, setIsFocused] = useState(false)
    const labelRef = useRef()


    useEffect(() => {
        labelRef.current.style.transform = `translate3d(${offsetX}px,${offsetY}px,0)`
    }, [])

    const handleMouseDown = (e) => {
        setInitialX(e.clientX - offsetX)
        setInitialY(e.clientY - offsetY)

        if (e.target === labelRef.current) {
            setActive(true)
        }
    }

    const handleMouseMove = (e) => {

        if (active) {
            e.preventDefault();


            setCurrentX(e.clientX - initialX)
            setCurrentY(e.clientY - initialY)

            setOffsetX(currentX)
            setOffsetY(currentY)
        }
    }

    const handleMouseUp = (e) => {
        setInitialX(currentX)
        setInitialY(currentY)
        setActive(false)
    }


    return (
        <p
            onFocus={() => { console.log('foc') }}
            style={{
                fontFamily: 'inherit',
                fontSize: `${fontSize}px`,
                color: '#000000',
                cursor: 'grab',
                border: isFocused ? '2px solid #D95409' : 'none',
                transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
                fontWeight: `${fontWeight}`,
                position: 'absolute'
            }}
            ref={labelRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >{text}</p>
    )
}

export default Label