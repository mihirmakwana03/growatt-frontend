import React, { useEffect } from 'react';

const Cursor = () => {
    useEffect(() => {
        // const cursor = document.querySelector('.cursor');
        // document.addEventListener('mousemove', (e) => {
        //     cursor.style.left = `${e.clientX}px`;
        //     cursor.style.top = `${e.clientY}px`;
        // });




        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');

        let posX = 0, posY = 0; // Current mouse position
        let outlineX = 0, outlineY = 0; // Outline position

        const handleMouseMove = (e) => {
            posX = e.clientX;
            posY = e.clientY;
        };

        const animateOutline = () => {
            // Smoothly interpolate the outline position
            outlineX += (posX - outlineX) * 0.3;
            outlineY += (posY - outlineY) * 0.3;

            if (cursorOutline) {
                cursorOutline.style.left = `${outlineX}px`;
                cursorOutline.style.top = `${outlineY}px`;
            }

            if (cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }

            requestAnimationFrame(animateOutline);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animateOutline(); // Start the animation loop

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" data-cursor-dot></div>
            <div className="cursor-outline" data-cursor-outline></div>

            <style>
                {`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    height: 100vh;
                    background-color: #1b1b1f;
                    cursor: none;
                }
                .cursor-dot {
                    width: 10px; /* Increased size */
                    height: 10px; /* Increased size */
                    background-color: #23b7bb; /* Updated color */
                    background-color: white;
                }
                .cursor-outline {
                    width: 40px; /* Increased size */
                    height: 40px; /* Increased size */
                    border: 2px solid #f2912a; /* Updated color */
                    border: 2px solid hsla(0, 0%, 100%, 0.5);
                }
                .cursor-dot, .cursor-outline {
                    position: fixed;
                    top: 0;
                    left: 0;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    z-index: 1;
                    pointer-events: none;
                }
                `}
                {`
                    .cursor{
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #fff;
                    transition: 0.1s ease;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    mixin-blend-mode: difference;
                    }

                    a:hover ~ .cursor {
                    transform: scale(6);
                    }
                `}
            </style>
        </>
    );
};

export default Cursor;
