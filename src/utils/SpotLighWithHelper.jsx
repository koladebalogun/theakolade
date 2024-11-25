import React, {useRef, useEffect} from 'react'
import { editable as e } from '@theatre/r3f'
import { SpotLightHelper } from 'three'
import { extend, useFrame, useThree } from '@react-three/fiber'

extend({SpotLightHelper})

export default function SpotLightWithHelper( {showHelper, ...props}) {
    const {scene} = useThree()
    const ref = useRef() 
    const helperRef = useRef()

    useEffect(() => {
        if(showHelper){
            helperRef.current = new SpotLightHelper(ref.current)
            scene.add(helperRef.current)

            return () => {
                scene.remove(helperRef.current)
                helperRef.current.dispose()
            }
        }
    },[scene, showHelper])

    useFrame(() => {
        if(showHelper && helperRef.current){
            helperRef.current.update()
        }
    })


  return (
    <e.spotLight ref={ref} {...props} />
  )
}
