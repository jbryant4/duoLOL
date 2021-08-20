import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const V_THRESHOLD = 0.3

export default function Swipe({children}) {
    const [xPos, setXPos] = useState(0)    
    const { x } = useSpring({ x: xPos * 1500 })

    // useEffect(() => {
    //     if (dir == 'right') setXPos(300)
    //     else if (dir == 'left') setXPos(-300)
    // }, [dir])

   
    // const swipeDir = (dir) => {
    //     if (dir == 'right')
    //         setXPos(300)
    //     else if (dir == 'left')
    //         setXPos(-300)
    // }
    const bind = useDrag(({ last, vxvy: [vx, vy] }) => {
        if (last) {
            // getting the swipe direction
            if (Math.abs(vx) > Math.abs(vy)) {
                // swipe left is when horizontal velocity is inferior to minus threshold
                if (vx < -V_THRESHOLD && xPos > -1){
                    setXPos(xp => xp - 1)
                    console.log('teste', xPos)                    
                }
                // swipe right is when horizontal velocity is superior to threshold
                else if (vx > V_THRESHOLD && xPos < 1) setXPos(xp => xp + 1)
            }
        }
    })
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
        <>
            <animated.div {...bind()} style={{ x, position: 'absolute' }}>
                {children}
            </animated.div>
        </>
    )
}
