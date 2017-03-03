# 引入three.js

```html
<script src="js/three.js"></script>
```

# three.js包含

* 渲染器(Renderer)
* 场景(Scene)
* 照相机(Camera)
* 场景中创建的物体


### 渲染器Renderer

```js
var renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("mainCanvas")
})

var renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 300);
document.getElementsByTagName("body")[0].appendChild(renderer.domElement);
```

### 场景scene
```js
var scene = new THREE.Scene();
```

### 照相机camera

定义了三维空间到二维屏幕的投影方式
照相机需要加到场景中
正交投影照相机与透视投影照相机

	camera.lookAt(new THREE.Vector3(0, 0, 0));

照相机默认是面向z轴负方向放置的(沿z轴负方向观察)
lookAt函数指定它看着原点方向

正交投影

	THREE.OrthographicCamera(left, right, top, bottom, near, far)

六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置
六个面围成一个长方体，称其为视景体（Frustum）
只有在视景体内部的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉

保持照相机的横竖比例，需要保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致
```js
var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.position.set(0, 0, 5);
scene.add(camera);
```

透视投影

	THREE.PerspectiveCamera(fov, aspect, near, far)

fov是视景体竖直方向上的张角（是角度制而非弧度制
aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例
near和far分别是照相机到视景体最近、最远的距离，均为正值，far应大于near
	
```js
var camera = new THREE.PerspectiveCamera(45, 400/300, 1, 10);
camera.position.set(0, 0, 5);
scene.add(camera);
```

### 几何形状

#### 立方体

	THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)

* width是x方向上的长
* height是y方向上的长度
* depth是z方向上的长度
后三个参数分别是在三个方向上的分段数
* widthSegments为3, 代表x方向上水平分为三份

体的默认位置是原点，对于立方体而言，是其几何中心在原点的位置

#### 平面

	THREE.PlaneGeomery(width, height, widthSegments, heightSegments)

width是x方向上的长度， height是y方向上的长度，后面两个表示分段

#### 球体

	THREE.SphereGeometry(radius, segmentWidth, segmentHeight, phiStart, phiLength, thetaStart, thetaLength)

* radius是半径
* segmentsWidth表示经度上的切片数
* segmentsHeight表示纬度上的切片数
* phiStart表示经度开始的弧度
* phiLength表示经度跨过的弧度
* thetaStart表示纬度开始的弧度
* thetaLength表示纬度跨过的弧度

segmentsWidth为意味着对于经度从phiStart跨过phiLenght的区域内划分为多少块，而不是整个球体的经度划分成多少块块后再判断在此经度范围内的部分
wegmentsHeight则相同

#### 圆形

	THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)

#### 圆柱体

	THREE.CylinderGeometry(raidusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)

* radiusTop与radiusBottom分别是顶面和底面的半径
* height是圆柱体的高度
* radiusSegments与heightSegments可类比球体中的分段
* openEnded是一个布尔值，表示是否没有顶面和底面，缺省值为false，表示有顶面和底面

radiusTop与radiusBottom这两个参数设置为不同的值时，创建的是一个圆台

#### 正四面体、正八面体、正二十面体

	THREE.TetrahedronGeometry(radius, detail)
	THREE.OctahedronGeometry(radius, detail)
	THREE.IcosahedronGeometry(radius, detail)

radius是半径
detail是细节层次（Level of Detail）的层数

#### 圆环面

	THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)

radius是圆环半径
tube是管道半径
radialSegments与tubularSegments分别是两个分段数
arc是圆环面的弧度，缺省值为Math.PI * 2

#### 圆环结

	THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)

p和q是控制其样式的参数，一般可以缺省
heightScale是在z轴方向上的缩放

#### 文字形状 textGeometry

	THREE.TextGeometry(text, parameters)

* text是文字字符串，parameters是以下参数组成的对象：
* size：字号大小，一般为大写字母的高度
* height：文字的厚度
* curveSegments：弧线分段数，使得文字的曲线更加光滑
* font：字体，默认是'helvetiker'，需对应引用的字体文件
* weight：值为'normal'或'bold'，表示是否加粗
* style：值为'normal'或'italics'，表示是否斜体
* bevelEnabled：布尔值，是否使用倒角，意为在边缘处斜切
* bevelThickness：倒角厚度
* bevelSize：倒角宽度

#### 自定义形状

	THREE.Geometry()
	geometry.vertices.push(new THREE.Vector3(-1, 2, -1));

new THREE.Vector3(-1, 2, -1)创建一个矢量，作为顶点位置追加到geometry.vertices数组中

而由new THREE.Face3(0, 1, 3)创建一个三个顶点组成的面片，追加到geometry.faces数组中。三个参数分别是四个顶点在geometry.vertices中的序号。

在之前版本的Three.js中，可以使用Face4创建四边形，如今已经弃用。由于四个点未必共面，所以使用三角形永远是最安全的方法。

```js
function drawAxes(scene) {
    // x-axis
    var xGeo = new THREE.Geometry();
    xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    xGeo.vertices.push(new THREE.Vector3(1, 0, 0));
    var xMat = new THREE.LineBasicMaterial({
        color: 0xff0000
    });
    var xAxis = new THREE.Line(xGeo, xMat);
    scene.add(xAxis);
    
    // y-axis
    var yGeo = new THREE.Geometry();
    yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    yGeo.vertices.push(new THREE.Vector3(0, 1, 0));
    var yMat = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });
    var yAxis = new THREE.Line(yGeo, yMat);
    scene.add(yAxis);
    
    // z-axis
    var zGeo = new THREE.Geometry();
    zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    zGeo.vertices.push(new THREE.Vector3(0, 0, 1));
    var zMat = new THREE.LineBasicMaterial({
        color: 0x00ccff
    });
    var zAxis = new THREE.Line(zGeo, zMat);
    scene.add(zAxis);
}
```


