// 接口继承接口


interface TwoDPoint{
    x: number,
    y: number
}

interface ThreeDPoint{
    z: number
}


//extends 接口继承接口
interface FourDPoint extends ThreeDPoint, TwoDPoint{
    time: Date
}

let poi2: FourDPoint = {
    z: 100,
    x: 100,
    y: 100,
    time: new Date()
}







// 接口继承类
class Bird{
    type: string = "画眉鸟"
    fly():void {
        
    }
}


interface Fly extends Bird{

}

let flyingBird: Fly = {
    type: "啄木鸟",
    fly(): void {
        
    }
}