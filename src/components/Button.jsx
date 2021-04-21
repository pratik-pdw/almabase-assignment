import React, { useState, useRef, useEffect } from 'react'

function Button({ id, text = "Button", x, y, fontSize = 16, fontWeight = 400, setSelectedElement }) {


    const [active, setActive] = useState(false)
    const [initialX, setInitialX] = useState()
    const [initialY, setInitialY] = useState()
    const [currentX, setCurrentX] = useState()
    const [currentY, setCurrentY] = useState()
    const [offsetX, setOffsetX] = useState(x)
    const [offsetY, setOffsetY] = useState(y)
    const [isFocused, setIsFocused] = useState(false)
    const buttonRef = useRef()


    useEffect(() => {
        console.log('Button rendered first time')
        buttonRef.current.style.transform = `translate3d(${offsetX}px,${offsetY}px,0)`
    }, [])

    const handleMouseDown = (e) => {
        setInitialX(e.clientX - offsetX)
        setInitialY(e.clientY - offsetY)

        if (e.target === buttonRef.current) {
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
        <button
            onFocus={() => { setIsFocused(true); setSelectedElement(id); }}
            onBlur={() => { setIsFocused(false); setSelectedElement(null); }}
            style={{
                fontFamily: 'inherit',
                fontSize: `${fontSize}px`,
                backgroundColor: "#0044C1",
                color: '#fff',
                padding: '14px',
                border: isFocused ? '2px solid #D95409' : 'none',
                transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
                outline: 'none',
                fontWeight: `${fontWeight}`,
                position: 'absolute'
            }}
            ref={buttonRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >{text}</button>
    )
}

export default Button
