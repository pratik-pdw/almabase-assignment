import React, { useState, useRef, useEffect } from 'react'

function InputField({ text = "Input Field", x, y, fontSize = 16, fontWeight = 400 }) {


    const [active, setActive] = useState(false)
    const [initialX, setInitialX] = useState()
    const [initialY, setInitialY] = useState()
    const [currentX, setCurrentX] = useState()
    const [currentY, setCurrentY] = useState()
    const [offsetX, setOffsetX] = useState(x)
    const [offsetY, setOffsetY] = useState(y)

    const inputRef = useRef()


    useEffect(() => {
        inputRef.current.style.transform = `translate3d(${offsetX}px,${offsetY}px,0)`
    }, [])

    const handleMouseDown = (e) => {
        setInitialX(e.clientX - offsetX)
        setInitialY(e.clientY - offsetY)

        if (e.target === inputRef.current) {
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
        <input
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                padding: '12px',
                height: '50px',
                fontFamily: 'inherit',
                fontSize: `${fontSize}px`,
                color: '#000000',
                transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
                fontWeight: `${fontWeight}`,
                position: 'absolute'
            }}
            ref={inputRef}
            placeholder={text}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    )
}

export default InputField
