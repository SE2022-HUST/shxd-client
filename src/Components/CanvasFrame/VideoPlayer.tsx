import React, { useState, useRef } from 'react';

interface IProps {
    frameCatch: () => void,
    src: string | undefined,
}

const VideoPlyaer = React.forwardRef<HTMLVideoElement, IProps>((props: IProps, ref) => {
    return (
        <video ref={ref} src={props.src} onPlay={props.frameCatch} hidden autoPlay muted style={{display:'none'}} />
    )
})

export default VideoPlyaer;