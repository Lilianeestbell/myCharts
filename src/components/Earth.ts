import React from 'react'
import * as THREE from 'three'	// 引入 Three.js 插件
import banner from '../assets/mountains.jpg'	// 引入全景图

// props 类型声明接口
interface MyProps {

}


// state 类型声明接口
interface MyState {

}

class Earth extends React.Component<MyProps, MyState> {

    renderer: any = new THREE.WebGLRenderer()	// 创建一个渲染器
    scene: any = new THREE.Scene()	// 创建一个场景
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)	// 创建一个摄像机
    geometry = new THREE.SphereBufferGeometry(100, 60, 40)	// 创建一个球形的容器，用于贴全景图上去
    material: any	// 贴图材质
    mesh: any

    constructor(props: any) {
        super (props)
        this.state = {}
    }

    componentDidMount () {

        this.geometry.scale(-1, 1, 1)

        let texture = new THREE.TextureLoader().load(banner)
        this.material = new THREE.MeshBasicMaterial({map: texture})
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.renderer.setSize(window.innerWidth, window.innerHeight)

        document.body.appendChild(this.renderer.domElement)

        this.scene.add(this.mesh)

        this.camera.position.z = 0

        window.addEventListener('resize', this.onWindowResize, false)

        this.animate()
    }

	// 实现窗口大小改变的时候改变全景图的显示大小
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

	// 逐帧渲染
    animate = () => {
        requestAnimationFrame(this.animate)
        this.mesh.rotation.y += 0.001
        this.renderer.render(this.scene, this.camera)
    }

    render () {
        return(
          <div></div>
        )
    }
}

export default Earth
