interface PersonInterFace{
    name: string,
    age: number,
    eat():void
}


//让小明强制遵守PersonInterFace 使用implements
class XiaoMing implements PersonInterFace{
    name: string = "小明";
    age: number = 18;

    eat() {
        
    }
}


class XiaoHong implements PersonInterFace{
    name: string = "小红";
    age: number = 18;

    eat() {
        
    }
}


//意义 只要是implements PersonInterFace遵守了这个接口规则 那么实例里一定会有这个方法

// var xh = new XiaoHong();
// xh.name;
// xh.age;
// xh.eat();


// 数据访问层代码的
// mysql orcal mssql mongodb
// dbinteface CRUD