### light

不透明的物体的颜色由其反射光决定

#### 环境光

    THREE.AmbientLight(hex)

#### 点光源

点光源照到不同物体表面的亮度是线性递减的，理点光源越远的物体越暗

    THREE.PointLight(hex, intensity, distance)

* hex 颜色
* intensity 亮度，1
* distance 光源最远照射到的距离，0

#### 平行光

    THREE.DirectionalLight(hex, intensity)

平行光的位置很重要
    
    light.position.set(2, 5, 3)//平行光以矢量(-2, -5, -3)照射到所有平面

#### 聚光灯
    
    THREE.SpotLight(hex, intensity, distance, angle, exponent)

* angle 聚光灯的张角，Math.PI/3, 最大值是Math.PI/2 
* exponent 光强在偏离target((0, 0, 0))的衰减指数，10

除了设置光源外，还需要设置target

    light.position.set(x, y, z);
    light.target.position.set(x, y, z);

#### 阴影

能形成阴影的光源只有 THREE.DirectionalLight和THREE.SpotLight
能表现阴影的材质只有 THREE.LambertMaterial和THREE.PhongMaterial

    renderer.shadowMap.enabled = true;  //渲染器渲染阴影
    xxx.castShadow = true;      //光源和所有要产生阴影的物体调用
    xxx.receiveShadow = true;   //接收阴影的物体调用

    ligth.shadowCameraVisible = true;  //调试时看到阴影照相机的位置

spotLitht需设置

* shadow.camera.near
* shadow.camera.far
* shadow.camera.fov  张角

位于shadow.camera.near 和 shadow.camera.far直接的物体才能产生阴影

平行光需设置

* shadow.camera.near
* shadow.camera.far
* shadow.camera.left
* shadow.camera.right
* shadow.camera.top
* shadow.camera.bottom



### 材质

#### 基本材质Basicaterial

物体的颜色始终为该材质的颜色

    THREE.MeshBasicMaterial(opt)

* visibel 是否可见，默认true
* side 渲染面是正面还是反面，默认正面THREE.FrontSide，可设置为反面THREE.BackSide或双面THREE.DoubleSide
* wireframe 是否渲染线而非main，默认false
* color
* map 使用纹理贴图

#### lambert光照模型材质

只考虑漫反射而不考虑镜面反射

    Idiffuse = Kd * Id * cos(theta)  //光照模型公式

* idiffuse 漫反射光强
* kd 物体表面的漫反射属性
* id 光强
* theta 光的入射角弧度

    THREE.MeshLambertMaterial(opt)

* ambient 对环境光的反射了能力，只有设置了AmbientLight后才有效，材质对环境光的反射能力与环境光强相乘后得到材质的实际表现颜色
* emissive 材质的自发光颜色，可以用来表示光源的颜色


#### phong光照模型材质

考虑了镜面反射, 对金属、镜面的表现很合适

    Ispecular = Ks * Is * (cos(alpha)) ^ n  //光照模型公式

* Ispecular 镜面反射的光强
* Ks 材质表面镜面反射系数
* Is 光源强度
* alpha 反射光与视线的夹角
* n 高光指数，越大高光光斑越小

不指定镜面反射系数，而只设定漫反射，其效果和lamberet是相同的

    THREE.MeshPhongMaterial(opt)

* specular 指定镜面反射系数
* shininess 控制光照模型中的n值， 默认30

#### 法向材质

可以将材质的颜色设置为其法向量的方向

    new THREE.MeshNormalMaterail()

#### 纹理贴图

```js
var loader = new THREE.TextureLoader();
var texture = loader.load('img/1.png', function(){
 renderer.render(scene, camera)
});

var material = new THREE.MeshBasicMaterial({ map: texture });
```

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;  //wrapS和wrapT都重复
    texture.repeat.set(4, 4);

wrapS x轴纹理的回环方式
wrapT y轴纹理的回环方式

### 网格

    Mesh(goemetry, material)

    mesh.position.set(1.5, -0.5, 0);
    mesh.position = new THREE.Vector3(1.5, -0.5, 0);

* position 位置
* scale 缩放
* rotation 旋转


### 动画

setInterval
clearInterval

requestAnimationFrame
cancelAnimationFrame

### 外部模型

支持格式

* *.obj
* *.mtl
* *.dae
* *.ctm
* *.ply
* *.stl
* *.wrl
* *.vtk

### 着色器

* 几何着色器(Geometry Shader)
* 顶点着色器(Vertex Shader) .vs
* 片元着色器(Fragment Shader) .fs

WebGL定义的限定符(Qualifier)

* const 常量
* attribute 从js代码传递到顶点着色器，每个顶点对应不同的值
* uniform 每个顶点/片元对应相同的值
* varying 从顶点着色器传到片元着色器中

不写限定符，默认只有在当前文件中能访问

uv UV映射时的横纵坐标
position 顶点在物体坐标系(不是世界坐标系)中的位置

ajax 导入 .vs 文件  和 .fs 文件
```js
$.get('shader/my.vs', function(vShader){
	$.get('shader/my.fs', function(fShader){
		material = new THREE.ShaderMaterial({{
			vertexShader: vShader,
			fargmentShader: fShader
		})
	})
})
```

```js
	<script id="vs" type="x-shader/x-verterx">.vs文件中的内容</script>
	<script id="fs" type="x-shader/x-fragment">.fs文件中的内容</script>
	material = new THREE.ShaderMaterial({
		vertexShader: document.getElementById('vs').textContent,
		fragmentShader: document.getElementById('fs').textContent
	})
```

